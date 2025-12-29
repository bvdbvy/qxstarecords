import React from "react";
import { getReleases } from "../data/releases";

export default function Releases() {
  const releases = getReleases();

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
  src={r.cover?.url || "/placeholder.png"}
  alt={r.title}
  loading="lazy"
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
