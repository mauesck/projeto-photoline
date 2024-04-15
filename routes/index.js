const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');

const User = require('../controller/usuario');

// rotas usuario
router.get('/user/read', authMiddleware, User.getUser);
router.post('/user/login', User.login);
router.post('/user/create', User.createUser);

// rotas item
/*router.get('/postagem/read', authMiddleware, Post.getAllItens);
//router.post('/item/create', Item.createItem);
router.post('/postagem/create', (req, res) => {
    console.log('ROUTES');
    console.log(req.body);

    // Verifica se o arquivo de imagem foi enviado na solicitação
    if (!req.files || !req.files.imagem) {
        return res.status(400).send('Nenhum arquivo de imagem enviado.');
    }

    // Extrai os dados do corpo da solicitação
    const { nome, descricao, usuario_id, categoria_id } = req.body;

    // Extrai o arquivo de imagem da solicitação
    const imagem = req.files.imagem;

    // Define o diretório de uploads
    const uploadDir = path.join(__dirname, '..', 'public', 'imgs', 'uploads');

    // Move o arquivo de imagem para o diretório de uploads
    imagem.mv(path.join(uploadDir, imagem.name), (err) => {
        if (err) {
            console.error('Erro ao mover o arquivo de imagem:', err);
            return res.status(500).send("Ocorreu um erro ao criar o item.");
        }

        // Chama a função 'createItem' passando todos os dados necessários
        Item.createItem(nome, imagem.name, descricao, usuario_id, categoria_id, (insertId) => {
            if (err) {
                console.error('Erro ao criar o item:', err);
                return res.status(500).send("Ocorreu um erro ao criar o item.");
            }
            // Se não houver erros, envia uma resposta de sucesso
            return res.redirect('/adm');
        });
    });
});*/

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
    const usuario = req.session.usuario;
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
    const usuario = req.session.usuario;
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
    const usuario = req.session.usuario;
    if (!usuario) {
        res.redirect('/');
        return;
    }

    try {
        const userDataPromise = User.getUser(req, res);
        const [userData] = await Promise.all([userDataPromise]);

        res.render('editarPerfil', { usuario: userData });

    } catch (error) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro ao renderizar a página');
    }
});

// --- renderizar pagina de Adm
router.get('/feed', async (req, res) => {
    // Verifica se há informações do usuário na sessão
    const usuario = req.session.usuario;
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
