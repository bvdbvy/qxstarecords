import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtists, saveArtists } from "../data/artists";
import { uploadImage } from "../utils/cloudinaryUpload";

export default function AdminEditArtist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const artist = getArtists().find(a => a.id === Number(id));
    if (!artist) return navigate("/admin/artists");

    setName(artist.name);
    setGenre(artist.genre);
    setExistingImage(artist.image);
    setPreview(artist.image?.url || "");
  }, [id, navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let finalImage = existingImage;
    if (image) finalImage = await uploadImage(image);

    const updated = getArtists().map(a =>
      a.id === Number(id)
        ? { ...a, name, genre, image: finalImage }
        : a
    );

    saveArtists(updated);
    navigate("/admin/artists");
  }

  return (
    <section className="admin-section">
      <h2>Edit Artist</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <input value={genre} onChange={e => setGenre(e.target.value)} />

        <div className="admin-image-preview">
          {preview && <img src={preview} />}
        </div>

        <input type="file" accept="image/*" onChange={handleImage} />

        <button>Save Changes</button>
      </form>
    </section>
  );
}
