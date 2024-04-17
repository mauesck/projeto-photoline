const mysql = require('mysql');

// Criação de uma conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',       // Host do banco de dados
  user: 'root',     // Nome de usuário do banco de dados
  password: 'root',   // Senha do banco de dados
  database: 'photoline',  // Nome do banco de dados
  charset: 'utf8mb4' // Especifique a codificação UTF-8
});

// Conecta-se ao banco de dados
db.connect((err) => {
  if (err) {
    // Se houver um erro ao conectar, exibe o erro no console
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso no console
  console.log('Conexão com o banco de dados estabelecida');
});

module.exports = db;
