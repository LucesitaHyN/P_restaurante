const Producto = require('../models/producto.model');

exports.obtenerMenu = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

exports.agregarProducto = async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
};
