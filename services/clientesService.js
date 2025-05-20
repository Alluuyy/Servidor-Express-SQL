const db = require('../configs/db');
const cache = require('../utils/cache');
const CACHE_KEY = 'clientes:getAll';

exports.getAll = async () => {
    const cached = await cache.get(CACHE_KEY);
    if (cached) {
        console.log('Cache HIT');
        return cached;
    }

    console.log('Cache MISS');
    const [rows] = await db.query('SELECT * FROM clientes');
    await cache.set(CACHE_KEY, rows, 30); // 30s de cache
    return rows;
};

exports.create = async (cliente) => {
    const { nome, sobrenome, email, idade } = cliente;
    const [result] = await db.query(
        'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, email, idade]
    );
    await cache.del(CACHE_KEY);
    return { id: result.insertId, ...cliente };
};

exports.update = async (id, cliente) => {
    const { nome, sobrenome, email, idade } = cliente;
    await db.query(
        'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
        [nome, sobrenome, email, idade, id]
    );
    await cache.del(CACHE_KEY);
    return { id, ...cliente };
};

exports.remove = async (id) => {
    await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    await cache.del(CACHE_KEY);
};
