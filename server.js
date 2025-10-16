// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// INSTANTIATIONS
const app = express();
const port = 3500;

// CONFIGURATIONS
// Pug Connection
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Mongoose Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL)
    .then(() => console.log('Successfully Connected To MongoDB'))
    .catch((err) => console.log(`Connection error: ${err.message}`));

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IMPORT ROUTES
const formRoutes = require('./routes/formRoutes');

// USE ROUTES
app.use('/', formRoutes);

// SERVER
app.listen(port, () => console.log(`Listening On Port ${port}`));