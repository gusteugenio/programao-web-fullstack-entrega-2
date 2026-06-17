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

## Como rodar

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

### 2. Backend

No segundo terminal:

```powershell
cd backend
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
cd frontend
npm install
npm run dev
```

Abra no navegador:

```text
http://localhost:5173
```

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

O projeto pode rodar localmente em HTTPS usando um certificado autoassinado.

### Gerar certificado local

No Windows com Git instalado, rode na raiz do projeto:

```powershell
mkdir backend\certs
& "C:\Program Files\Git\mingw64\bin\openssl.exe" req -x509 -newkey rsa:2048 -nodes -sha256 -days 365 -keyout backend\certs\localhost-key.pem -out backend\certs\localhost.pem -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1"
```

### Backend HTTPS

Ajuste o arquivo `backend/.env`:

```env
PORT=3001
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173,https://localhost:5173,https://127.0.0.1:5173
HTTPS_ENABLED=true
HTTPS_KEY_PATH=./certs/localhost-key.pem
HTTPS_CERT_PATH=./certs/localhost.pem
```

Depois rode:

```powershell
cd backend
npm start
```

O backend ficara em:

```text
https://localhost:3001
```

### Frontend HTTPS

Ajuste o arquivo `frontend/.env`:

```env
VITE_API_URL=https://localhost:3001
VITE_HTTPS_ENABLED=true
VITE_HTTPS_KEY_PATH=../backend/certs/localhost-key.pem
VITE_HTTPS_CERT_PATH=../backend/certs/localhost.pem
```

Depois rode:

```powershell
cd frontend
npm run dev -- --host 127.0.0.1
```

Abra no navegador:

```text
https://localhost:5173
```

Como o certificado e autoassinado, o navegador pode exibir um aviso de seguranca. Para desenvolvimento local, aceite o aviso e continue.

## Usuarios para teste

| Usuario | Senha |
|---|---|
| admin | admin123 |
| usuario | senha123 |
