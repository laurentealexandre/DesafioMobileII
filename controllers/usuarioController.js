const UsuarioService = require('../services/usuarioService');

class UsuarioController {
    async getAll(req, res) {
        try {
            const usuarios = await UsuarioService.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const usuario = await UsuarioService.getById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { usuario, senha } = req.body;

            // Validação básica
            if (!usuario || !senha) {
                return res.status(400).json({
                    message: 'Usuário e senha são obrigatórios'
                });
            }

            // Validação do tamanho da senha
            if (senha.length < 6) {
                return res.status(400).json({
                    message: 'A senha deve ter no mínimo 6 caracteres'
                });
            }

            const id = await UsuarioService.create(req.body);
            res.status(201).json({ id });
        } catch (error) {
            if (error.message.includes('duplicate')) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { usuario, senha } = req.body;

            if (!usuario || !senha) {
                return res.status(400).json({
                    message: 'Usuário e senha são obrigatórios'
                });
            }

            const result = await UsuarioService.login(usuario, senha);
            res.json(result);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async logout(req, res) {
        try {
            await UsuarioService.logout(req.user.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { usuario, senha } = req.body;

            // Validação básica
            if (!usuario) {
                return res.status(400).json({
                    message: 'Usuário é obrigatório'
                });
            }

            // Se forneceu senha, valida o tamanho
            if (senha && senha.length < 6) {
                return res.status(400).json({
                    message: 'A senha deve ter no mínimo 6 caracteres'
                });
            }

            const usuarioAtualizado = await UsuarioService.update(id, req.body);
            if (!usuarioAtualizado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // Remove a senha do retorno
            delete usuarioAtualizado.senha;
            res.json(usuarioAtualizado);
        } catch (error) {
            if (error.message.includes('duplicate')) {
                return res.status(400).json({ message: 'Nome de usuário já existe' });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletado = await UsuarioService.delete(id);

            if (!deletado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UsuarioController();