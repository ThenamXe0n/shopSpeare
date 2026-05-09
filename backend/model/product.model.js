const { Schema, model } = require("mongoose");

// fields
// name,poster,images,category,desc,price,mrp,discount,rating,review,stock,brand,isDeleted,isActive,productCode

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    poster: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      default: "undefined",
      trim: true,
      lowercase: true,
    },

    desc: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0, // percentage
      min: 0,
      max: 100,
    },

    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    review: {
      type: Number,
      default: 0, // total review count
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    brand: {
      type: String,
      default: "generic",
      trim: true,
      lowercase: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
    timeseries: true,
  },
);

module.exports = model("products", ProductSchema);
