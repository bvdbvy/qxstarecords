import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleAdminLogin() {
    setUser({ role: "admin", name: "Admin" });
    navigate("/admin/artists");
  }

  function handleArtistLogin() {
    setUser({ role: "artist", name: "Artist" });
    navigate("/artist");
  }

  return (
    <section className="page">
      <h2>Login</h2>

      <button onClick={handleAdminLogin}>Login as Admin</button>
      <button onClick={handleArtistLogin}>Login as Artist</button>
    </section>
  );
}

export default Login;
