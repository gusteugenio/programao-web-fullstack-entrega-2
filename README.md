# Busca de Livros

Aplicação web fullstack para cadastro e busca de livros, desenvolvida com React.js, Express.js e SQLite.

## Funcionalidades

- Login com autenticação JWT
- Listagem de livros cadastrados
- Busca de livros por título ou autor
- Cadastro de novos livros

## Tecnologias

**Frontend:** React.js, Material UI, Vite

**Backend:** Node.js, Express.js, SQLite (better-sqlite3)

## Como rodar

### Backend

```bash
cd backend
npm install
cp .env.example .env
node src/config/seed.js
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Usuários para teste

| Usuário | Senha |
|---|---|
| admin | admin123 |
| usuario | senha123 |
