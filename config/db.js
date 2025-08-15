// Importa o módulo 'mongoose' para interagir com o MongoDB
const mongoose = require('mongoose');

// Função assíncrona para conectar ao banco de dados
const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a URI do arquivo .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Já não é mais necessário no Mongoose 6+
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Se a conexão falhar, mostra o erro no console e sai da aplicação
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
};

// Exporta a função para que ela possa ser usada em outros arquivos (como o server.js)
module.exports = connectDB;