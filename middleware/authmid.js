// Importa o 'jsonwebtoken'
const jwt = require('jsonwebtoken');

// Exporta o middleware como uma função
module.exports = function (req, res, next) {
  // 1. Obtém o token do cabeçalho da requisição
  // O token geralmente vem no formato 'Bearer SEU_TOKEN_AQUI'
  const token = req.header('x-auth-token');

  // 2. Verifica se o token existe
  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }

  // 3. Verifica o token
  try {
    // Usa a chave secreta para decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adiciona o usuário decodificado (com o ID) ao objeto de requisição
    req.user = decoded.user;
    // Chama o próximo middleware/rota
    next();
  } catch (err) {
    // Se o token for inválido, retorna um erro de autorização
    res.status(401).json({ msg: 'Token inválido' });
  }
};