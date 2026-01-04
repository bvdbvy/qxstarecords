import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtistById, updateArtist } from "../data/artists";
import { uploadImage } from "../utils/cloudinaryUpload";


export default function AdminEditArtist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtist() {
      const artist = await getArtistById(id);
      if (!artist) {
        alert("Artist not found");
        navigate("/admin/artists");
        return;
      }

      setName(artist.name || "");
      setGenre(artist.genre || "");
      setPreview(artist.image || "");
      setLoading(false);
    }

    loadArtist();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = preview;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await updateArtist(id, {
        name,
        genre,
        image: imageUrl
      });

      navigate("/admin/artists");
    } catch (err) {
      console.error(err);
      alert("Failed to update artist");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="admin-section">Loading artist...</p>;
  }

  return (
    <section className="admin-section">
      <h2>Edit Artist</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <input value={genre} onChange={e => setGenre(e.target.value)} required />

        <div className="admin-image-preview">
          {preview ? <img src={preview} alt="Preview" /> : <span>No image</span>}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
