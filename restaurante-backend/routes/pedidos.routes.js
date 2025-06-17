const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos.controller');

router.get('/', PedidosController.obtenerPedidos);
router.post('/', PedidosController.crearPedido);
router.put('/:id', PedidosController.actualizarEstado);

module.exports = router;
