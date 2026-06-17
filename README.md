# Busca de Livros

Aplicação web fullstack para cadastro e busca de livros, desenvolvida com React.js, Express.js e SQLite.

## Funcionalidades

- Login com token de sessão persistido em banco
- Listagem de livros cadastrados
- Busca de livros por título ou autor
- Cadastro de novos livros
- Logout com invalidação de token
- Cache Redis para buscas no backend
- Pool de conexões SQLite para leitura e escrita
- Suporte a HTTPS por configuração

## Tecnologias

**Frontend:** React.js, Material UI, Vite

**Backend:** Node.js, Express.js, SQLite (better-sqlite3), express-redis-cache

## Como rodar

### Backend

```bash
cd backend
npm install
cp .env.example .env
node src/config/seed.js
npm run dev
```

Se for usar o cache, suba também um servidor Redis local em `REDIS_HOST:REDIS_PORT`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## HTTPS local

Para rodar o backend com HTTPS, ajuste no `backend/.env`:

```env
HTTPS_ENABLED=true
HTTPS_KEY_PATH=./certs/localhost-key.pem
HTTPS_CERT_PATH=./certs/localhost.pem
```

Depois, gere ou forneça um certificado local válido para desenvolvimento.

## Usuários para teste

| Usuário | Senha |
|---|---|
| admin | admin123 |
| usuario | senha123 |
