require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./model/user.model");
const Product = require("./model/product.model");
const Cart = require("./model/cart.model");
const connectdatabse = require("./config/connectdb");

// =============================
// MongoDB Connection
// =============================

// =============================
// SAMPLE USERS
// =============================
const users = [
  {
    profilePic: "http://localhost:8080/upload/user1.jpg",
    email: "john@example.com",
    password: "khhkjhkjhkjhjkh",
    name: "john doe",
    contact: "9876543210",
    address: {
      house: "12A",
      city: "Mumbai",
      pincode: "400001",
      state: "Maharashtra",
      contact: "9876543210",
    },
  },
  {
    profilePic: "http://localhost:8080/upload/user2.jpg",
    email: "alice@example.com",
    password: "123456",
    name: "alice smith",
    contact: "9876543211",
    address: {
      house: "45B",
      city: "Delhi",
      pincode: "110001",
      state: "Delhi",
      contact: "9876543211",
    },
  },
];

// =============================
// SAMPLE PRODUCTS
// =============================
const products = [
  {
    name: "iphone 14",
    poster: "http://localhost:8080/upload/iphone14.jpg",
    images: [
      "http://localhost:8080/upload/iphone14-1.jpg",
      "http://localhost:8080/upload/iphone14-2.jpg",
    ],
    category: "mobile",
    desc: "latest apple iphone 14 with a15 bionic chip",
    price: 70000,
    mrp: 80000,
    discount: 12,
    rating: 4.7,
    review: 120,
    stock: 15,
    brand: "apple",
    productCode: "APLIP14",
  },
  {
    name: "samsung galaxy s23",
    poster: "http://localhost:8080/upload/s23.jpg",
    images: [
      "http://localhost:8080/upload/s23-1.jpg",
      "http://localhost:8080/upload/s23-2.jpg",
    ],
    category: "mobile",
    desc: "flagship samsung smartphone with amazing display",
    price: 65000,
    mrp: 73000,
    discount: 10,
    rating: 4.5,
    review: 95,
    stock: 20,
    brand: "samsung",
    productCode: "SAMS23",
  },
  {
    name: "boat rockerz 450",
    poster: "http://localhost:8080/upload/boat450.jpg",
    images: [
      "http://localhost:8080/upload/boat450-1.jpg",
      "http://localhost:8080/upload/boat450-2.jpg",
    ],
    category: "headphone",
    desc: "wireless bluetooth over ear headphone",
    price: 1499,
    mrp: 3999,
    discount: 62,
    rating: 4.3,
    review: 340,
    stock: 50,
    brand: "boat",
    productCode: "BOAT450",
  },
  {
    name: "nike running shoes",
    poster: "http://localhost:8080/upload/nike.jpg",
    images: [
      "http://localhost:8080/upload/nike1.jpg",
      "http://localhost:8080/upload/nike2.jpg",
    ],
    category: "footwear",
    desc: "comfortable lightweight running shoes",
    price: 2999,
    mrp: 4999,
    discount: 40,
    rating: 4.4,
    review: 210,
    stock: 35,
    brand: "nike",
    productCode: "NIKERUN01",
  },
];

// =============================
// SEED FUNCTION
// =============================
const seedDatabase = async () => {
  try {
    await connectdatabse();
    console.log("Deleting old data...");

    // await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();

    console.log("Old data removed");

    // Insert Users
    const insertedUsers = await User.insertMany(users);
    console.log("Users inserted");

    // Insert Products
    const insertedProducts = await Product.insertMany(products);
    console.log("Products inserted");

    // Create carts using inserted ids
    const carts = [
      {
        user: insertedUsers[0]._id,
        product: insertedProducts[0]._id,
        quantity: 1,
      },
      {
        user: insertedUsers[0]._id,
        product: insertedProducts[2]._id,
        quantity: 2,
      },
      {
        user: insertedUsers[1]._id,
        product: insertedProducts[1]._id,
        quantity: 1,
      },
      {
        user: insertedUsers[1]._id,
        product: insertedProducts[3]._id,
        quantity: 3,
      },
    ];

    await Cart.insertMany(carts);
    console.log("Carts inserted");

    console.log("Database Seeded Successfully ✅");
    process.exit();
  } catch (error) {
    console.log("Seeder Error:", error);
    process.exit(1);
  }
};

seedDatabase();
