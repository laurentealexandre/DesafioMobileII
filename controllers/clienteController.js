const ClienteService = require('../services/clienteService');

class ClienteController {
  async getAll(req, res) {
    try {
      const clientes = await ClienteService.getAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const cliente = await ClienteService.getById(req.params.id);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nome, sobrenome, email, idade } = req.body;
      
      // Validação básica
      if (!nome || !sobrenome || !email || !idade) {
        return res.status(400).json({ 
          message: 'Nome, sobrenome, email e idade são obrigatórios' 
        });
      }

      const id = await ClienteService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, sobrenome, email, idade } = req.body;

      // Validação básica
      if (!nome || !sobrenome || !email || !idade) {
        return res.status(400).json({ 
          message: 'Nome, sobrenome, email e idade são obrigatórios' 
        });
      }

      const clienteAtualizado = await ClienteService.update(id, req.body);
      if (!clienteAtualizado) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      res.json(clienteAtualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletado = await ClienteService.delete(id);
      
      if (!deletado) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ClienteController();