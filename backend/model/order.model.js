const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        productDetails: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
          max: 5,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      fullName: {
        type: String,
        required: true,
      },
      house: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      addressLine: {
        type: String,
      },
      landmark: {
        type: String,
      },
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "out for delivery",
        "cancelled",
      ],
      default: "pending",
    },
    discount: {
      type: Number,
      default: 0,
    },
    paymentMode: {
      type: String,
      default: "cod",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    timeseries: true,
  },
);

module.exports = model("orders", OrderSchema);
