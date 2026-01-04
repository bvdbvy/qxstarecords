import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArtists, deleteArtist } from "../data/artists";
import { supabase } from "../supabase";

export default function AdminArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getArtists();
      setArtists(data || []);
      setLoading(false);
    }
    load();
  }, []);

async function handleDelete(artist) {
  if (!confirm("Delete this artist?")) return;

  try {
    await deleteArtist(artist.id);

    setArtists(prev =>
      prev.filter(a => a.id !== artist.id)
    );
  } catch (err) {
    console.error("Failed to delete artist:", err);
    alert("Failed to delete artist.");
  }
}

  if (loading) return <p className="admin-section">Loading artists…</p>;

  return (
    <section className="admin-page">
      <div className="admin-header">
        <h2>Manage Artists</h2>
        <Link to="/admin/artists/new" className="admin-btn">
          + Add Artist
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {artists.map(artist => (
            <tr key={artist.id}>
              <td>
                <img
                  src={artist.image || "/placeholder.png"}
                  alt={artist.name}
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "6px" }}
                />
              </td>

              <td>{artist.name}</td>
              <td>{artist.genre}</td>

              <td>
                <Link
                  to={`/admin/artists/edit/${artist.id}`}
                  className="admin-btn-outline"
                >
                  Edit
                </Link>

                <button
                  className="admin-btn-danger"
                  onClick={() => handleDelete(artist)}
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