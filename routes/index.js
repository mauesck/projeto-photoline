const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');
const { json } = require('body-parser');

// Objetos do controller
const User = require('../controller/usuario');
const Postagem = require('../controller/postagem');
const Curtida = require('../controller/curtida');

// Recebe o id do user logado
var usuario;

// rotas usuario
router.get('/user/read', authMiddleware, User.getUser);
//router.get('/user/allRead', User.getAllUsers);
// router.get('/user/allRead', async (req, res) => {
//     try {
//         const allUsers = await User.getAllUsers(req, res);
//         res.json(allUsers);
//     } catch (error) {
//         res.status(500).json({ error: 'Erro ao buscar usuários.' });
//     }
// });
router.post('/user/delete', User.deleteUser);
router.post('/user/login', User.login);
router.post('/user/create', User.createUser);
router.post('/user/update', (req, res) => {

    console.log('\n/user/update\n');

    // Verifica se o arquivo de imagem foi enviado na solicitação
    if (!req.files || !req.files.foto) {
        if (req.body.foto === undefined) {
            return res.redirect('/editarPerfil?error=Nenhuma foto a ser salva');
        }
    }

    // Extrai os dados do corpo da solicitação
    const { id, nome, email, senha, foto, descricao } = req.body;
    console.log(req.body.foto)

    if (req.body.foto === undefined) {

        console.log('entrou');

        // Extrai o arquivo de imagem da solicitação
        const foto = req.files.foto;
        const extensao = foto.name.split('.').pop();
        const fotoName = 'id' + usuario.id + '-user' + usuario.nome + '-fotoperfil.' + extensao;

        // Define o diretório de uploads
        const uploadDir = path.join(__dirname, '..', 'public', 'imgs', 'uploads');

        // Move o arquivo de imagem para o diretório de uploads
        foto.mv(path.join(uploadDir, fotoName), (err) => {
            User.updateUser(id, nome, email, senha, fotoName, descricao, res, (success) => {
                return res.redirect('/editarPerfil');
            });
        });
    } else {
        console.log(2)
        User.updateUser(id, nome, email, senha, foto, descricao, res, (success) => {
            return res.redirect('/editarPerfil');
        });
    }
});

// rotas postagem
router.post('/postagem/create', (req, res) => {
    console.log('\n /postagem/create \n');

    if (!req.files || !req.files.imagem) {
        return res.redirect('/postagem?error=Você precisa enviar uma foto!');
    }

    const { descricao, user_id } = req.body;

    const imagem = req.files.imagem;
    const extensao = imagem.name.split('.').pop();
    const imagemName = 'iduser' + usuario.id + '-name' + usuario.nome + '-postagem' + req.body.descricao + '.' + extensao;

    const uploadDir = path.join(__dirname, '..', 'public', 'imgs', 'uploads', 'posts');

    imagem.mv(path.join(uploadDir, imagemName), (err) => {
        Postagem.createPostagem(imagemName, descricao, user_id, res, (success) => {
            return res.redirect('/perfil');
        });
    });
});
router.post('/postagem/update', Postagem.postagemUpdate);
router.post('/postagem/delete', Postagem.deletePostagem);

// rotas curtida
router.post('/curtida/create', Curtida.createUser);

// --- rota efetuar Logout
router.get('/logout', (req, res) => {
    // Destruir a sessão do usuário
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar sessão:', err);
            res.sendStatus(500);
        } else {
            // Redirecionar para a página de login ou para onde desejar
            res.redirect('/');
        }
    });
});

// --- renderizar pagina de Login
router.get('/', (req, res) => {
    // Verifica se há um erro na query string
    const error = req.query.error;

    // Renderiza a página de login com a mensagem de erro, se houver
    res.render('login', { error: error });
});

// --- renderizar pagina de Cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// --- renderizar pagina de publicação
router.get('/postagem', async (req, res) => {
    usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    const error = req.query.error;

    try {
        const userDataPromise = User.getUser(req, res);

        const [userData] = await Promise.all([userDataPromise]);

        res.render('postar', { usuario: userData, error: error });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

// --- renderizar pagina de pesquisa
router.get('/pesquisa', async (req, res) => {
    usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    try {
        const userDataPromise = User.getUser(req, res);
        const usersPromise = User.getAllUsers(req, res);

        const [userData, allUsers] = await Promise.all([userDataPromise, usersPromise]);

        res.render('pesquisa', { usuario: userData, allUsers: allUsers });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

// --- renderizar perfil publico ao pesquisar user
router.get('/perfilPublico', async (req, res) => {
    usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    try {
        const usersPromise = User.getUserPesquisado(req, res);
        const postPromise = Postagem.getPostUser(req, res);

        const [user] = await Promise.all([usersPromise]);
        const [post] = await Promise.all([postPromise]);

        res.render('perfilPublico', { user: user, post: post, usuario: usuario });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

// --- renderizar pagina de editar perfil
router.get('/perfil', async (req, res) => {
    usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    try {
        const userDataPromise = User.getUser(req, res);
        const postPromise = Postagem.getPostUser(req, res);

        const [userData] = await Promise.all([userDataPromise]);
        const [post] = await Promise.all([postPromise]);

        console.log(post);

        res.render('perfil', { usuario: userData, post: post });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

// --- renderizar pagina de editar perfil
router.get('/editarPerfil', async (req, res) => {
    usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    const error = req.query.error;

    try {
        const userDataPromise = User.getUser(req, res);
        const [userData] = await Promise.all([userDataPromise]);

        res.render('editarPerfil', { usuario: userData, error: error });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

// --- renderizar pagina de Adm
router.get('/feed', async (req, res) => {
    // Verifica se há informações do usuário na sessão
    usuario = req.session.usuario;
    if (!usuario) {
        // Se não houver informações do usuário na sessão, redireciona de volta para a página de login
        res.redirect('/');
        return;
    }

    try {
        // Executa as duas operações em paralelo
        const postsPromise = Postagem.getAllPosts(req, res);
        const usersPromise = User.getAllUsers(req, res);

        const [posts] = await Promise.all([postsPromise]);
        const [users] = await Promise.all([usersPromise]);

        res.render('feed', { users: users, posts: posts, usuario: usuario });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

module.exports = router;
