# Busca de Livros

Aplicacao web fullstack para cadastro e busca de livros, desenvolvida com React.js, Express.js e SQLite.

## Funcionalidades

- Login com token de sessao persistido em banco
- Listagem de livros cadastrados
- Busca de livros por titulo ou autor
- Cadastro de novos livros
- Logout com invalidacao de token
- Cache Redis para buscas no backend
- Pool de conexoes SQLite para leitura e escrita
- Suporte a HTTPS por configuracao

## Tecnologias

**Frontend:** React.js, Material UI, Vite

**Backend:** Node.js, Express.js, SQLite (better-sqlite3), express-redis-cache

## Como rodar no Windows

Use tres terminais separados: um para o Redis, um para o backend e um para o frontend.

### 1. Redis

Se o PowerShell estiver aberto como administrador, voce pode iniciar o servico:

```powershell
Start-Service Redis
```

Se nao estiver como administrador, rode o Redis diretamente pelo executavel:

```powershell
Start-Process -FilePath "C:\Program Files\Redis\redis-server.exe" -ArgumentList "--port","6379","--bind","127.0.0.1","--save",""""" -WindowStyle Hidden
```

Para testar se o Redis esta rodando:

```powershell
& "C:\Program Files\Redis\redis-cli.exe" PING
```

A resposta esperada e:

```text
PONG
```

### 2. Backend

No segundo terminal:

```powershell
cd "C:\Users\Leonardo David\programao-web-fullstack-entrega-2\backend"
npm install
npm run seed
npm start
```

O backend roda em:

```text
http://localhost:3001
```

### 3. Frontend

No terceiro terminal:

```powershell
cd "C:\Users\Leonardo David\programao-web-fullstack-entrega-2\frontend"
npm install
npm run dev -- --host 127.0.0.1
```

Abra no navegador:

```text
http://localhost:5173
```

Se a porta `5173` estiver em uso, rode em outra porta:

```powershell
npm run dev -- --host 127.0.0.1 --port 5174
```

E acesse:

```text
http://localhost:5174
```

## Como parar

Para parar backend e frontend, use `Ctrl+C` nos terminais em que eles estao rodando.

Para parar o Redis iniciado pelo servico:

```powershell
Stop-Service Redis
```

Para parar o Redis iniciado pelo executavel:

```powershell
& "C:\Program Files\Redis\redis-cli.exe" SHUTDOWN NOSAVE
```

## HTTPS local

Para rodar o backend com HTTPS, ajuste no `backend/.env`:

```env
HTTPS_ENABLED=true
HTTPS_KEY_PATH=./certs/localhost-key.pem
HTTPS_CERT_PATH=./certs/localhost.pem
```

Depois, gere ou forneca um certificado local valido para desenvolvimento.

## Usuarios para teste

| Usuario | Senha |
|---|---|
| admin | admin123 |
| usuario | senha123 |
