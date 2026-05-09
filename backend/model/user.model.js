const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    profilePic: {
      type: String,
      default: "http://localhost:8080/upload/noprofile.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      house: String,
      city: String,
      pincode: String,
      state: String,
      contact: String,
    },
  },
  {
    timeseries: true,
    timestamps: true,
  },
);

module.exports = model("users", UserSchema);
