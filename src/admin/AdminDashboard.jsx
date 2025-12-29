import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <section className="page admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <Link to="/admin/submissions" className="admin-card">
          Submissions
        </Link>

        <Link to="/admin/artists" className="admin-card">
          Artists
        </Link>

        <Link to="/admin/releases" className="admin-card">
          Releases
        </Link>
      </div>

      {/* THIS is where nested admin pages render */}
      <Outlet />
    </section>
  );
}
