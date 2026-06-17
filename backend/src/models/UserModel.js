import { getReadDb } from "../config/database.js";

class UserModel {
  findByUsername(username) {
    return getReadDb().prepare("SELECT * FROM users WHERE username = ?").get(username);
  }

  findById(id) {
    return getReadDb().prepare("SELECT id, username, created_at FROM users WHERE id = ?").get(id);
  }
}

export default new UserModel();
