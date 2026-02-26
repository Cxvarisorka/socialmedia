const express = require('express');

// Controllers
const { createProduct, getProducts, getProduct, deleteProduct } = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;