import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BooksProvider } from "./contexts/BookProvider.jsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f6f78",
      dark: "#15525a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b45309",
    },
    background: {
      default: "#f4f7f6",
      paper: "#ffffff",
    },
    text: {
      primary: "#172426",
      secondary: "#5f6f73",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BooksProvider>
          <App />
        </BooksProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
