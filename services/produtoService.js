const connection = require('../configs/database');

class ProdutoService {
  async getAll() {
    try {
      const [rows] = await connection.query('SELECT * FROM produtos');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      throw error;
    }
  }

  async create(produto) {
    try {
      const { nome, descricao, preco, data_atualizado } = produto;
      const [result] = await connection.query(
        'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, data_atualizado || new Date()]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  async update(id, produto) {
    try {
      const { nome, descricao, preco } = produto;
      const data_atualizado = new Date();
      
      const [result] = await connection.query(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
        [nome, descricao, preco, data_atualizado, id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return { id, ...produto, data_atualizado };
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const [result] = await connection.query('DELETE FROM produtos WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }
}

module.exports = new ProdutoService();