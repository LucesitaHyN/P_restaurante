
const pool = require('../db');
const { validationResult } = require('express-validator');
const validator = require('validator');

exports.eliminarProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ mensaje: 'ID inválido' });

  await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  res.json({ mensaje: 'Producto eliminado' });
};

exports.editarProducto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

  const id = parseInt(req.params.id);
  let { nombre, categoria, precio } = req.body;

  nombre = validator.escape(nombre);
  categoria = validator.escape(categoria);

  await pool.query(
    'UPDATE productos SET nombre = ?, categoria = ?, precio = ? WHERE id = ?',
    [nombre, categoria, precio, id]
  );

  res.json({ mensaje: 'Producto actualizado' });
};

exports.actualizarEstadoPedido = async (req, res) => {
  const { estado, hora_estimada } = req.body;
  const id = parseInt(req.params.id);

  if (!['pendiente', 'entregado'].includes(estado)) {
    return res.status(400).json({ mensaje: 'Estado inválido' });
  }

  let query = 'UPDATE pedidos SET estado = ?';
  const params = [estado];

  if (estado === 'pendiente' && hora_estimada) {
    query += ', hora_estimada = ?';
    params.push(hora_estimada);
  }

  if (estado === 'entregado') {
    query += ', fecha_entregado = NOW()';
  }

  query += ' WHERE id = ?';
  params.push(id);

  await pool.query(query, params);
  res.json({ mensaje: 'Estado del pedido actualizado' });
};
