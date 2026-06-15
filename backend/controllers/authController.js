const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const createTokens = user => {
  const payload = { sub: user.id, email: user.email, role: user.role || 'user' };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // Simple opaque string as refresh token placeholder
  const refreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, JWT_SECRET, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    if (!email || !password || !firstName || !lastName || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdmin = adminEmail && adminEmail.toLowerCase() === email.toLowerCase();

    const user = await User.create({
      email,
      username,
      firstName,
      lastName,
      passwordHash,
      role: isAdmin ? 'admin' : 'user',
    });

    const { accessToken, refreshToken } = createTokens(user.toClient());

    return res.status(201).json({
      ...user.toClient(),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username and password required' });
    }

    // In the current app, "username" is actually the email from the form
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const clientUser = user.toClient();
    const { accessToken, refreshToken } = createTokens(clientUser);

    return res.json({
      ...clientUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

