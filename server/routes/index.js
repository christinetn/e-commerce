const express = require('express');
const router = express.Router();
const session = require('express-session');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

router.use(session({
  secret: "deeznutsasdfjhsio9023u90",
  saveUninitialized: true,
  resave: false,
  proxy: true,
}));

// session debug
//router.use(function(req, res, next) {
//  console.log('Session ID:', req.sessionID);
//  console.log('Session:', req.session);
//  next();
//});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res) {
  res.render('index', { title: req.sessionID });
});

router.get('/products', (req, res) => {
  Product.find().exec().then(function (products) {
    return res.status(200).send({
      message: "Product retrieved sucesffully.",
      data: products
    })
  }).catch(function (err) {
    return res.status(500).send({
      message: "Error retrieving products.",
      data: []
    })
  })
});

router.post('/products', function (req, res) {
  // sanity checks
  if (req.body.id === null) {
    return res.status(400).send({
      message: "Missing required field \"id\"",
      data: []
    })
  }

  if (req.body.name === null) {
    return res.status(400).send({
      message: "Missing required field \"name\"",
      data: []
    })
  }

  if (req.body.subtitle === null) {
    return res.status(400).send({
      message: "Missing required field \"subtitle\"",
      data: []
    })
  }

  if (req.body.price === null) {
    return res.status(400).send({
      message: "Missing required field \"price\"",
      data: []
    })
  }

  if (req.body.reviews === null) {
    return res.status(400).send({
      message: "Missing required field \"reviews\"",
      data: []
    })
  }

  if (req.body.imageURL === null) {
    return res.status(400).send({
      message: "Missing required field \"image\"",
      data: []
    })
  }

  if (req.body.description === null) {
    return res.status(400).send({
      message: "Missing required field \"description\"",
      data: []
    })
  }

  // create product
  const product = new Product();

  product.id = req.body.id;
  product.name = req.body.name;
  product.subtitle = req.body.subtitle;
  product.price = req.body.price;
  product.reviews = req.body.reviews;
  product.imageURL = req.body.imageURL;
  product.description = req.body.description;

  product.save().then(function (product) {
    return res.status(200).send({
      message: "Product created successfully.",
      data: product
    })
  }).catch(function (err) {
    console.log(err)
    return res.status(500).send({
      message: "Error creating product.",
      data: []
    })
  })
})

// add to cart
router.get('/cart/add/:id', async (req, res) => {
  const productId = req.params.id;
  //console.log('---------------------');
  //console.log(req.sessionID);
  //console.log(req.session.cart);
  //console.log('---------------------');
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  await Product.findById(productId).then((product) => {
    cart.addItem(product.id, product, product.price);
  });
  req.session.cart = cart;
  //console.log(req.session.cart);
  res.send('Added to cart!');
});

// remove from cart
router.get('/cart/remove/:id', async (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  await Product.findById(productId).then((product) => {
    res.send(`${cart.removeItem(product.id, product.price, () => {
      req.session.cart = cart;
    })}`);
  });
});

// get cart contents
router.get('/cart', (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  res.send(cart.get());
});

// get cart count
router.get('/cart/count', (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  res.send(`${cart.getCount()}`);
});

// get cart subtotal
router.get('/cart/subtotal', (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  res.send(`${cart.getSubtotal()}`);
});

// clear cart
router.get('/cart/clear', (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.clear();
  req.session.cart = cart;
  res.send('Cart cleared!');
});

// submit order
router.post('/cart/submit', function (req, res) {
  const order = new Order();

  order.firstName = req.body.firstName;
  order.lastName = req.body.lastName;
  order.email = req.body.email;
  order.phone = req.body.phone;
  order.address1 = req.body.address1;
  order.address2 = req.body.address2;
  order.city = req.body.city;
  order.state = req.body.state;
  order.zip = req.body.zip;
  order.card = req.body.card;
  order.cvc = req.body.cvc;
  order.shipping = req.body.shipping;
  order.cartContents = req.body.cartContents;
  order.subtotal = req.body.subtotal;
  order.id = req.body.id;
  //console.log(order)
  order.save().then(function (order) {
    return res.status(200).send({
      message: "Order created successfully.",
      data: order
    })
  }).catch(function (err) {
    console.log(err)
    return res.status(500).send({
      message: "Error creating order.",
      data: []
    })
  })
})

// get order history
router.get('/orders', (req, res) => {
  Order.find().exec().then(function (order) {
    return res.status(200).send({
      message: "Orders retrieved sucesffully.",
      data: order
    })
  }).catch(function (err) {
    return res.status(500).send({
      message: "Error retrieving orders.",
      data: []
    })
  })
});

// get order by id
router.get('/order/:id', async (req, res) => {
  const orderId = req.params.id;
  const order = []
  await Order.findOne({id: orderId}).then(field => {
    order.push(field)
  })
  res.send(order);
})

module.exports = router;
