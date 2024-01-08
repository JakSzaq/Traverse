const catchAsync = require('../utils/catchAsync');
const FuelPrice = require('../models/fuelPriceModel');

exports.getPrices = catchAsync(async (req, res, next) => {
  const prices = await FuelPrice.find();

  res.status(200).json({
    status: 'success',
    results: prices.length,
    data: {
      prices,
    },
  });
});
