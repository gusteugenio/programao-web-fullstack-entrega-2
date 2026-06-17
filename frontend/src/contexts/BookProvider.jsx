import { useState, useEffect } from "react";
import { BookContext } from "./bookContext";
import { useAuth } from "./useAuth";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function BooksProvider({ children }) {
  const { token, logout } = useAuth();

  const [query, setQueryState] = useState({ title: "", author: "" });
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);

  const setQuery = (field, value) => {
    setQueryState((prev) => ({ ...prev, [field]: value }));
    setSearchError("");

    if (
      (field === "title" ? value : query.title).trim() === "" &&
      (field === "author" ? value : query.author).trim() === ""
    ) {
      setSelectedBook(null);
    }
  };

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const handleUnauthorized = () => {
    logout();
  };

  const fetchAll = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/books?title=`, {
        headers: authHeaders(),
      });

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [token]);

  const searchBooks = async () => {
    setSearchError("");

    if (!query.title.trim() && !query.author.trim()) {
      await fetchAll();
      return true;
    }

    try {
      setLoading(true);
      setSelectedBook(null);

      const params = new URLSearchParams();
      if (query.title.trim()) {
        params.set("title", query.title.trim());
      }
      if (query.author.trim()) {
        params.set("author", query.author.trim());
      }
      const res = await fetch(`${API}/api/books?${params}`, {
        headers: authHeaders(),
      });

      if (res.status === 401) {
        handleUnauthorized();
        return false;
      }

      const data = await res.json();

      if (!res.ok) {
        setSearchError(data.error || "Erro ao buscar livros.");
        setBooks([]);
        return false;
      }

      if (data.length === 0) {
        setSearchError("Nenhum livro foi encontrado para essa busca.");
        setBooks([]);
        return false;
      }

      setBooks(data);
      return true;
    } catch {
      setSearchError("Não foi possível buscar os livros agora. Tente novamente.");
      setBooks([]);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const insertBook = async ({ title, author, year, edition_count }) => {
    const res = await fetch(`${API}/api/books`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ title, author, year, edition_count }),
    });

    if (res.status === 401) {
      handleUnauthorized();
      return { ok: false, error: "Sessão expirada." };
    }

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, error: data.error || "Erro ao cadastrar livro." };
    }

    return { ok: true, book: data };
  };

  const selectBook = (book) => setSelectedBook(book);
  const clearSelectedBook = () => setSelectedBook(null);

  return (
    <BookContext.Provider
      value={{
        query,
        setQuery,
        books,
        selectedBook,
        searchError,
        loading,
        searchBooks,
        insertBook,
        selectBook,
        clearSelectedBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
