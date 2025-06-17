const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

router.delete('/producto/:id', AdminController.eliminarProducto);
router.put('/producto/:id', AdminController.editarProducto);

module.exports = router;
