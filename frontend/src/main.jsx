import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BooksProvider } from "./contexts/BookProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BooksProvider>
        <App />
      </BooksProvider>
    </AuthProvider>
  </StrictMode>
);
