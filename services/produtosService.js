const db = require('../configs/db');
const cache = require('../utils/cache');
const CACHE_KEY = 'produtos:getAll';

exports.getAll = async () => {
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
        console.log('Cache HIT - produtos');
        return cached;
    }

    console.log('Cache MISS - produtos');
    const [rows] = await db.query('SELECT * FROM produtos');
    await cache.set(CACHE_KEY, rows, 30);
    return rows;
};

exports.create = async (produto) => {
    const { nome, descricao, preco } = produto;
    const dataAtualizado = new Date();
    const [result] = await db.query(
        'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, dataAtualizado]
    );
    await cache.del(CACHE_KEY);
    return { id: result.insertId, ...produto, data_atualizado: dataAtualizado };
};

exports.update = async (id, produto) => {
    const { nome, descricao, preco } = produto;
    const dataAtualizado = new Date();
    await db.query(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
        [nome, descricao, preco, dataAtualizado, id]
    );
    await cache.del(CACHE_KEY);
    return { id, nome, descricao, preco, data_atualizado: dataAtualizado };
};

exports.remove = async (id) => {
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    await cache.del(CACHE_KEY);
};
