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
