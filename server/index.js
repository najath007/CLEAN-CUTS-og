require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Connect to Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // set this on Render to your Vercel URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed: ' + origin));
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

const Product = require('./models/Product');
const products = require('./data/products');

// Seed route (Temporary - to bypass Render Free Tier Shell limits)
app.get('/api/seed', async (req, res) => {
    try {
        await Product.deleteMany();
        const sampleProducts = products.map(p => {
            const { id, ...rest } = p;
            return rest;
        });
        await Product.insertMany(sampleProducts);
        res.send('Database successfully seeded! You can now deploy Vercel.');
    } catch (error) {
        res.status(500).send('Error seeding database: ' + error.message);
    }
});

// Base route
app.get('/', (req, res) => {
    res.send('CleanCuts API is running with MongoDB...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
