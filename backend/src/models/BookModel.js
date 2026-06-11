import db from "../config/database.js";

class BookModel {
  findAll({ title, author } = {}) {
    let query = "SELECT b.*, u.username as inserted_by FROM books b JOIN users u ON b.created_by = u.id WHERE 1=1";
    const params = [];

    if (title) {
      query += " AND b.title LIKE ?";
      params.push(`%${title}%`);
    }

    if (author) {
      query += " AND b.author LIKE ?";
      params.push(`%${author}%`);
    }

    query += " ORDER BY b.created_at DESC";

    return db.prepare(query).all(...params);
  }

  findById(id) {
    return db
      .prepare("SELECT b.*, u.username as inserted_by FROM books b JOIN users u ON b.created_by = u.id WHERE b.id = ?")
      .get(id);
  }

  create({ title, author, year, edition_count, created_by }) {
    const result = db
      .prepare(
        "INSERT INTO books (title, author, year, edition_count, created_by) VALUES (?, ?, ?, ?, ?)"
      )
      .run(title, author, year ?? null, edition_count ?? 0, created_by);

    return this.findById(result.lastInsertRowid);
  }
}

export default new BookModel();
