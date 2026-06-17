import { Router } from "express";
import BookModel from "../models/BookModel.js";
import LogModel from "../models/LogModel.js";
import { requireAuth } from "../config/auth.js";
import { cache } from "../config/cache.js";

const router = Router();
const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 60);

router.use(requireAuth);

function getCachedBooks(cacheKey) {
  return new Promise((resolve) => {
    cache.get(cacheKey, (error, entries) => {
      if (error || !entries?.length || !entries[0]?.body) {
        return resolve(null);
      }

      try {
        return resolve(JSON.parse(entries[0].body));
      } catch {
        return resolve(null);
      }
    });
  });
}

function setCachedBooks(cacheKey, books) {
  cache.add(
    cacheKey,
    JSON.stringify(books),
    { expire: CACHE_TTL_SECONDS, type: "application/json" },
    () => {}
  );
}

router.get(
  "/",
  (req, res, next) => {
    const { title, author } = req.query;

    if (title !== undefined && !title.trim() && author !== undefined && !author.trim()) {
      return res.status(422).json({ error: "Informe ao menos um critério de busca (título ou autor)." });
    }

    const sanitizedTitle = title ? String(title).slice(0, 200) : "";
    const sanitizedAuthor = author ? String(author).slice(0, 200) : "";
    req.cacheKey = `books:title=${sanitizedTitle}:author=${sanitizedAuthor}`;
    next();
  },
  async (req, res) => {
    const { title, author } = req.query;

    const sanitizedTitle = title ? String(title).slice(0, 200) : undefined;
    const sanitizedAuthor = author ? String(author).slice(0, 200) : undefined;

    try {
      const cachedBooks = await getCachedBooks(req.cacheKey);
      if (cachedBooks) {
        return res.json(cachedBooks);
      }

      const books = BookModel.findAll({ title: sanitizedTitle, author: sanitizedAuthor });

      LogModel.actionEvent({
        user_id: req.user.id,
        action: "SEARCH",
        detail: JSON.stringify({ title: sanitizedTitle, author: sanitizedAuthor }),
        ip: req.ip,
      });

      setCachedBooks(req.cacheKey, books);
      return res.json(books);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar livros." });
    }
  }
);

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

    cache.del("books:*", () => {});

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
