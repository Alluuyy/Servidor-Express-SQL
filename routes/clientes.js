const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// GET todos os clientes
router.get('/', clientesController.getAll);

// POST - criar cliente
router.post('/', clientesController.create);

// PUT - atualizar cliente
router.put('/:id', clientesController.update);

// DELETE - deletar cliente
router.delete('/:id', clientesController.remove);

module.exports = router;
