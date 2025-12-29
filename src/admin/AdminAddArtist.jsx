import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArtists, saveArtists } from "../data/artists";
import { uploadImage } from "../utils/cloudinaryUpload";

export default function AdminAddArtist() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const artists = getArtists();

      artists.push({
        id: Date.now(),
        name,
        genre,
        image: imageUrl,
      });

      saveArtists(artists);
      navigate("/admin/artists");
    } catch (err) {
      console.error(err);
      alert("Failed to add artist");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-section">
      <h2>Add Artist</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Genre / Sound"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />

        <div className="admin-image-preview">
          {preview ? <img src={preview} alt="Preview" /> : <span>No image</span>}
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button disabled={loading}>
          {loading ? "Saving..." : "Add Artist"}
        </button>
      </form>
    </section>
  );
}
