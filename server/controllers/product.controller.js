const Product = require("../models/product.model.js");

// POST /product (Creates new product object)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, img } = req.body;

        const newProduct = await Product.create({name, description, price, stock, img});

        res.status(201).json(newProduct);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

// GET /product (Returns all products)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(201).json(products);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

// GET /product (Returns product by ID)
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        res.status(201).json(product);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

// DELETE /product (DELETES product by ID)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(204).send();
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};


module.exports = { createProduct, getProducts, getProduct, deleteProduct };