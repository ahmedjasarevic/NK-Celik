const mongoose = require('mongoose');

const fanShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true},
  category:{ type: String , required: true},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const FanShop = mongoose.model('FanShop', fanShopSchema);

module.exports = FanShop;