import { useContext } from "react";
import { BookContext } from "./bookContext";

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks deve ser usado dentro de BooksProvider.");
  }

  return context;
}
