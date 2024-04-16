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
            
            // Define a foto ou avatar.png
            var foto = '';
            if (usuario.foto) {
                foto = 'imgs/uploads/' + usuario.foto;
            } else {
                foto = 'imgs/avatar.png';
            }

            // Passando os dados ao parametro 'usuario'
            resolve({ usuario: usuario, foto: foto });
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
    
    
    console.log('Up User');
    console.log(id, nome, email, senha, foto, descricao,);

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
