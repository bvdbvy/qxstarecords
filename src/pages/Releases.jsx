import React, { useEffect, useState } from "react";
import { getReleases } from "../data/releases";

export default function Releases() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadReleases() {
    try {
      const data = await getReleases();
      setReleases(data);
    } catch (err) {
      console.error("Failed to load releases:", err);
    } finally {
      setLoading(false);
    }
  }

  loadReleases();
}, []);

  if (loading) {
    return (
      <section className="page artists-page">
        <p>Loading releases...</p>
      </section>
    );
  }

  return (
    <section className="page artists-page">
      <div className="page-header">
        <h1>Releases</h1>
        <p>Official catalog from QXSTA Records</p>
      </div>

      <div className="artists-grid">
        {releases.map((r) => (
          <div className="artist-card" key={r.id}>
            <div className="artist-image">
              <img
                src={r.cover || "/placeholder.png"}
                alt={r.title}
              />
            </div>

            <h3>{r.title}</h3>
            <span>{r.artist}</span>

            <a
              href={r.link}
              target="_blank"
              rel="noreferrer"
              className="listen-btn"
            >
              Listen
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}