const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');

router.get('/', MenuController.obtenerMenu);
router.post('/', MenuController.agregarProducto);

module.exports = router;
