const stripe = require("../config/stripe");

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems, shippingAddress } = req.body;

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.poster],
        },
        unit_amount: item.price * 100, //paisa
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      customer_email: `test${Date.now()}@gmail.com`,

      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN", "US", "GB", "CA", "AU"],
      },
      metadata: {
        userId,
        shippingName: shippingAddress.fullName,
        shippingPhone: shippingAddress.contact,
        shippingPincode: shippingAddress.pincode,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingAddressLine: shippingAddress.addressLine,
        shippingLandmark: shippingAddress.landmark,
        cartItems: JSON.stringify(cartItems),
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCheckoutSession };
