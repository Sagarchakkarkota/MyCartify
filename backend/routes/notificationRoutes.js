const express = require('express');
const rateLimit = require('express-rate-limit');
const notificationController = require('../controllers/notificationController');
const {
  authenticateOptional,
  authenticateRequired,
  requireAdmin,
} = require('../middleware/auth');

const router = express.Router();

const sendLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/register-device',
  authenticateOptional,
  notificationController.registerDevice,
);
router.post(
  '/send',
  authenticateRequired,
  requireAdmin,
  sendLimiter,
  notificationController.sendNotification,
);
router.post(
  '/send-latest',
  authenticateRequired,
  requireAdmin,
  sendLimiter,
  notificationController.sendLatestNotification,
);

module.exports = router;

