const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const helmet = require('helmet');
app.use(helmet()); 

app.use('/api/menu', require('./routes/menu.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/pagos', require('./routes/pagos.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/auth', require('./routes/auth.routes'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));