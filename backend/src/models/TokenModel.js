import { getReadDb, getWriteDb } from "../config/database.js";

class TokenModel {
  revoke({ jti, username, expiresAt }) {
    getWriteDb()
      .prepare(
        "INSERT OR REPLACE INTO revoked_tokens (jti, username, expires_at) VALUES (?, ?, ?)"
      )
      .run(jti, username ?? null, expiresAt);
  }

  isRevoked(jti) {
    return Boolean(
      getReadDb()
        .prepare("SELECT jti FROM revoked_tokens WHERE jti = ? LIMIT 1")
        .get(jti)
    );
  }

  deleteExpired() {
    getWriteDb()
      .prepare("DELETE FROM revoked_tokens WHERE expires_at <= CURRENT_TIMESTAMP")
      .run();
  }
}

export default new TokenModel();
