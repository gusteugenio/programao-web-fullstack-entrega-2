import { Typography, Button, Paper, Box } from "@mui/material";
import { useBooks } from "../contexts/useBooks";

function BookDetail() {
  const { selectedBook: book, clearSelectedBook } = useBooks();

  if (!book) return null;

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={clearSelectedBook}>
          Voltar
        </Button>
      </Box>

      <Box>
        <Typography variant="h5">{book.title}</Typography>

        <Typography>
          <strong>Autor:</strong> {book.author}
        </Typography>

        <Typography>
          <strong>Ano:</strong> {book.year || "N/A"}
        </Typography>

        <Typography>
          <strong>Edições:</strong> {book.edition_count || 0}
        </Typography>

        <Typography>
          <strong>Cadastrado por:</strong> {book.inserted_by}
        </Typography>
      </Box>
    </Paper>
  );
}

export default BookDetail;
