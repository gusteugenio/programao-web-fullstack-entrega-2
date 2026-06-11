import { useState } from "react";
import { AuthContext } from "./authContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [username, setUsername] = useState(() => sessionStorage.getItem("username"));
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const login = async (user, pass) => {
    setLoginError("");

    if (!user.trim() || !pass.trim()) {
      setLoginError("Preencha todos os campos.");
      return false;
    }

    try {
      setLoginLoading(true);
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.trim(), password: pass }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Erro ao fazer login.");
        return false;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.username);
      setToken(data.token);
      setUsername(data.username);
      return true;
    } catch {
      setLoginError("Não foi possível conectar ao servidor.");
      return false;
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, loginError, loginLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
