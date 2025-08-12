const bcrypt = require('bcrypt');
const pool = require('./db');

async function crearAdmin() {
  const email = 'admin@restaurante.com';
  const password = 'Admin123';
  const nombre = 'Administrador';

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Verificar si ya existe
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      console.log(`✅ El usuario administrador ya existe con id: ${rows[0].id}`);
      process.exit(0);
    }

    // Crear admin
    const [result] = await pool.query(
      'INSERT INTO usuarios (email, password, nombre, rol) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, nombre, 'admin']
    );

    console.log('✅ Usuario administrador creado con id:', result.insertId);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al crear admin:', err);
    process.exit(1);
  }
}

crearAdmin();
