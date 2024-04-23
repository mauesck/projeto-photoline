const Curtida = require('../model/curtida');

var valida = '';
var userId = 0;

// create
exports.createCurtida = (req, res) => {
    const { user_id, post_id } = req.body;
    Curtida.createCurtida(user_id, post_id, (insertId) => {
        var redirect = '';
        if (valida === "perfilPublico") {
            redirect = '/perfilPublico?id=' + userId + '&valida=perfilPublico';
        } else {
            redirect = '/feed';
        }

        res.redirect(redirect);
    });
};

// read
exports.getAllCurtidas = (req, res) => {
    return new Promise((resolve, reject) => {
        valida = req.query.valida;
        userId = req.query.id;

        Curtida.getCurtidas((curtidas) => {
            resolve({ curtidas: curtidas });
        });
    });
};

// delete
exports.deleteCurtida = (req, res) => {
    const { id } = req.body;
    Curtida.deleteCurtida(id, (success) => {
        var redirect = '';
        if (valida === "perfilPublico") {
            redirect = '/perfilPublico?id=' + userId + '&valida=perfilPublico';
        } else {
            redirect = '/feed';
        }

        res.redirect(redirect);
    });
};