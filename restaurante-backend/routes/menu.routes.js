const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');
const { body } = require('express-validator');

router.get('/', MenuController.obtenerMenu);

router.post(
  '/',
  [
    body('nombre').isString().isLength({ min: 2 }).trim().escape(),
    body('categoria').isString().isLength({ min: 2 }).trim().escape(),
    body('precio').isFloat({ gt: 0 })
  ],
  MenuController.agregarProducto
);

module.exports = router;
