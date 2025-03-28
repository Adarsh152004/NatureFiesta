const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const products = await Product.find();
  console.log('Entered');

  res.status(200).render('overview', {
    title: 'All Products',
    products,
  });
});

exports.getCategories = catchAsync(async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  // console.log(products, category);

  res.status(200).render('category', {
    title: category,
    products,
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  res.status(200).render('categories', {
    title: 'Category',
  });
});

exports.contact = catchAsync(async (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact',
  });
});

exports.cart = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).render('cart', {
    title: 'Cart',
    products,
  });
});

exports.getProduct = catchAsync(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  res.status(200).render('product', {
    title: product.name,
    product,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Account',
  });
};

exports.order = (req, res) => {
  res.status(200).render('orders', {
    title: 'Orders',
  });
};

exports.reviews = (req, res) => {
  res.status(200).render('reviews', {
    title: 'All Reviews',
  });
};

exports.billing = (req, res) => {
  res.status(200).render('billing', {
    title: 'Billing',
  });
};
