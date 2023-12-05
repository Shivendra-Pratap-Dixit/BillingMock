const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {router} = require('./Route/api');
require("dotenv").config()
const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB


// Use API routes
app.use('/', router);

// Start the server
app.listen(PORT, async() => {
    await mongoose.connect(process.env.DB);
  console.log(`Server is running on port ${PORT} and connected to DB`);
});
