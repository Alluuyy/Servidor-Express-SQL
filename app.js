const express = require('express');
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json());

// Rotas
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');

app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

app.get('/', (req, res) => {
    res.send('API rodando!');
});

// Servidor
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

});

module.exports = app;

