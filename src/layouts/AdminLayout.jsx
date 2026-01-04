import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin");
    navigate("/admin/auth");
  }

  return (
    <section className="admin-page">
      {/* TOP BAR */}
      <div className="admin-topbar">
        <div className="admin-status">Logged in as <strong>Admin</strong></div>

        <div>
          <Link to="/admin" className="admin-btn-small">
            Dashboard
          </Link>
          <Link to="/admin/artists" className="admin-btn-small">
            Artists
          </Link>
          <Link to="/admin/releases" className="admin-btn-small">
            Releases
          </Link>
          <Link to="/admin/submissions" className="admin-btn-small">
            Submissions
          </Link>
          <button onClick={handleLogout} className="admin-btn-small">
            Logout
          </button>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <Outlet />
    </section>
  );
}