import "dotenv/config";
import express from "express";
import http from "http";
import https from "https";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import perfectExpressSanitizer from "perfect-express-sanitizer";
import xss from "xss";
import fs from "fs";
import authRoutes from "./routes/auth.js";
import booksRoutes from "./routes/books.js";
import { getPoolInfo } from "./config/database.js";

const app = express();

app.set("trust proxy", 1);

app.use(compression());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "10kb" }));
app.use(morgan("combined"));

app.use(
  perfectExpressSanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    level: 5,
  })
);

app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor." });
});

const PORT = process.env.PORT || 3001;
const HTTPS_ENABLED = process.env.HTTPS_ENABLED === "true";

function startServer() {
  if (!HTTPS_ENABLED) {
    http.createServer(app).listen(PORT, () => {
      const poolInfo = getPoolInfo();
      console.log(`Servidor HTTP rodando na porta ${PORT}`);
      console.log(`Pool SQLite ativo: ${poolInfo.readPoolSize} conexões de leitura e 1 de escrita`);
    });
    return;
  }

  const keyPath = process.env.HTTPS_KEY_PATH;
  const certPath = process.env.HTTPS_CERT_PATH;

  if (!keyPath || !certPath) {
    throw new Error("Defina HTTPS_KEY_PATH e HTTPS_CERT_PATH para iniciar o servidor com HTTPS.");
  }

  https.createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    app
  ).listen(PORT, () => {
    const poolInfo = getPoolInfo();
    console.log(`Servidor HTTPS rodando na porta ${PORT}`);
    console.log(`Pool SQLite ativo: ${poolInfo.readPoolSize} conexões de leitura e 1 de escrita`);
  });
}

startServer();
