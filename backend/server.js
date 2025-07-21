const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
app.use('/api/orders', require('./routes/orderRoutes'));


dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/products', productRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

