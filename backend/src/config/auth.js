import TokenModel from "../models/TokenModel.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const token = header.split(" ")[1];

  TokenModel.deleteExpired();
  const session = TokenModel.findValid(token);

  if (!session) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }

  req.user = { id: session.user_id, username: session.username, token: session.token };
  next();
}
