const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');

// Rota GET para listar todos os produtos
router.get('/', ProdutoController.getAll.bind(ProdutoController));

// Rota GET para buscar um produto específico
router.get('/:id', ProdutoController.getById.bind(ProdutoController));

// Rota POST para criar um novo produto
router.post('/', ProdutoController.create.bind(ProdutoController));

// Rota PUT para atualizar um produto
router.put('/:id', ProdutoController.update.bind(ProdutoController));

// Rota DELETE para remover um produto
router.delete('/:id', ProdutoController.delete.bind(ProdutoController));

module.exports = router;