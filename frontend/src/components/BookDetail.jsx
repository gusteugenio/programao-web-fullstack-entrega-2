import { Typography, Button, Paper, Box, Stack, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonIcon from "@mui/icons-material/Person";
import { useBooks } from "../contexts/useBooks";

function BookDetail() {
  const { selectedBook: book, clearSelectedBook } = useBooks();

  if (!book) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Button variant="text" startIcon={<ArrowBackIcon />} onClick={clearSelectedBook} sx={{ mb: 2 }}>
        Voltar
      </Button>

      <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
        {book.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {book.author}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <CalendarMonthIcon color="primary" fontSize="small" />
          <Typography><strong>Ano:</strong> {book.year || "N/A"}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <AutoStoriesIcon color="primary" fontSize="small" />
          <Typography><strong>Edições:</strong> {book.edition_count || 0}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <PersonIcon color="primary" fontSize="small" />
          <Typography><strong>Cadastrado por:</strong> {book.inserted_by}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default BookDetail;
