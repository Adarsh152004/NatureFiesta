// routes/paymentRoute.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');

router.post(
  '/orders/create',
  authController.protect,
  paymentController.createOrder
);
module.exports = router;
