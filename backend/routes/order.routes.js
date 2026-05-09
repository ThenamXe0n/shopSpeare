const { generateOrder,getOrdersByUserId } = require("../controllers/order.controller");
const {isLoggedIn} = require("../middleware/auth.middleware")
const router = require("express").Router();


router.post("/generate",isLoggedIn, generateOrder);
router.get("/myorders",isLoggedIn, getOrdersByUserId);

module.exports = router;