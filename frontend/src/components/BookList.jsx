import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useMemo } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useBooks } from "../contexts/useBooks";

function BookList() {
  const { books, selectBook } = useBooks();

  const limitedBooks = useMemo(() => books.slice(0, 10), [books]);

  if (!limitedBooks.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 3,
          border: "1px dashed",
          borderColor: "divider",
          textAlign: "center",
          bgcolor: "#fbfcfc",
        }}
      >
        <MenuBookIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="subtitle1" fontWeight={700}>
          Nenhum livro listado
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Faça uma busca ou cadastre um novo livro.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        mt: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Resultados
        </Typography>
        <Chip size="small" label={`${limitedBooks.length} livro(s)`} />
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f4f7f6" }}>
            <TableCell><strong>Título</strong></TableCell>
            <TableCell><strong>Autor</strong></TableCell>
            <TableCell width={110}><strong>Ano</strong></TableCell>
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
              <TableCell sx={{ fontWeight: 700 }}>{book.title}</TableCell>
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
