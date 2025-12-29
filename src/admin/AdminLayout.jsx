import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/auth");
  }

  return (
    <section className="page admin-page">
      <div className="admin-topbar">
        <span className="admin-status">
          Logged in as <strong>Admin</strong>
        </span>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Outlet />
    </section>
  );
}
