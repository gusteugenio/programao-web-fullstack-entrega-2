import { useState } from "react";
import Search from "./components/Search";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import BookInsert from "./components/BookInsert";
import Login from "./components/Login";
import { useBooks } from "./contexts/useBooks";
import { useAuth } from "./contexts/useAuth";

import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function App() {
  const { token, username, logout } = useAuth();
  const { selectedBook, searchError, loading } = useBooks();
  const [showInsert, setShowInsert] = useState(false);

  if (!token) {
    return <Login />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MenuBookIcon fontSize="large" />
            <Typography variant="h4" component="span">
              Busca de Livros
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {username}
            </Typography>
            <Button variant="outlined" size="small" onClick={logout}>
              Sair
            </Button>
          </Box>
        </Box>

        {!selectedBook && !showInsert && (
          <>
            <Search />

            <Box mt={2}>
              <Button variant="text" onClick={() => setShowInsert(true)}>
                + Cadastrar novo livro
              </Button>
            </Box>
          </>
        )}

        {showInsert && (
          <BookInsert onClose={() => setShowInsert(false)} />
        )}

        {searchError && !showInsert && (
          <Typography color="error" sx={{ mt: 2 }}>
            {searchError}
          </Typography>
        )}

        {loading && (
          <Box mt={2}>
            <CircularProgress />
          </Box>
        )}

        {!loading && !selectedBook && !showInsert && (
          <BookList />
        )}

        {selectedBook && (
          <BookDetail />
        )}
      </Paper>
    </Container>
  );
}

export default App;
