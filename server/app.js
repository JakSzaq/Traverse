const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const schedule = require('node-schedule');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const fuelPriceController = require('./controllers/fuelPriceController');

const app = express();

const job = schedule.scheduleJob('0 12 * * *', function () {
  fuelPriceController.updatePrices();
});

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://traverse-jn61.onrender.com'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ROUTES
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
