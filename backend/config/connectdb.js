const mongoose = require("mongoose");

async function connectdatabse() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully")
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connectdatabse;
