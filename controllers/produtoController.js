const ProdutoService = require('../services/produtoService');

class ProdutoController {
  async getAll(req, res) {
    try {
      const produtos = await ProdutoService.getAll();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const produto = await ProdutoService.getById(req.params.id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(produto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nome, descricao, preco } = req.body;
      
      // Validação básica
      if (!nome || !descricao || !preco) {
        return res.status(400).json({ 
          message: 'Nome, descrição e preço são obrigatórios' 
        });
      }

      const id = await ProdutoService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco } = req.body;

      // Validação básica
      if (!nome || !descricao || !preco) {
        return res.status(400).json({ 
          message: 'Nome, descrição e preço são obrigatórios' 
        });
      }

      const produtoAtualizado = await ProdutoService.update(id, req.body);
      if (!produtoAtualizado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletado = await ProdutoService.delete(id);
      
      if (!deletado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProdutoController();