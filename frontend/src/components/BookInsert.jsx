import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  FormHelperText,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useBooks } from "../contexts/useBooks";

function BookInsert({ onClose }) {
  const { insertBook, searchBooks } = useBooks();
  const [form, setForm] = useState({ title: "", author: "", year: "", edition_count: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "O campo título é obrigatório.";
    if (!form.author.trim()) errors.author = "O campo autor é obrigatório.";
    if (
      form.year &&
      (Number.isNaN(Number(form.year)) ||
        Number(form.year) < 1 ||
        Number(form.year) > new Date().getFullYear())
    ) {
      errors.year = "Informe um ano válido.";
    }
    return errors;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setServerError("");
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    const result = await insertBook({
      title: form.title.trim(),
      author: form.author.trim(),
      year: form.year ? Number(form.year) : null,
      edition_count: form.edition_count ? Number(form.edition_count) : 0,
    });
    setLoading(false);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    await searchBooks();
    onClose();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={onClose}
          sx={{ minWidth: 0 }}
        >
          Voltar
        </Button>
      </Box>

      <Typography variant="h5" component="h2">
        Cadastrar livro
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Preencha os dados principais para incluir o livro no acervo.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <Stack spacing={2}>
        <Box>
          <TextField
            fullWidth
            label="Título *"
            value={form.title}
            onChange={handleChange("title")}
            error={Boolean(fieldErrors.title)}
          />
          {fieldErrors.title && (
            <FormHelperText error>{fieldErrors.title}</FormHelperText>
          )}
        </Box>

        <Box>
          <TextField
            fullWidth
            label="Autor *"
            value={form.author}
            onChange={handleChange("author")}
            error={Boolean(fieldErrors.author)}
          />
          {fieldErrors.author && (
            <FormHelperText error>{fieldErrors.author}</FormHelperText>
          )}
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Ano de publicação"
              type="number"
              value={form.year}
              onChange={handleChange("year")}
              error={Boolean(fieldErrors.year)}
            />
            {fieldErrors.year && (
              <FormHelperText error>{fieldErrors.year}</FormHelperText>
            )}
          </Box>

          <TextField
            fullWidth
            label="Número de edições"
            type="number"
            value={form.edition_count}
            onChange={handleChange("edition_count")}
            sx={{ flex: 1 }}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default BookInsert;
