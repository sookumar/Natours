const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) Global middlewares

// Serving Static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP Headers
const cspConnectSrc = [
  "'self'",
  'http://127.0.0.1:8000',
  'https://maps.googleapis.com',
  'https://maps.gstatic.com',
  'https://*.googleapis.com',
  'https://*.gstatic.com',
  'https://cdnjs.cloudflare.com',
];

if (process.env.NODE_ENV === 'development') {
  cspConnectSrc.push('ws://localhost:*', 'ws://127.0.0.1:*', 'ws:');
}
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://maps.googleapis.com',
        'https://maps.gstatic.com',
        "'unsafe-inline'",
        'https:',
      ],
      connectSrc: cspConnectSrc,
      imgSrc: [
        "'self'",
        'data:',
        'https://maps.googleapis.com',
        'https://maps.gstatic.com',
        'https://*.googleapis.com',
        'https://*.gstatic.com',
      ],
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com',
        'https://maps.googleapis.com',
        "'unsafe-inline'",
        'https://cdnjs.cloudflare.com',
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    },
  }),
);
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after one hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitazation against NOSQL query injection
app.use(mongoSanitize());

// Data sanitizaion against XSS(cross side scripting)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.set('query parser', 'extended');

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3)  Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
