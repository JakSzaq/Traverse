const FuelPrice = require('../models/fuelPriceModel');
const catchAsync = require('../utils/catchAsync');
const cheerio = require('cheerio');

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

exports.updatePrices = async () => {
  const fuelPrices = await FuelPrice.findOne();
  const newPrices = [];
  const response = await fetch('https://www.autocentrum.pl/paliwa/ceny-paliw/');
  const result = await response.text();
  const $ = cheerio.load(result);
  $('.price').each(function () {
    newPrices.push($(this).html().replace(/\s/g, '').substring(0, 4));
  });

  if (newPrices.length == 0) {
    return true;
  }

  fuelPrices.PB95 = newPrices[0];
  fuelPrices.PB98 = newPrices[1];
  fuelPrices.ON = newPrices[2];
  fuelPrices.ONPLUS = newPrices[3];
  fuelPrices.LPG = newPrices[4];
  fuelPrices.EV = '2,40';

  fuelPrices.save();
};
