const produtosService = require('../services/produtosService');
const cache = require('../utils/cache'); 

exports.getAll = async (req, res) => {
    try {
        const cached = await cache.get('produtos');

        if (cached) {
            console.log('[CACHE HIT]');
            return res.json(cached);
        }

        console.log('[CACHE MISS]');
        const produtos = await produtosService.getAll();

        await cache.set('produtos', produtos, 30); // cache por 30 segundos

        res.json(produtos);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
};

exports.create = async (req, res) => {
    try {
        const novoProduto = await produtosService.create(req.body);

        // Invalida o cache, pois um novo produto foi adicionado
        await cache.del('produtos');

        res.status(201).json(novoProduto);
    } catch (err) {
        console.error('Erro ao criar produto:', err);
        res.status(500).json({ erro: 'Erro ao criar produto' });
    }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;

    const produtoAtualizado = await produtosService.update(id, dadosAtualizados);

    // Invalida o cache, já que dados mudaram
    await cache.del('produtos');

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json(produtoAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removido = await produtosService.remove(id);

    // Invalida o cache
    await cache.del('produtos');

    if (!removido) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    console.error('Erro ao remover produto:', err);
    res.status(500).json({ erro: 'Erro ao remover produto' });
  }
};

