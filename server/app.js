const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser')
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);

const indexRouter = require('./routes/index');

const app = express();

mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://admin:admin@beastecomdb.mzhjqid.mongodb.net/?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: mongoDB,
  collection: 'session'
})

// set cors policy
app.use(cors({
  origin: true,
  credentials: true
}));

app.set('trust proxy', 1);
app.use(session({
  secret: "deeznutsasdfjhsio9023u90",
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 60
  },
  resave: false,
  proxy: true,
  store: store
}));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
