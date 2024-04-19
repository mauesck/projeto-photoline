const Users = require('../model/usuario');

var usuario_id;

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
        usuario_id = req.session.usuario.id;

        Users.getUser(usuario_id, (usuario) => {

            // Define a foto ou avatar.png
            var foto;
            var opacity;
            if (usuario.foto) {
                foto = 'imgs/uploads/' + usuario.foto;
                opacity = 'opacity: 0;';
            } else {
                foto = 'imgs/avatar.png';
                opacity = 'opacity: 1;';
            }

            // Passando os dados ao parametro 'usuario'
            resolve({ usuario: usuario, foto: foto, opacity: opacity });
        });
    });
};

exports.getUserPesquisado = (req, res) => {
    return new Promise((resolve, reject) => {
        usuario_id = req.query.id;
        console.log(req.query)

        Users.getUser(usuario_id, (usuario) => {
            var foto;
            if (usuario.foto) {
                foto = 'imgs/uploads/' + usuario.foto;
            } else {
                foto = 'imgs/avatar.png';
            }

            resolve({ usuario: usuario, foto: foto });
        });
    });
};

exports.getAllUsers = (req, res) => {
    return new Promise((resolve, reject) => {
        usuario_id = req.session.usuario.id;
        Users.getAllUsers(usuario_id, (allUsers) => {
            resolve({ allUsers: allUsers });
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
exports.updateUser = (id, nome, email, senha, foto, descricao, res) => {
    console.log('\n updateUser:');
    console.log(id, nome, email, senha, foto, descricao);

    Users.updateUser(id, nome, email, senha, foto, descricao, (success) => {
        res.redirect('/editarPerfil');
    });
};

// Delete
exports.deleteUser = (req, res) => {
    const { id } = req.body;
    Users.deleteUser(id, (success) => {
        res.redirect('/');
    });
};
