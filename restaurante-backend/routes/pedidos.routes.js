const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos.controller');
const { body, param } = require('express-validator');

router.get('/', PedidosController.obtenerPedidos);

router.post(
  '/',
  [
    body('productos').isArray({ min: 1 }),
    body('productos.*.id').isInt(),
    body('productos.*.cantidad').isInt({ gt: 0 }),
    body('total').isFloat({ gt: 0 })
  ],
  PedidosController.crearPedido
);

router.put(
  '/:id',
  [
    param('id').isInt(),
    body('estado').isIn(['pendiente', 'entregado'])
  ],
  PedidosController.actualizarEstado
);

module.exports = router;
