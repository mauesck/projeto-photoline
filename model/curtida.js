const db = require('../config/db');

// create
exports.createCurtida = (user_id, post_id, callback) => {
    db.query('INSERT INTO curtidas (user_id, post_id) VALUES (?, ?)', [user_id, post_id], (err, result) => {
        if (err) throw err;
        callback(result.insertId);
    });
};