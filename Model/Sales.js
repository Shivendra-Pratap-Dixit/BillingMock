const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  totalRevenue: Number,
  numberOfSales: Number,
  // Add any other metrics you want to track
},{
    versionKey:false
});

const Sales = mongoose.model('Sale', salesSchema);

module.exports = Sales;
