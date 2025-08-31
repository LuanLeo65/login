# 🔐 API de Login

API de autenticação com **JWT + Refresh Token**, desenvolvida em **Node.js + Express + Sequelize**, com banco de dados **MySQL**.  
O projeto implementa autenticação segura com senhas criptografadas e controle de sessão por tokens.

---

## 🚀 Tecnologias
- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Bcrypt

---

## ⚙️ Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/LuanLeo65/login.git

# Entre na pasta
cd login

# Instale as dependências
npm install

# Configure as variáveis de ambiente no .env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=login_db
JWT_SECRET=seu_segredo
REFRESH_SECRET=seu_refresh
PORT=3000

# Inicie o servidor
npm run dev