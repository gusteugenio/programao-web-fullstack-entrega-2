import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../contexts/useAuth";

function Login() {
  const { login, loginError, loginLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = "O campo usuário é obrigatório.";
    if (!password.trim()) errors.password = "O campo senha é obrigatório.";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    await login(username, password);
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
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
              Acesse sua sessão para continuar
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2}>
          <Box>
            <TextField
              fullWidth
              label="Usuário"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setFieldErrors((prev) => ({ ...prev, username: "" }));
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              error={Boolean(fieldErrors.username)}
            />
            {fieldErrors.username && (
              <FormHelperText error>{fieldErrors.username}</FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              error={Boolean(fieldErrors.password)}
            />
            {fieldErrors.password && (
              <FormHelperText error>{fieldErrors.password}</FormHelperText>
            )}
          </Box>

          {loginError && (
            <Typography color="error" variant="body2">
              {loginError}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loginLoading}
            fullWidth
            startIcon={!loginLoading && <LoginIcon />}
            sx={{ height: 44 }}
          >
            {loginLoading ? <CircularProgress size={22} /> : "Entrar"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Login;
