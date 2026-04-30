require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

const importData = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await Product.deleteMany();
        
        // Remove 'id' field as Mongo creates '_id' automatically
        const sampleProducts = products.map(p => {
            const { id, ...rest } = p;
            return rest;
        });
        
        await Product.insertMany(sampleProducts);
        
        console.log('Data Imported successfully into MongoDB!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

importData();
