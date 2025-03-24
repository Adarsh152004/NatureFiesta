const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
router.get('/categories/:category', viewsController.getCategories);
router.get('/product/:slug', viewsController.getProduct);
router.get('/login', viewsController.getLoginForm);
router.get('/category', viewsController.getCategory);

module.exports = router;
