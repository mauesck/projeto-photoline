const db = require('../config/db');

// Create
exports.createUser = (nome, email, senha, callback) => {
    db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, result) => {
        if (err) throw err;
        callback(result.insertId);
    });
};

// Read
exports.getUser = (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        // Como queremos apenas um usuário, vamos retornar o primeiro elemento do array de resultados, se houver, ou null se não houver nenhum resultado
        callback(rows.length > 0 ? rows[0] : null);
    });
};

exports.getLogin = (email, senha, callback) => {
    db.query('SELECT * FROM users WHERE email = ? AND senha = ?', [email, senha], (err, rows) => {
        if (err) throw err;
        // Retorna o primeiro usuário encontrado ou null se nenhum usuário for encontrado
        callback(rows.length > 0 ? rows[0] : null);
    });
};


// Update
exports.updateUser = (id, nome, email, senha, foto, descricao, callback) => {
    db.query('UPDATE users SET nome = ?, email = ?, senha = ?, foto = ?, descricao = ? WHERE id = ?', [nome, email, senha, foto, descricao, id], (err, result) => {
        if (err) throw err;
        callback(result.affectedRows > 0);
    });
};

// Delete
exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        callback(result.affectedRows > 0);
    });
};

