import React, { useEffect, useState } from "react";
import { getArtists } from "../data/artists";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadArtists() {
    try {
      const data = await getArtists();
      setArtists(data);
    } catch (err) {
      console.error("Failed to load artists:", err);
    } finally {
      setLoading(false);
    }
  }

  loadArtists();
}, []);

  if (loading) {
    return (
      <section className="page artists-page">
        <p>Loading artists...</p>
      </section>
    );
  }

  return (
    <section className="page artists-page">
      <div className="page-header">
        <h1>Artists</h1>
        <p>Roster curated by QXSTA Records</p>
      </div>

      <div className="artists-grid">
        {artists.map((artist) => (
          <div className="artist-card" key={artist.id}>
            <div className="artist-image">
              <img
                src={artist.image || "/placeholder.png"}
                alt={artist.name}
              />
            </div>

            <h3>{artist.name}</h3>
            <span>{artist.genre}</span>
          </div>
        ))}
      </div>
    </section>
  );
}