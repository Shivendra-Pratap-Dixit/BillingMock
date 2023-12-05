const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    items: [{ name: String, quantity: Number }],
    totalCost: Number,
    date: Date,
  },
{
    versionKey:false
}
);

const Bill = mongoose.model('bill', billSchema);

module.exports = {Bill};
