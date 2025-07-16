const pool = require('../db');
const { validationResult } = require('express-validator');
const validator = require('validator');

exports.obtenerMenu = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos');
  res.json(rows);
};

exports.agregarProducto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

  let { nombre, categoria, precio } = req.body;
  nombre = validator.escape(nombre);
  categoria = validator.escape(categoria);

  await pool.query(
    'INSERT INTO productos (nombre, categoria, precio) VALUES (?, ?, ?)',
    [nombre, categoria, precio]
  );
  res.status(201).json({ mensaje: 'Producto agregado' });
};
