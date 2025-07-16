exports.register = async (req, res) => {
  const { email, password, nombre } = req.body;

  const nuevoUsuario = new Usuario({
    email,
    password,
    nombre,
    rol: 'cliente'  
  });

  await nuevoUsuario.save();

  res.status(201).json({ mensaje: 'Usuario creado' });
};
