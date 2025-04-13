const produtosService = require('../services/produtosService');

exports.getAll = async (req, res) => {
    const produtos = await produtosService.getAll();
    res.json(produtos);
};

exports.create = async (req, res) => {
    const produto = req.body;
    const result = await produtosService.create(produto);
    res.status(201).json(result);
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    const result = await produtosService.update(id, dados);
    res.json(result);
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    await produtosService.remove(id);
    res.status(204).send();
};
