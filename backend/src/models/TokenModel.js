import { getReadDb, getWriteDb } from "../config/database.js";

class TokenModel {
  create({ token, userId, expiresAt }) {
    getWriteDb()
      .prepare(
        "INSERT OR REPLACE INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)"
      )
      .run(token, userId, expiresAt);
  }

  findValid(token) {
    return getReadDb()
      .prepare(
        `SELECT s.token, s.user_id, s.expires_at, u.username
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
         LIMIT 1`
      )
      .get(token);
  }

  delete(token) {
    getWriteDb()
      .prepare("DELETE FROM sessions WHERE token = ?")
      .run(token);
  }

  deleteExpired() {
    getWriteDb()
      .prepare("DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP")
      .run();
  }
}

export default new TokenModel();
