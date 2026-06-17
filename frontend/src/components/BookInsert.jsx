import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  FormHelperText,
  Alert,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBooks } from "../contexts/useBooks";

function BookInsert({ onClose }) {
  const { insertBook, searchBooks, query } = useBooks();
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
      (isNaN(Number(form.year)) ||
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
    <Box mt={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={onClose}
          sx={{ minWidth: 0, px: 1 }}
        >
          Voltar
        </Button>
        <Typography variant="h6">Cadastrar livro</Typography>
      </Box>

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

        <Box>
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
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default BookInsert;
