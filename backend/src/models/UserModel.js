import db from "../config/database.js";

class UserModel {
  findByUsername(username) {
    return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  }

  findById(id) {
    return db.prepare("SELECT id, username, created_at FROM users WHERE id = ?").get(id);
  }
}

export default new UserModel();
