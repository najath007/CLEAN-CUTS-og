const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const staticProducts = require('../data/products');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const products = await Product.find({});
            // Map _id to id for frontend compatibility
            const mappedProducts = products.map(p => ({
                ...p._doc,
                id: p._id
            }));
            res.json(mappedProducts);
        } else {
            // Fallback to static data
            res.json(staticProducts);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const product = await Product.findById(req.params.id);
            
            if (product) {
                res.json({
                    ...product._doc,
                    id: product._id
                });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } else {
            // Fallback to static data
            const product = staticProducts.find(p => p.id.toString() === req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
