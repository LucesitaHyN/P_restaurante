const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { validationResult } = require('express-validator');

exports.realizarPago = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

  const { pedidoId, productos } = req.body;

  try {
    const line_items = productos.map(p => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: p.nombre
        },
        unit_amount: Math.round(p.precio * 100),
      },
      quantity: p.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:4300/seguimiento?success=true',
      cancel_url: 'http://localhost:4300/pagos?canceled=true',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ exito: false, mensaje: 'Error en Stripe' });
  }
};
