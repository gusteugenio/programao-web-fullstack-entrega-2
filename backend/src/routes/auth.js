import { Router } from "express";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import UserModel from "../models/UserModel.js";
import LogModel from "../models/LogModel.js";
import TokenModel from "../models/TokenModel.js";
import { verifyPassword } from "../config/password.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Muitas tentativas de login. Tente novamente em 15 minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip;

  if (!username || !username.trim()) {
    return res.status(422).json({ error: "O campo usuário é obrigatório." });
  }

  if (!password || !password.trim()) {
    return res.status(422).json({ error: "O campo senha é obrigatório." });
  }

  const user = UserModel.findByUsername(username.trim());
  const passwordOk = user ? verifyPassword(password, user.password) : false;

  if (!user || !passwordOk) {
    LogModel.authEvent({ username: username.trim(), event: "LOGIN_FAILED", ip });
    return res.status(401).json({ error: "Usuário ou senha inválidos." });
  }

  TokenModel.deleteExpired();
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  TokenModel.create({ token, userId: user.id, expiresAt });

  LogModel.authEvent({ username: user.username, event: "LOGIN_SUCCESS", ip });

  return res.json({ token, username: user.username });
});

router.post("/logout", (req, res) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    const token = header.split(" ")[1];
    const session = TokenModel.findValid(token);

    if (session) {
      TokenModel.delete(token);
      LogModel.authEvent({ username: session.username, event: "LOGOUT", ip: req.ip });
    }
  }

  return res.json({ message: "Logout realizado." });
});

export default router;
