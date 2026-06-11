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
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <MenuBookIcon fontSize="large" />
          <Typography variant="h5" component="span">
            Busca de Livros
          </Typography>
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
