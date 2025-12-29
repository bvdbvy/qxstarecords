import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    const result = loginAsAdmin(password);

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  }

  return (
    <section className="page auth-page">
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </section>
  );
}
