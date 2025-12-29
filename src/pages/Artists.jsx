import React from "react";
import { getArtists } from "../data/artists";

export default function Artists() {
  const artists = getArtists();

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
                src={artist.image?.url || "/placeholder.png"}
                alt={artist.name}
                loading="lazy"
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
