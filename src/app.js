const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();


const index = require('./routes/index');
const restaurantRoutes = require('./routes/restaurantes_routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

// arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);
app.use('/api', restaurantRoutes);

module.exports = app;