const jwt = require('jsonwebtoken');
const pool = require('../db');
const { validationResult } = require('express-validator');

exports.obtenerPedidos = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = jwt.verify(token, 'secreto');

    const [rows] = await pool.query(
      'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC',
      [payload.id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

exports.crearPedido = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

  try {
    const payload = jwt.verify(token, 'secreto');
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const { productos, total } = req.body;

    const [result] = await pool.query(
      'INSERT INTO pedidos (usuario_id, total, estado, fecha) VALUES (?, ?, "pendiente", NOW())',
      [payload.id, total]
    );

    const pedidoId = result.insertId;

    for (const p of productos) {
      await pool.query(
        'INSERT INTO pedido_productos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
        [pedidoId, p.id, p.cantidad]
      );
    }

    res.status(201).json({ mensaje: 'Pedido creado', pedidoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el pedido' });
  }
};

exports.actualizarEstado = async (req, res) => {
  const { estado } = req.body;
  const id = parseInt(req.params.id);
  if (!['pendiente', 'entregado'].includes(estado)) {
    return res.status(400).json({ mensaje: 'Estado no válido' });
  }

  try {
    await pool.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, id]);
    res.json({ mensaje: 'Estado del pedido actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido' });
  }
};
