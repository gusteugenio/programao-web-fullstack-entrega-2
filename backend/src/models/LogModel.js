import { getWriteDb } from "../config/database.js";

class LogModel {
  authEvent({ username, event, ip }) {
    getWriteDb().prepare(
      "INSERT INTO auth_logs (username, event, ip) VALUES (?, ?, ?)"
    ).run(username ?? null, event, ip ?? null);
  }

  actionEvent({ user_id, action, detail, ip }) {
    getWriteDb().prepare(
      "INSERT INTO action_logs (user_id, action, detail, ip) VALUES (?, ?, ?, ?)"
    ).run(user_id ?? null, action, detail ?? null, ip ?? null);
  }
}

export default new LogModel();
