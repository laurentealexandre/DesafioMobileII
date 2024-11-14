const connection = require('../configs/database');

class ClienteService {
    async getAll() {
        try {
            const [rows] = await connection.query('SELECT * FROM clientes');
            return rows;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [rows] = await connection.query(
                'SELECT * FROM clientes WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar cliente por ID:', error);
            throw error;
        }
    }

    async create(cliente) {
        try {
            const { nome, sobrenome, email, idade } = cliente;
            const [result] = await connection.query(
                'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
                [nome, sobrenome, email, idade]
            );

            return result.insertId;
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw error;
        }
    }

    async update(id, cliente) {
        try {
            const { nome, sobrenome, email, idade } = cliente;
            const [result] = await connection.query(
                'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
                [nome, sobrenome, email, idade, id]
            );

            if (result.affectedRows === 0) {
                return null;
            }

            return { id, ...cliente };
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query(
                'DELETE FROM clientes WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            throw error;
        }
    }
}

module.exports = new ClienteService();