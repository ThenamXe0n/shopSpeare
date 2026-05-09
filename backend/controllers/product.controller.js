const ProductModel = require("../model/product.model");

// create product controller
/**
 * 
 * @body {name,productImage:File,category,desc,price,mrp,discount,rating,review,stock,brand}
 * content-type: multipart/form-data
 * @response {message,data}
 * data: {
        "name": "new product",
        "poster": "http://localhost:8080/upload/product/1777378107428-noprofile.jpg",
        "images": [],
        "category": "undefined",
        "desc": "test test",
        "price": 8000,
        "mrp": 10000,
        "discount": 0,
        "rating": 5,
        "review": 0,
        "stock": 0,
        "brand": "generic",
        "isDeleted": false,
        "isActive": true,
        "productCode": "NEW-JHJ-677",
        "_id": "69f0a33b47fce4f4445a31c1",
        "createdAt": "2026-04-28T12:08:27.446Z",
        "updatedAt": "2026-04-28T12:08:27.446Z",
        "__v": 0}
 */
async function createProduct(req, res) {
  console.log("controller started createProduct");
  console.log(req.body);
  const payload = req.body;
  if (req.file) {
    let posterurl = `http://localhost:8080/${req.file.destination}/${req.file.filename}`;
    payload.poster = posterurl;
  } else {
    payload.poster = `http://jkhkjhkjh.com/img.png`;
  }

  try {
    const product = await ProductModel.create(payload);
    res.status(201).json({
      message: `${product.name} with code ${product.productCode} is added successfully`,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function fetchProducts(req, res) {
  let query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.price) {
    query.price = req.query.price;
  }

  let page = req.query.page || 1;
  let itemPerPage = req.query.limit || 6;
  let skip = (page - 1) * itemPerPage;

  try {
    const totalProductCount = await ProductModel.countDocuments();
    const products = await ProductModel.find(query)
      .skip(skip)
      .limit(itemPerPage);
    res
      .status(200)
      .json({
        message: "product fetched successfully",
        data: products,
        limit: itemPerPage,
        total: totalProductCount,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function fetchProductById(req, res) {
  const { id } = req.params;
  try {
    const products = await ProductModel.findById(id);
    res
      .status(200)
      .json({ message: "product fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createProduct, fetchProducts, fetchProductById };
