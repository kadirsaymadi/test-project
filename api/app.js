/*-------  Defines -------*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// dotenv running
require("dotenv").config();

/*-------  Create Express App -------*/
const app = express();

/*-------  Project Settings -------*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const corsOptions = {
  exposedHeaders: ['Content-Length', 'Developer-By', 'X-Powered-By', "File-Name"],
  origin: ["http://www.domain.com", "http://localhost:3002"],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*-------  Routes -------*/

// product
const productController = require("./controller/productController.js");
app.use('/get-product-list', productController.getProductList);

/*-------  Error Settings -------*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (process.env.DEVELOPMENT_MODE == "true") {
    // geliştirme ortamı için
    res.json({
      message: err.message,
      status: err.status,
      error_stack: err.stack
    });
  } else {
    // // sunucuda çalışalcak
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;