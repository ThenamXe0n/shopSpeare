const { createCheckoutSession } = require("../controllers/payment.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.post("/create-checkout-session", isLoggedIn, createCheckoutSession);

module.exports = router;
