const DeviceToken = require('../models/DeviceToken');
const { getFirebaseAdmin } = require('../config/firebaseAdmin');

const NAVBAR_IMAGE_PATH = '/static/images/myCartLogoFilled.png';

const getPublicBaseUrl = req => {
  const envBaseUrl = process.env.PUBLIC_URL || process.env.API_BASE_URL;
  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, '');
  }

  return `${req.protocol}://${req.get('host')}`;
};

const getNavbarImageUrl = req => `${getPublicBaseUrl(req)}${NAVBAR_IMAGE_PATH}`;

const normalizeData = data => {
  if (!data || typeof data !== 'object') return {};
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value === undefined) return acc;
    acc[key] = value === null ? '' : String(value);
    return acc;
  }, {});
};

const collectInvalidTokens = (tokens, responses) => {
  if (!Array.isArray(tokens) || !Array.isArray(responses)) return [];
  const invalidCodes = new Set([
    'messaging/registration-token-not-registered',
    'messaging/invalid-registration-token',
    'messaging/mismatched-credential',
  ]);

  const invalid = [];
  responses.forEach((resp, idx) => {
    if (resp.success) return;
    const code = resp.error?.code;
    if (code && invalidCodes.has(code)) {
      invalid.push(tokens[idx]);
    }
  });

  return invalid;
};

const cleanupInvalidTokens = async tokens => {
  if (!tokens.length) return;
  await DeviceToken.deleteMany({ token: { $in: tokens } });
};

// POST /notifications/register-device
exports.registerDevice = async (req, res) => {
  try {
    const { userId, token, platform } = req.body;
    const authUserId = req.user?.sub;
    const finalUserId = authUserId || userId || null;

    if (!token || !platform) {
      return res.status(400).json({ message: 'token and platform are required' });
    }

    const existing = await DeviceToken.findOne({ token });
    if (existing) {
      existing.userId = finalUserId || existing.userId;
      existing.platform = platform;
      await existing.save();
      return res.json({ message: 'Device token updated' });
    }

    await DeviceToken.create({
      userId: finalUserId,
      token,
      platform,
    });

    return res.status(201).json({ message: 'Device token registered' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /notifications/send
exports.sendNotification = async (req, res) => {
  try {
    const { userId, token, tokens, title, body, data } = req.body;
    const imageUrl = getNavbarImageUrl(req);

    if (!title && !body) {
      return res
        .status(400)
        .json({ message: 'title or body is required' });
    }

    const targetTokens = [];
    if (token) targetTokens.push(token);
    if (Array.isArray(tokens)) targetTokens.push(...tokens);

    if (userId) {
      const devices = await DeviceToken.find({ userId });
      targetTokens.push(...devices.map(d => d.token));
    }

    const uniqueTokens = [...new Set(targetTokens.filter(Boolean))];
    if (uniqueTokens.length === 0) {
      return res
        .status(400)
        .json({ message: 'No target tokens found' });
    }

    const admin = getFirebaseAdmin();

    const payload = {
      notification: {
        title: title || 'Notification',
        body: body || '',
        image: imageUrl,
      },
      data: normalizeData({
        ...data,
        imageUrl,
      }),
    };

    const response = await admin.messaging().sendEachForMulticast({
      tokens: uniqueTokens,
      ...payload,
    });

    const invalidTokens = collectInvalidTokens(uniqueTokens, response.responses);
    await cleanupInvalidTokens(invalidTokens);

    return res.json({
      successCount: response.successCount,
      failureCount: response.failureCount,
      removedTokens: invalidTokens.length,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message || 'Send failed' });
  }
};

// POST /notifications/send-latest
exports.sendLatestNotification = async (req, res) => {
  try {
    const { title, body, data } = req.body || {};
    const imageUrl = getNavbarImageUrl(req);

    const latest = await DeviceToken.findOne().sort({ createdAt: -1 });
    if (!latest?.token) {
      return res.status(404).json({ message: 'No device tokens found' });
    }

    const admin = getFirebaseAdmin();
    const payload = {
      notification: {
        title: title || 'Test Notification',
        body: body || 'Hello from MyCartify backend',
        image: imageUrl,
      },
      data: normalizeData({
        ...data,
        imageUrl,
      }),
    };

    const response = await admin.messaging().sendEachForMulticast({
      tokens: [latest.token],
      ...payload,
    });

    const invalidTokens = collectInvalidTokens(
      [latest.token],
      response.responses,
    );
    await cleanupInvalidTokens(invalidTokens);

    return res.json({
      token: latest.token,
      successCount: response.successCount,
      failureCount: response.failureCount,
      removedTokens: invalidTokens.length,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message || 'Send failed' });
  }
};

