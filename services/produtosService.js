const db = require('../configs/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM produtos');
    return rows;
};

exports.create = async (produto) => {
    const { nome, descricao, preco } = produto;
    const dataAtualizado = new Date();
    const [result] = await db.query(
        'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, dataAtualizado]
    );
    return { id: result.insertId, ...produto, data_atualizado: dataAtualizado };
};

exports.update = async (id, produto) => {
    const { nome, descricao, preco } = produto;
    const dataAtualizado = new Date();
    await db.query(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
        [nome, descricao, preco, dataAtualizado, id]
    );
    return {
        id: id,  
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        data_atualizado: dataAtualizado  
    };
};

exports.remove = async (id) => {
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
};
