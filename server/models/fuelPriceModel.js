const mongoose = require('mongoose');

const fuelPriceSchema = new mongoose.Schema({
  PB95: String,
  PB98: String,
  ON: String,
  ONPLUS: String,
  LPG: String,
  EV: String,
  currency: String,
  updatedAt: Date,
});

const FuelPrice = mongoose.model('FuelPrice', fuelPriceSchema);

module.exports = FuelPrice;
