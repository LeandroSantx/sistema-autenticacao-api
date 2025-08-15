// Importa o mongoose
const mongoose = require('mongoose');

// Importa o bcryptjs para criptografar a senha
const bcrypt = require('bcryptjs');

// Cria um Schema para o usuário
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Garante que não existam dois usuários com o mesmo email
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adiciona automaticamente campos 'createdAt' e 'updatedAt'
  }
);

// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
  // Se a senha não foi modificada, passa para o próximo middleware
  if (!this.isModified('password')) {
    next();
  }

  // Gera um "salt" (uma string aleatória)
  const salt = await bcrypt.genSalt(10);
  // Criptografa a senha usando o salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Cria o modelo 'User' a partir do Schema
const User = mongoose.model('User', userSchema);

// Exporta o modelo para ser usado em outros arquivos
module.exports = User;