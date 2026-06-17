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
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const { token, username, logout } = useAuth();
  const { selectedBook, searchError, loading } = useBooks();
  const [showInsert, setShowInsert] = useState(false);

  if (!token) {
    return <Login />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 5 } }}>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2,
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            bgcolor: "#f9fbfb",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                color: "primary.contrastText",
                bgcolor: "primary.main",
              }}
            >
              <MenuBookIcon />
            </Box>
            <Box>
              <Typography variant="h5" component="h1">
                Busca de Livros
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consulta e cadastro do acervo
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {username}
            </Typography>
            <Button variant="outlined" size="small" startIcon={<LogoutIcon />} onClick={logout}>
              Sair
            </Button>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {!selectedBook && !showInsert && (
            <>
              <Search />

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowInsert(true)}>
                  Cadastrar livro
                </Button>
              </Box>
            </>
          )}

          {showInsert && (
            <BookInsert onClose={() => setShowInsert(false)} />
          )}

          {searchError && !showInsert && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {searchError}
            </Alert>
          )}

          {loading && (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && !selectedBook && !showInsert && (
            <BookList />
          )}

          {selectedBook && (
            <BookDetail />
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
