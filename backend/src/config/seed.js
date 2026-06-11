import bcrypt from "bcryptjs";
import db from "./database.js";

const users = [
  { username: "admin", password: "admin123" },
  { username: "usuario", password: "senha123" },
];

const insert = db.prepare(
  "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)"
);

for (const user of users) {
  const hash = bcrypt.hashSync(user.password, 12);
  insert.run(user.username, hash);
}

console.log("Usuários inseridos com sucesso.");
