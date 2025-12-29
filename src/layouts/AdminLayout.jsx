import React from "react";

function AdminLayout({ children }) {
  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <h3>QXSTA Admin</h3>
        <nav>
          <a href="/admin/artists">Artists</a>
          <a href="/admin/releases">Releases</a>
        </nav>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}

export default AdminLayout;
