const { Schema, model } = require("mongoose");

//schema fields
// quntity,product:productId,user:userId,

const CartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
});

module.exports = model("carts", CartSchema);
