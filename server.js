// Importa o módulo 'express' para criar o servidor
const express = require('express');

// Importa o módulo 'dotenv' para carregar as variáveis de ambiente do arquivo .env
require('dotenv').config();

const connectDB = require('./config/db'); // Importa a função de conexão

// Cria uma instância do aplicativo Express
const app = express();

// Conecta ao banco de dados
connectDB();

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Middleware para analisar as requisições com corpo JSON
// Isso permite que o servidor receba dados JSON nas requisições POST e PUT
app.use(express.json());

// Importa e usa as rotas de autenticação
app.use('/api', require('./routes/auth'));

// Rota de teste
// Quando você acessar a rota principal ('/'), ele responderá com "API rodando..."
app.get('/', (req, res) => {
  res.send('API rodando...');
});

// Inicia o servidor e o faz "escutar" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});