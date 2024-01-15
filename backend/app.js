const express = require('express');
const daoWalletRoutes = require('./routes/daoWallet.js');
const dotenv = require('dotenv');
dotenv.config({
    path: '.env'
});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/daoWallet', daoWalletRoutes);

module.exports = app;