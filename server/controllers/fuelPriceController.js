const cheerio = require('cheerio');
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

exports.updatePrices = catchAsync(async (req, res, next) => {
  const fuelPrices = await FuelPrice.findOne();
  const newPrices = [];
  const response = await fetch(
    'https://www.autocentrum.pl/paliwa/ceny-paliw/',
    { method: 'GET' }
  );
  const result = await response.text();
  const $ = cheerio.load(result);
  $('.price').each(function () {
    newPrices.push($(this).html().replace(/\s/g, '').substring(0, 4));
  });

  if (newPrices.length == 0) {
    return;
  }

  fuelPrices.PB95 = newPrices[0];
  fuelPrices.PB98 = newPrices[1];
  fuelPrices.ON = newPrices[2];
  fuelPrices.ONPLUS = newPrices[3];
  fuelPrices.LPG = newPrices[4];
  fuelPrices.EV = calculateEV(newPrices);
  fuelPrices.updatedAt = new Date();
  console.log(fuelPrices);
  fuelPrices.save();

  res.status(200).json({
    status: 'success',
    data: {
      fuelPrices,
    },
  });
});

const calculateEV = (prices) => {
  let value = 0;
  prices.map((price) => {
    value += parseFloat(price.replace(',', '.'));
  });
  value = (value / 10).toFixed(2);
  return value;
};
