const clientesService = require('../services/clientesService');

exports.getAll = async (req, res) => {
    try {
        const clientes = await clientesService.getAll();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
};

exports.create = async (req, res) => {
    try {
        const cliente = req.body;

        if (!cliente.nome || !cliente.email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }

        const result = await clientesService.create(cliente);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const dados = req.body;

        const result = await clientesService.update(id, dados);
        res.json(result);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        await clientesService.remove(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};

