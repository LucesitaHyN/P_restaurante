const express = require('express');
const router = express.Router();
const PagosController = require('../controllers/pagos.controller');
const { body } = require('express-validator');

router.post(
  '/',
  [
    body('pedidoId').isInt(),
    body('productos').isArray({ min: 1 }),
    body('productos.*.nombre').isString().isLength({ min: 1 }).trim().escape(),
    body('productos.*.precio').isFloat({ gt: 0 }),
    body('productos.*.cantidad').isInt({ gt: 0 })
  ],
  PagosController.realizarPago
);

module.exports = router;

