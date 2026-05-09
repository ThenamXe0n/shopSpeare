const CartModel = require("../model/cart.model");
/**
 *
 * @body {product:ObjectId,user:ObjectId,quantity:Number} req
 */
async function addToCart(req, res) {
  try {
    //check if already exist
    const isExist = await CartModel.findOne({
      user: req.userId,
      product: req.body.product,
    });

    if (isExist) {
      isExist.quantity += 1;
      await isExist.save();
      res.status(201).json({ message: `product added to cart`, data: isExist });
      return;
    }

    const cart = await CartModel.create({ ...req.body, user: req.userId });
    res.status(201).json({ message: `product added to cart`, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getUserCart(req, res) {
  try {
    const cart = await CartModel.find({ user: req.userId })
      .populate("product", "poster name price mrp discount")
      .populate("user", "name email");
    if (cart.length < 1) {
      return res
        .status(404)
        .json({
          message: "not items found . please add items to cart",
          data: [],
        });
    }
    res.status(200).json({ message: `cart fetched`, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// delete or remove cart item
async function removeUserCartItem(req, res) {
  try {
    const item = await CartModel.findByIdAndDelete(req.params.cartId);
    res.status(200).json({ message: "item removed successfully", data: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// required payload : cartId

module.exports = { addToCart, getUserCart ,removeUserCartItem};
