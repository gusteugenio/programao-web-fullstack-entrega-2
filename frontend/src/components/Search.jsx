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
    if (!query.trim()) {
      setFieldError("Digite o nome de um livro antes de buscar.");
      return;
    }

    setFieldError("");
    await searchBooks();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) setFieldError("");
  };

  return (
    <Box mt={2}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <TextField
          fullWidth
          label="Nome do livro"
          value={query}
          error={Boolean(fieldError)}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          startIcon={<SearchIcon />}
          sx={{ minWidth: 120, height: 56 }}
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
