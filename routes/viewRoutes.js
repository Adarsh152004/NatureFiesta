const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get(
  '/categories/:category',
  authController.isLoggedIn,
  viewsController.getCategories
);
router.get(
  '/product/:slug',
  authController.isLoggedIn,
  viewsController.getProduct
);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/category', authController.isLoggedIn, viewsController.getCategory);
router.get('/contact', authController.isLoggedIn, viewsController.contact);

router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router;
