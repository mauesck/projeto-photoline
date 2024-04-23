const db = require('../config/db');

// create
exports.createCurtida = (user_id, post_id, callback) => {
    db.query('INSERT INTO curtidas (user_id, post_id) VALUES (?, ?)', [user_id, post_id], (err, result) => {
        if (err) throw err;
        callback(result.insertId);
    });
};

// read
exports.getCurtidas = (callback) => {
    db.query('SELECT * FROM curtidas', (err, rows) => {
        if (err) throw err;
        callback(rows);
    });
};

// delete
exports.deleteCurtida = (id, callback) => {
    db.query('DELETE FROM curtidas WHERE id = ?', [id], (err, result) => {
        if(err) throw err;
        callback(result.affectedRows > 0);
    });
};