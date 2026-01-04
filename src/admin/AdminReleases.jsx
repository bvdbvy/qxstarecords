import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReleases, deleteRelease } from "../data/releases";
import { supabase } from "../supabase";

export default function AdminReleases() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getReleases();
        setReleases(data || []);
      } catch (err) {
        console.error("Failed to load releases:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

async function handleDelete(release) {
  if (!confirm("Delete this release?")) return;

  try {
    await deleteRelease(release.id);

    setReleases(prev =>
      prev.filter(r => r.id !== release.id)
    );
  } catch (err) {
    console.error("Failed to delete release:", err);
    alert("Failed to delete release.");
  }
}

  if (loading) {
    return <p className="admin-section">Loading releases…</p>;
  }

  return (
    <section className="admin-page">
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
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {releases.map(release => (
            <tr key={release.id}>
              <td>
                <img
                  src={release.cover || "/placeholder.png"}
                  alt={release.title}
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "6px" }}
                />
              </td>

              <td>{release.title}</td>
              <td>{release.artist}</td>

              <td>
                <a
                  href={release.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open
                </a>
              </td>

              <td>
                <Link
                  to={`/admin/releases/edit/${release.id}`}
                  className="admin-btn-outline"
                >
                  Edit
                </Link>

                <button
                  className="admin-btn-danger"
                  onClick={() => handleDelete(release)}
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