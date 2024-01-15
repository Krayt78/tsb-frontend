const express = require('express');
const router = express.Router();
const daoWalletCtrl = require('../controllers/daoWallet');

router.post('/', daoWalletCtrl.getDaoBalances);

module.exports = router;