const crypto = require('crypto');

const RAZORPAY_ORDERS_URL = 'https://api.razorpay.com/v1/orders';

const getRazorpayCredentials = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured');
  }

  return { keyId, keySecret };
};

const createBasicAuthHeader = ({ keyId, keySecret }) => {
  const token = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  return `Basic ${token}`;
};

const normalizeAmount = amount => {
  const value = Number(amount);

  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return Math.round(value);
};

const createOrder = async (req, res) => {
  try {
    const amount = normalizeAmount(req.body.amount);
    const currency = req.body.currency || 'INR';

    if (!amount) {
      return res.status(400).json({ message: 'Valid amount is required' });
    }

    const credentials = getRazorpayCredentials();
    const receipt = `rcpt_${Date.now()}_${req.user?.sub || 'guest'}`;

    const razorpayResponse = await fetch(RAZORPAY_ORDERS_URL, {
      method: 'POST',
      headers: {
        Authorization: createBasicAuthHeader(credentials),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt,
        notes: {
          userId: req.user?.sub || '',
          itemCount: String(req.body.itemCount || ''),
        },
      }),
    });

    const order = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      return res.status(razorpayResponse.status).json({
        message: order?.error?.description || 'Unable to create payment order',
      });
    }

    return res.status(201).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Payment error' });
  }
};

const verifyPayment = (req, res) => {
  try {
    const { keySecret } = getRazorpayCredentials();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ message: 'Payment verification fields are required' });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature);
    const receivedBuffer = Buffer.from(razorpay_signature);

    const isValid =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    return res.json({
      verified: true,
      razorpay_order_id,
      razorpay_payment_id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Payment verification error' });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
