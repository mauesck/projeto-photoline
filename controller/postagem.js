const Postagem = require('../model/postagem');

var usuario_id;

// Create 
exports.createPostagem = (imagem, descricao, user_id, res) => {
    console.log('\n createPostagem');
    console.log(imagem, descricao, user_id);

    Postagem.createPostagem(imagem, descricao, user_id, (success) => {
        res.redirect('/feed');

    });
};

// Read
exports.getPostUser = (req, res) => {
    return new Promise((resolve, reject) => {

        if (req.query.valida === 'perfilPublico') {
            usuario_id = req.query.id;
        } else {
            usuario_id = req.session.usuario.id;
        }

        Postagem.getPostUser(usuario_id, (posts) => {
            resolve({ posts: posts });
        });
    });
};

exports.getAllPosts = (req, res) => {
    return new Promise((resolve, reject) => {
        Postagem.getAllPosts((posts) => {
            
            resolve({ posts: posts });
        });
    });
};

// Update
exports.postagemUpdate = (req, res) => {
    const { id, imagem, descricao, user_id } = req.body;

    Postagem.postagemUpdate(id, imagem, descricao, user_id, (success) => {
        res.redirect('/perfil');
    });
};

// Delete
exports.deletePostagem = (req, res) => {
    const { id } = req.body;
    Postagem.deletePostagem(id, (success) => {
        res.redirect('/perfil');
    });
};
