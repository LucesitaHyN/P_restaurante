const Pedido = require('../models/pedido.model');

exports.obtenerPedidos = async (req, res) => {
  const pedidos = await Pedido.find();
  res.json(pedidos);
};

exports.crearPedido = async (req, res) => {
  const nuevo = new Pedido(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
};

exports.actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const pedido = await Pedido.findByIdAndUpdate(id, { estado }, { new: true });
  res.json(pedido);
};
