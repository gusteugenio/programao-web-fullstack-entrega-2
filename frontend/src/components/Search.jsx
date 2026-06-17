import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  FormHelperText,
  Box,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
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
    <Box mt={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
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
                <SearchIcon />
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
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          startIcon={<SearchIcon />}
          sx={{ minWidth: 120, height: 56, width: { xs: "100%", sm: "auto" } }}
        >
          Buscar
        </Button>
      </Stack>

      {fieldError && (
        <FormHelperText error sx={{ mt: 1 }}>
          {fieldError}
        </FormHelperText>
      )}
    </Box>
  );
}

export default Search;
