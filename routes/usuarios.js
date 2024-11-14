const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/auth');

// Rota GET para listar todos os usuários
router.get('/', authMiddleware, UsuarioController.getAll.bind(UsuarioController));

// Rota GET para buscar um usuário específico
router.get('/:id', authMiddleware, UsuarioController.getById.bind(UsuarioController));

// Rota POST para criar um novo usuário
router.post('/', UsuarioController.create.bind(UsuarioController));

// Rota para login
router.post('/login', UsuarioController.login.bind(UsuarioController));

// Rota para logout (requer autenticação)
router.post('/logout', authMiddleware, UsuarioController.logout.bind(UsuarioController));

// Rota PUT para atualizar um usuário
router.put('/:id', authMiddleware, UsuarioController.update.bind(UsuarioController));

// Rota DELETE para remover um usuário
router.delete('/:id', authMiddleware, UsuarioController.delete.bind(UsuarioController));

module.exports = router;