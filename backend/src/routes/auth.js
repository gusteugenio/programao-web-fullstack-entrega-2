import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import UserModel from "../models/UserModel.js";
import LogModel from "../models/LogModel.js";

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

  if (!user || !bcrypt.compareSync(password, user.password)) {
    LogModel.authEvent({ username: username.trim(), event: "LOGIN_FAILED", ip });
    return res.status(401).json({ error: "Usuário ou senha inválidos." });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  LogModel.authEvent({ username: user.username, event: "LOGIN_SUCCESS", ip });

  return res.json({ token, username: user.username });
});

router.post("/logout", (req, res) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    const payload = (() => {
      try {
        return jwt.decode(header.split(" ")[1]);
      } catch {
        return null;
      }
    })();

    if (payload) {
      LogModel.authEvent({ username: payload.username, event: "LOGOUT", ip: req.ip });
    }
  }

  return res.json({ message: "Logout realizado." });
});

export default router;
