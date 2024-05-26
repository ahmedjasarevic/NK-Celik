const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: Schema.Types.ObjectId, ref: 'FanShopItem', required: true },
  quantity: { type: Number, default: 1 }  // Add quantity field
});

// Registrovanje modela FanShopItem pre njegove upotrebe
const FanShopItem = mongoose.model('FanShopItem', new Schema({}));
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
