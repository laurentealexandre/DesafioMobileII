const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/auth');

// Usa o middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rota GET para listar todos os clientes
router.get('/', ClienteController.getAll.bind(ClienteController));

// Rota GET para buscar um cliente específico
router.get('/:id', ClienteController.getById.bind(ClienteController));

// Rota POST para criar um novo cliente
router.post('/', ClienteController.create.bind(ClienteController));

// Rota PUT para atualizar um cliente
router.put('/:id', ClienteController.update.bind(ClienteController));

// Rota DELETE para remover um cliente
router.delete('/:id', ClienteController.delete.bind(ClienteController));

module.exports = router;