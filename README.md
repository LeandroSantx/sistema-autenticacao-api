# Sistema de Autenticação API - Backend com Node.js e Docker 🔐

### Descrição do Projeto

Este projeto é uma **API de backend completa** para um sistema de autenticação e registro de usuários, desenvolvida com **Node.js** e **Express.js**. O objetivo principal é demonstrar a criação de uma solução de autenticação robusta e, mais importante, totalmente **portátil** e automatizada com **Docker**.

A arquitetura foi pensada para resolver o problema de inconsistência de ambiente ("na minha máquina funciona\!"). Toda a pilha de tecnologia, incluindo a aplicação Node.js e o banco de dados MongoDB, é gerenciada através de containers Docker. Isso garante que o projeto funcione de forma idêntica em qualquer sistema operacional, com apenas um comando.

### Tecnologias Utilizadas ✨

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | `Node.js` | Ambiente de execução JavaScript do lado do servidor. |
| **Framework** | `Express.js` | Framework web para a construção da API. |
| **Banco de Dados** | `MongoDB` | Banco de dados NoSQL flexível e escalável. |
| **Containerização** | `Docker`, `Docker Compose` | Para empacotar e rodar a aplicação e o banco de dados de forma isolada. |
| **Segurança** | `bcryptjs`, `jsonwebtoken` | Para criptografia de senhas e autenticação segura com JWT. |

### Funcionalidades da API 🚀

  * **`POST /api/register`**
      * Registra um novo usuário no sistema.
      * A senha é criptografada com `bcrypt` antes de ser salva no banco.
  * **`POST /api/login`**
      * Autentica um usuário existente e retorna um token **JWT** para acesso.
  * **`GET /api/me`**
      * Rota protegida que retorna os dados do usuário autenticado.
      * Requer um token JWT válido no cabeçalho `x-auth-token`.

### Como Rodar o Projeto ⚙️

Este guia irá te ajudar a configurar e rodar o projeto em sua máquina local em apenas 3 passos. O único pré-requisito é ter o **Docker** e o **Git** instalados.

#### Passo 1: Clonar o Repositório

Abra o terminal e execute o comando abaixo para clonar o projeto:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Em seguida, entre na pasta do projeto:

```bash
cd seu-repositorio
```

#### Passo 2: Configurar as Variáveis de Ambiente

O projeto usa variáveis de ambiente para gerenciar informações sensíveis, como a chave secreta do JWT. Por segurança, o arquivo `.env` não está no repositório.

Na raiz do projeto, crie um novo arquivo chamado `.env` e adicione o seguinte conteúdo:

```dotenv
MONGO_URI=mongodb://mongodb:27017/sistema-autenticacao
JWT_SECRET=sua_chave_secreta_super_longa_e_aleatoria
```

*Você pode substituir a string `sua_chave_secreta_super_longa_e_aleatoria` por qualquer valor de sua preferência.*

#### Passo 3: Iniciar a Aplicação com Docker Compose

Com um único comando, o **Docker Compose** irá construir a imagem da sua aplicação Node.js, baixar a imagem do MongoDB e iniciar ambos os serviços, interligando-os.

No terminal, na raiz do projeto, execute:

```bash
docker-compose up --build
```

*O `docker-compose` pode demorar alguns minutos para construir as imagens e iniciar os serviços na primeira vez.*

#### Testando a API 🧪

Com a aplicação rodando, você pode usar uma ferramenta como o [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) ou [Postman](https://www.postman.com/) para testar os endpoints:

  * **`POST http://localhost:5000/api/register`**

      * **Body:** `raw` (JSON)
        ```json
        {
          "name": "Nome do Usuário",
          "email": "email@exemplo.com",
          "password": "senha123"
        }
        ```

  * **`POST http://localhost:5000/api/login`**

      * **Body:** `raw` (JSON)
        ```json
        {
          "email": "email@exemplo.com",
          "password": "senha123"
        }
        ```
      * **A resposta será um JSON contendo o token JWT.**

  * **`GET http://localhost:5000/api/me`**

      * **Headers:**
          * **Key:** `x-auth-token`
          * **Value:** `Cole o token JWT obtido no login aqui`

-----


**Autor:** [Leandro Guedes]
