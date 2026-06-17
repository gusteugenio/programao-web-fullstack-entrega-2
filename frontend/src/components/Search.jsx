import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  FormHelperText,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useBooks } from "../contexts/useBooks";

function Search() {
  const { query, setQuery, searchBooks, loading } = useBooks();
  const [fieldError, setFieldError] = useState("");

  const handleSearch = async () => {
    if (!query.title.trim() && !query.author.trim()) {
      setFieldError("Informe ao menos um título ou autor.");
      return;
    }

    setFieldError("");
    await searchBooks();
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setQuery(field, value);
    if (value.trim()) setFieldError("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#fbfcfc",
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 700 }}>
        Buscar no acervo
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems="flex-start">
        <TextField
          fullWidth
          label="Título"
          value={query.title}
          error={Boolean(fieldError)}
          onChange={handleChange("title")}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Autor"
          value={query.author}
          error={Boolean(fieldError)}
          onChange={handleChange("author")}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          startIcon={<SearchIcon />}
          sx={{ height: 40, minWidth: 120, width: { xs: "100%", md: "auto" } }}
        >
          Buscar
        </Button>
      </Stack>

      {fieldError && (
        <FormHelperText error sx={{ mt: 1 }}>
          {fieldError}
        </FormHelperText>
      )}
    </Paper>
  );
}

export default Search;
