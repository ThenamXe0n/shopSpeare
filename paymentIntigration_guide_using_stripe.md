md_text = """# Stripe Payment Gateway Integration Guide for MERN Ecommerce Project

## Beginner Friendly Step-by-Step Documentation
This guide is written for freshers. Follow each step carefully in order. Do not skip any step.

Stripe officially recommends Checkout Session based integration because it is secure, simple, and beginner friendly.

---

# Project Flow We Will Build

Cart Page → Click Pay Now → Backend creates Stripe Session → Stripe Hosted Payment Page Opens → User Pays with Test Card → Stripe Sends Success Webhook → Order Saved in MongoDB → Success Page Opens

---

# Prerequisites

Before starting, make sure:

- MERN ecommerce project is already running
- Frontend is React
- Backend is Node + Express
- MongoDB connected
- You already have Stripe account
- You have products/cart page ready

---

# Step 1: Install Required Packages

## Backend Packages

Open backend terminal and run:

```bash
npm install stripe dotenv body-parser
```
## Frontend Packages

Open frontend terminal and run:
```
npm install @stripe/stripe-js axios
```

### Step 2: Get Stripe API Keys

Login to Stripe Dashboard.

Go to:

Developers -> API Keys

Copy these two keys:

Publishable Key
Secret Key

Example:
```
pk_test_xxxxxxxxxxxxxxxxx
sk_test_xxxxxxxxxxxxxxxxx
```
### Step 3: Create Backend .env File

Inside backend root create .env

```
.env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
CLIENT_URL=http://localhost:5173
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
Step 4: Create Stripe Config File
```
## Create file:

server/config/stripe.js
```
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
```
Step 5: Create Payment Controller

## Create file:

server/controllers/paymentController.js
```
import stripe from "../config/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, userId, shippingAddress } = req.body;

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId,
        shippingAddress: JSON.stringify(shippingAddress),
        cartItems: JSON.stringify(cartItems),
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```
Step 6: Create Payment Route

## Create file:

server/routes/paymentRoutes.js
```
import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;
```
Step 7: Connect Route in server.js

## Inside server.js
```
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/payment", paymentRoutes);
Step 8: Create Order Model

Create file:

server/models/orderModel.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String,
  items: Array,
  shippingAddress: Object,
  totalAmount: Number,
  paymentStatus: String,
  stripeSessionId: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
```

### Step 9: Create Webhook Controller

Create file:

server/controllers/webhookController.js
```
import stripe from "../config/stripe.js";
import Order from "../models/orderModel.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const cartItems = JSON.parse(session.metadata.cartItems);
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);

    const newOrder = new Order({
      user: session.metadata.userId,
      items: cartItems,
      shippingAddress,
      totalAmount: session.amount_total / 100,
      paymentStatus: "Paid",
      stripeSessionId: session.id,
    });

    await newOrder.save();
  }

  res.json({ received: true });
};
```

## Step 10: Add Webhook Route in server.js
```
import { stripeWebhook } from "./controllers/webhookController.js";

app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

Important:
Webhook route should be added before express.json middleware if body issues happen.

Step 11: Create React Checkout Button

Create component:

src/components/CheckoutButton.jsx

import axios from "axios";

function CheckoutButton({ cartItems, userId, shippingAddress }) {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
        cartItems,
        userId,
        shippingAddress,
      });

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleCheckout}>Pay Now</button>;
}

export default CheckoutButton;
```

## Step 12: Create Payment Success Page

Create:

src/pages/PaymentSuccess.jsx

```
function PaymentSuccess() {
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your order has been placed.</p>
    </div>
  );
}

export default PaymentSuccess;
```

Add route in React Router.

## Step 13: Setup Stripe Webhook Secret

Install Stripe CLI in system.

Then run:
```
stripe listen --forward-to localhost:5000/webhook
```
CLI gives:
```
whsec_xxxxxxxxxxxxx
```
Copy this into .env file.

### Step 14: Run Project

Run backend:
```
npm start

Run frontend:

npm run dev
```
Make sure both are running.

## Step 15: Test Payment

Add products to cart.

Click Pay Now.

Stripe payment page will open.

Use test card:
```
4242 4242 4242 4242
Any future date
Any CVV
Any ZIP
```
Payment success.

For failed payment use:
```
4000 0000 0000 0002
Step 16: Check MongoDB
```
After successful payment:

Order document should be created in MongoDB orders collection.

## Common Beginner Mistakes
Mistake 1: Secret key wrong

Always use sk_test

Mistake 2: Frontend URL wrong

Check CLIENT_URL

Mistake 3: Webhook secret missing

Without webhook order will not save

Mistake 4: Cart data undefined

Send proper cartItems array

Mistake 5: Port mismatch

Backend and frontend ports should match your project

Final Working Result

Students will get:

Real Stripe Hosted Checkout
Test Payment Success/Failure
MongoDB Order Save
Payment Success Page
Professional Ecommerce Payment Flow
Recommended Folder Structure
```
server/
┣ config/
┃ ┗ stripe.js
┣ controllers/
┃ ┣ paymentController.js
┃ ┗ webhookController.js
┣ models/
┃ ┗ orderModel.js
┣ routes/
┃ ┗ paymentRoutes.js

src/
┣ components/
┃ ┗ CheckoutButton.jsx
┣ pages/
┃ ┗ PaymentSuccess.jsx
```
Extra Recommendation

Do one step at a time.
After every step run project and check errors.

Do not copy everything blindly.

Understand file path carefully.

End of Documentation
"""
