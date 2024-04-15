// Middleware de autenticação
module.exports = (req, res, next) => {
    // Verifica se há informações do usuário na sessão
    const usuario = req.session.usuario;
    console.log(usuario)
    if (!usuario) {
        // Se não houver informações do usuário na sessão, redireciona de volta para a página de login
        res.redirect('/');
        return;
    }
    // Se houver informações do usuário na sessão, define o ID do usuário na requisição
    req.usuario_id = usuario.id;
    next();
};