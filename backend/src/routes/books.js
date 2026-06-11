import { Router } from "express";
import BookModel from "../models/BookModel.js";
import LogModel from "../models/LogModel.js";
import { requireAuth } from "../config/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", (req, res) => {
  const { title, author } = req.query;

  if (!title && !author) {
    return res.status(422).json({ error: "Informe ao menos um critério de busca (título ou autor)." });
  }

  const sanitizedTitle = title ? String(title).slice(0, 200) : undefined;
  const sanitizedAuthor = author ? String(author).slice(0, 200) : undefined;

  try {
    const books = BookModel.findAll({ title: sanitizedTitle, author: sanitizedAuthor });

    LogModel.actionEvent({
      user_id: req.user.id,
      action: "SEARCH",
      detail: JSON.stringify({ title: sanitizedTitle, author: sanitizedAuthor }),
      ip: req.ip,
    });

    return res.json(books);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar livros." });
  }
});

router.post("/", (req, res) => {
  const { title, author, year, edition_count } = req.body;

  if (!title || !title.trim()) {
    return res.status(422).json({ error: "O campo título é obrigatório." });
  }

  if (!author || !author.trim()) {
    return res.status(422).json({ error: "O campo autor é obrigatório." });
  }

  if (year !== undefined && year !== null && year !== "") {
    const yearNum = Number(year);
    if (!Number.isInteger(yearNum) || yearNum < 1 || yearNum > new Date().getFullYear()) {
      return res.status(422).json({ error: "Ano inválido." });
    }
  }

  try {
    const book = BookModel.create({
      title: String(title).trim().slice(0, 500),
      author: String(author).trim().slice(0, 300),
      year: year ? Number(year) : null,
      edition_count: edition_count ? Number(edition_count) : 0,
      created_by: req.user.id,
    });

    LogModel.actionEvent({
      user_id: req.user.id,
      action: "INSERT",
      detail: JSON.stringify({ title: book.title, author: book.author }),
      ip: req.ip,
    });

    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao cadastrar livro." });
  }
});

export default router;
