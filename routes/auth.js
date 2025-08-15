// Importa o módulo 'express' e o 'Router' para criar as rotas
const express = require('express');
const router = express.Router();

// Importa o modelo de usuário que criamos
const User = require('../models/user');

// Importa o 'jsonwebtoken' para criar os tokens
const jwt = require('jsonwebtoken');

// Importa o 'bcryptjs' para comparar as senhas na hora do login
const bcrypt = require('bcryptjs');

// Importa o middleware de autenticação
const auth = require('../middleware/authmid');

// Rota de Registro - POST /api/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Verifica se o usuário já existe no banco de dados
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // 2. Cria uma nova instância do usuário
    user = new User({
      name,
      email,
      password,
    });

    // 3. Salva o usuário no banco de dados. O middleware 'pre-save' vai criptografar a senha.
    await user.save();

    // 4. Cria o JWT para o usuário recém-criado
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // A chave secreta (vamos definir no .env)
      { expiresIn: '1h' }, // O token expira em 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Rota de Login - POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verifica se o usuário existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // 2. Compara a senha digitada com a senha criptografada no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // 3. Cria e retorna o JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Rota protegida - GET /api/auth
router.get('/me', auth, async (req, res) => {
  try {
    // Encontra o usuário no banco de dados, excluindo a senha
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

module.exports = router;