const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');

// Objetos do controller
const User = require('../controller/usuario');

// Recebe o id do user logado
var usuario;

// rotas usuario
router.get('/user/read', authMiddleware, User.getUser);
router.post('/user/login', User.login);
router.post('/user/create', User.createUser);
router.post('/user/update', (req, res) => {

    console.log('\n/user/update\n');

    // Verifica se o arquivo de imagem foi enviado na solicitação
    if (!req.files || !req.files.foto) {
        if (req.body.foto === undefined) {
            console.log('aqui');
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
        const fotoName = 'iduser' + usuario.id + '-fotoperfil.' + extensao;

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
router.get('/postagem', (req, res) => {
    res.render('postar');
});

// --- renderizar pagina de editar pesquisa
router.get('/pesquisa', async (req, res) => {
    usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    try {
        const userDataPromise = User.getUser(req, res);
        const [userData] = await Promise.all([userDataPromise]);

        res.render('pesquisa', { usuario: userData });

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
        const [userData] = await Promise.all([userDataPromise]);

        res.render('perfil', { usuario: userData });

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
        const userDataPromise = User.getUser(req, res);
        /*const categoriasPromise = Categoria.getAllCategoria(req, res);
        const itensPromise = Item.getAllItens(req, res);*/

        // Espera que ambas as operações sejam concluídas
        //const [userData, categorias, itens] = await Promise.all([userDataPromise, categoriasPromise, itensPromise]);
        const [userData] = await Promise.all([userDataPromise]);

        // Renderiza a página de administração com os dados obtidos
        //res.render('feed', { usuario: userData, categorias: categorias, itens: itens });
        res.render('feed', { usuario: userData });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});



module.exports = router;
