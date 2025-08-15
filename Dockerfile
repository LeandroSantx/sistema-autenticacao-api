# Usa a imagem oficial do Node.js como base.
FROM node:18-alpine

# Define o diretório de trabalho dentro do container.
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho.
# Isso permite que o Docker "cacheie" a instalação das dependências.
COPY package*.json ./

# Instala as dependências do projeto.
# O '--omit=dev' instrui o npm a não instalar as dependências de desenvolvimento.
RUN npm install --omit=dev

# Copia todos os outros arquivos do projeto para o diretório de trabalho.
COPY . .

# Isso não publica a porta, apenas a documenta.
EXPOSE 5000

# O 'npm start' ou 'node server.js' inicia o seu servidor.
CMD ["npm", "start"]