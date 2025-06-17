exports.simularPago = (req, res) => {
  const { total, metodo } = req.body;
  if (metodo) {
    res.json({ exito: true, mensaje: `Pago de $${total} recibido por ${metodo}` });
  } else {
    res.status(400).json({ exito: false, mensaje: 'Método de pago no especificado' });
  }
};
