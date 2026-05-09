const OrderModel = require("../model/order.model");
const { generateOrderId } = require("../utils/helpers");

/**
 * @body {user:ObjectId,items:[{productDetails:ObjectId,quantity:Number,price:Number}],address:{house:String,city:String,pincode:String,state:String,contact:String}} req
 * returns {message:String,data:Object}
 * @method POST
 * @routePath /order/generate
 */

async function generateOrder(req, res) {
  const { items, address, totalAmount } = req.body;
  const userId = req.userId
  console.log(userId)
  // if (!userId || !items || !address || !totalAmount) {
  //   return res.status(400).json({ message: "all fields are required" });
  // }
  if (totalAmount <= 0) {
    return res
      .status(400)
      .json({ message: "total amount should be greater than zero" });
  }
  let payload = { ...req.body,user:userId };
  try {
    let orderId = generateOrderId();
    payload.orderId = orderId;
    const order = await OrderModel.create(payload);
    res
      .status(201)
      .json({ message: `order generated successfully`, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * @params {userId} req
 * @routePath /order/:userId/getall
 */

async function getOrdersByUserId(req, res) {
  const  userId  = req.userId;
  try {
    const orders = await OrderModel.find({ user: userId })
      .populate("user", "name email")
      .populate("items.productDetails", "name poster category brand");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "no orders found for this user" });
    }
    res
      .status(200)
      .json({ message: "orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { generateOrder, getOrdersByUserId };
