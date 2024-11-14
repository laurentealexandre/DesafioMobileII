const connection = require('../configs/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UsuarioService {
    async getAll() {
        try {
            const [rows] = await connection.query('SELECT id, usuario FROM usuarios');
            return rows;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [rows] = await connection.query(
                'SELECT id, usuario FROM usuarios WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    async create(usuario) {
        try {
            // Hash da senha antes de salvar
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(usuario.senha, salt);

            const [result] = await connection.query(
                'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
                [usuario.usuario, senhaHash]
            );
            
            return result.insertId;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    async login(usuario, senha) {
        try {
            const [rows] = await connection.query(
                'SELECT * FROM usuarios WHERE usuario = ?',
                [usuario]
            );

            const user = rows[0];
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                throw new Error('Senha inválida');
            }

            const token = jwt.sign(
                { id: user.id, usuario: user.usuario },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Atualiza o token no banco
            await connection.query(
                'UPDATE usuarios SET token = ? WHERE id = ?',
                [token, user.id]
            );

            return { token };
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    async logout(userId) {
        try {
            await connection.query(
                'UPDATE usuarios SET token = NULL WHERE id = ?',
                [userId]
            );
            return true;
        } catch (error) {
            console.error('Erro no logout:', error);
            throw error;
        }
    }

    async update(id, dados) {
        try {
            if (dados.senha) {
                const salt = await bcrypt.genSalt(10);
                dados.senha = await bcrypt.hash(dados.senha, salt);
            }

            const [result] = await connection.query(
                'UPDATE usuarios SET ? WHERE id = ?',
                [dados, id]
            );

            if (result.affectedRows === 0) {
                return null;
            }

            return { id, ...dados };
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query(
                'DELETE FROM usuarios WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    async verificarToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const [rows] = await connection.query(
                'SELECT * FROM usuarios WHERE id = ? AND token = ?',
                [decoded.id, token]
            );

            if (!rows[0]) {
                throw new Error('Token inválido ou expirado');
            }

            return decoded;
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            throw error;
        }
    }
}

module.exports = new UsuarioService();