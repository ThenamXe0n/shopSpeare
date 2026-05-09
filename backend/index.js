require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const os = require("os");
const connectdatabse = require("./config/connectdb");
const ProductRouter = require("./routes/product.routes");
const UserRouter = require("./routes/user.routes");
const CartRouter = require("./routes/cart.routes");
const OrderRouter = require("./routes/order.routes");
const mylogger = require("./utils/loggerHelperFunction");
const PaymentRouter = require("./routes/payment.routes");
const cookieParser = require("cookie-parser");

//middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin: ["http://localhost:5173", "https://shop-speare.vercel.app"],
    credentials: true,
  }),
);

server.use("/", mylogger);
server.use("/upload", express.static("upload"));
server.use("/template", express.static("template"));

//routers
server.get("/health-check", (req, res) => {
  let details = { uptime: os.uptime(), message: "server is healthy" };
  res.status(200).json(details);
});

//product router
server.use("/product", ProductRouter);
//user router
server.use("/user", UserRouter);
//cart router
server.use("/cart", CartRouter);
//order router
server.use("/order", OrderRouter);

server.use("/payment",PaymentRouter);

server.listen(process.env.PORT, async () => {
  try {
    await connectdatabse();
    console.log(`server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
