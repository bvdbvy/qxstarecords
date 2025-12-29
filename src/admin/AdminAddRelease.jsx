import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReleases, saveReleases } from "../data/releases";
import { uploadImage } from "../utils/cloudinaryUpload";

export default function AdminAddRelease() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select a cover image");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Upload image to Cloudinary
      const imageUrl = await uploadImage(imageFile);

      // 2️⃣ Save release metadata only
      const releases = getReleases();
      const newRelease = {
        id: Date.now(),
        title,
        artist,
        cover: imageUrl,
        link,
      };

      saveReleases([...releases, newRelease]);

      navigate("/admin/releases");
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-section">
      <h2>Add New Release</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Release Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <input
          placeholder="Streaming Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Release"}
        </button>
      </form>
    </section>
  );
}
