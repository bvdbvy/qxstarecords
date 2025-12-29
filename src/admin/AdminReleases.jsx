import React, { useState } from "react";
import { getReleases, saveReleases } from "../data/releases";
import { Link } from "react-router-dom";

export default function AdminReleases() {
  const [releases, setReleases] = useState(getReleases());

  function deleteRelease(id) {
    const updated = releases.filter((r) => r.id !== id);
    setReleases(updated);
    saveReleases(updated);
  }

  return (
    <section className="admin-section">
      <div className="admin-header">
        <h2>Manage Releases</h2>

        <Link to="/admin/releases/new" className="admin-btn">
          + Add Release
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {releases.map((release) => (
            <tr key={release.id}>
              <td>
                {release.cover?.url && (
                  <img
                    src={release.cover.url}
                    alt={release.title}
                    width="50"
                  />
                )}
              </td>

              <td>{release.title}</td>
              <td>{release.artist}</td>

              <td className="admin-actions">
                <Link
                  to={`/admin/releases/edit/${release.id}`}
                  className="admin-btn"
                >
                  Edit
                </Link>

                <button
                  className="admin-btn danger"
                  onClick={() => deleteRelease(release.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
