import React, { useState } from "react";
import { getArtists, saveArtists } from "../data/artists";
import { Link } from "react-router-dom";

export default function AdminArtists() {
  const [artists, setArtists] = useState(getArtists());

  function deleteArtist(id) {
    const updated = artists.filter(a => a.id !== id);
    setArtists(updated);
    saveArtists(updated);
  }

  return (
    <section className="admin-section">
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
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>
                {artist.image?.url && (
                  <img src={artist.image.url} width="50" />
                )}
              </td>

              <td>{artist.name}</td>
              <td>{artist.genre}</td>

              <td className="admin-actions">
                <Link
                  to={`/admin/artists/edit/${artist.id}`}
                  className="admin-btn"
                >
                  Edit
                </Link>

                <button
                  className="admin-btn danger"
                  onClick={() => deleteArtist(artist.id)}
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
