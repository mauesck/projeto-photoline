const Postagem = require('../model/postagem');
const { post } = require('../routes');

var usuario_id;

// Create 
exports.createPostagem = (imagem, descricao, user_id, res) => {
    console.log('\n createPostagem');
    console.log(imagem, descricao, user_id);

    Postagem.createPostagem(imagem, descricao, user_id, (success) => {
        res.redirect('/perfil');

    });
};

// Read
exports.getPostUser = (req, res) => {
    return new Promise((resolve, reject) => {
        usuario_id = req.session.usuario.id;

        Postagem.getPostUser(usuario_id, (posts) => {
            resolve({ posts: posts });
        });
    });
};