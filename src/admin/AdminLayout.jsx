import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  }

  return (
    <section className="admin-page">
      {/* TOP BAR */}
      <div className="admin-topbar">
        <div className="admin-status">
          Logged in as <strong>Admin</strong>
        </div>

        <div className="admin-actions">
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

          {/* NEW — Back to Public Website */}
          <Link to="/" className="admin-btn-small">
            View Site
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