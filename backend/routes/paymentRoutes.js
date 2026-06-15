const express = require('express');
const paymentController = require('../controllers/paymentController');
const { authenticateRequired } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', authenticateRequired, paymentController.createOrder);
router.post('/verify', authenticateRequired, paymentController.verifyPayment);

module.exports = router;
