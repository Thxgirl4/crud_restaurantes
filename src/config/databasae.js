const { Pool } = require('pg');
const dotenv = require('dotenv');
const { connect } = require('../routes');
const { text } = require('express');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASEURL
});

pool.on('connect', () => {
    console.log('Base de dados conectada');
});

module.exports = {
    query: (text, params) = pool.query(text, params),
};