const Users = require('../model/usuario');

// Create
exports.createUser = (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(req.body);
    Users.createUser(nome, email, senha, (insertId) => {
        res.redirect('/');
    });
};

// Read
exports.getUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const usuario_id = req.session.usuario.id;

        Users.getUser(usuario_id, (usuario) => {
            //console.log(usuario);
            resolve(usuario);
        });
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;
    Users.getLogin(email, senha, usuario => {
        if (usuario) {
            // Armazena informações do usuário na sessão
            req.session.usuario = usuario;
            // Redireciona para a rota /adm
            res.redirect('/feed');
        } else {
            // Falha na autenticação, redireciona de volta para a página de login com uma mensagem de erro
            res.redirect('/?error=Credenciais inválidas');
        }
    });
};

// Update
exports.updateUser = (req, res) => {
    const { id, nome, email, senha } = req.body;
    Users.updateUser(id, nome, email, senha, (success) => {
        res.redirect('/perfil');
    });
};

// Delete
exports.deleteUser = (req, res) => {
    const { id } = req.body;
    Users.deleteUser(id, (success) => {
        res.redirect('/');
    });
};
