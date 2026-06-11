import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useMemo } from "react";
import { useBooks } from "../contexts/useBooks";

function BookList() {
  const { books, selectBook } = useBooks();

  const limitedBooks = useMemo(() => books.slice(0, 10), [books]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Título</strong></TableCell>
            <TableCell><strong>Autor</strong></TableCell>
            <TableCell><strong>Ano</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {limitedBooks.map((book) => (
            <TableRow
              key={book.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => selectBook(book)}
            >
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.year || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookList;
