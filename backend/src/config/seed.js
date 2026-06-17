import { getWriteDb } from "./database.js";
import { hashPassword } from "./password.js";

const db = getWriteDb();

const users = [
  { username: "admin", password: "admin123" },
  { username: "usuario", password: "senha123" },
];

const insert = db.prepare(`
  INSERT INTO users (username, password)
  VALUES (?, ?)
  ON CONFLICT(username) DO UPDATE SET password = excluded.password
`);

for (const user of users) {
  const hash = hashPassword(user.password);
  insert.run(user.username, hash);
}

console.log("Usuários inseridos com sucesso.");
