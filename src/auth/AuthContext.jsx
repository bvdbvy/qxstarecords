import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error(
    "VITE_ADMIN_PASSWORD is not defined. Check your .env file."
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  const loginAsAdmin = (password) => {
    if (password !== ADMIN_PASSWORD) {
      return { success: false, message: "Invalid admin password" };
    }

    const adminUser = { role: "admin" };
    setUser(adminUser);
    localStorage.setItem("admin_user", JSON.stringify(adminUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
