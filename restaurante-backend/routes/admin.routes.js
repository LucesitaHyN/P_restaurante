const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { body, param } = require('express-validator');

router.delete(
  '/producto/:id',
  [param('id').isInt()],
  AdminController.eliminarProducto
);

router.put(
  '/producto/:id',
  [
    param('id').isInt(),
    body('nombre').isString().isLength({ min: 2 }).trim().escape(),
    body('categoria').isString().isLength({ min: 2 }).trim().escape(),
    body('precio').isFloat({ gt: 0 })
  ],
  AdminController.editarProducto
);

router.put(
  '/pedido/:id',
  [
    param('id').isInt(),
    body('estado').isIn(['pendiente', 'entregado']),
    body('hora_estimada').optional().isString()
  ],
  AdminController.actualizarEstadoPedido
);

module.exports = router;
