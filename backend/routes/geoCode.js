const express = require('express');
const router = express.Router();
const geoCodeCtrl = require('../controllers/geoCode');

router.post('/', geoCodeCtrl.getGeoCode);

module.exports = router;