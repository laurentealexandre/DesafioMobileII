const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API!' });
});

// Importação das rotas
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');
const usuariosRouter = require('./routes/usuarios');

// Uso das rotas
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRouter);

// Tratamento de erro 404
app.use((req, res, next) => {
  next(createError(404));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;