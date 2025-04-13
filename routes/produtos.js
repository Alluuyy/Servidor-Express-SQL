const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// GET todos os produtos
router.get('/', produtosController.getAll);

// POST - criar produto
router.post('/', produtosController.create);

// PUT - atualizar produto
router.put('/:id', produtosController.update);

// DELETE - deletar produto
router.delete('/:id', produtosController.remove);

module.exports = router;
