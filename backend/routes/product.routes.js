const upload = require("../config/multer");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
} = require("../controllers/product.controller");

const router = require("express").Router();

//api endpoint or routers
router.post("/", upload.single("productImage"), createProduct);

// get all product
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);

module.exports = router;
