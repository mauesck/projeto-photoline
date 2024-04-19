const db = require('../config/db');

// Create
exports.createPostagem = (imagem, descricao, user_id, callback) => {
    db.query('INSERT INTO postagem (imagem, descricao, user_id) VALUES (?,?,?)', [imagem, descricao, user_id], (err, result) => {
        if (err) throw err;
        callback(result.insertId);
    });
};

// Read
exports.getPostUser = (user_id, callback) => {
    db.query('SELECT * FROM postagem WHERE user_id = ?', [user_id], (err, rows) => {
        if (err) throw err;
        callback(rows);
    });
};