const express = require('express');
const router = express.Router();
const PagosController = require('../controllers/pagos.controller');

router.post('/', PagosController.simularPago);

module.exports = router;
