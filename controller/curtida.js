const Curtida = require('../model/curtida');

// create
exports.createUser = (req, res) => {
    const { user_id, post_id } = req.body;
    console.log(req.body);
    Curtida.createCurtida(user_id, post_id, (insertId) => {
        res.redirect('/feed');
    });
};