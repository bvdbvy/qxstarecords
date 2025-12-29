import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReleases, saveReleases } from "../data/releases";
import { uploadImage } from "../utils/cloudinaryUpload";

export default function AdminEditRelease() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");
  const [cover, setCover] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const release = getReleases().find(r => r.id === Number(id));

    if (!release) {
      alert("Release not found");
      navigate("/admin/releases");
      return;
    }

    setTitle(release.title);
    setArtist(release.artist);
    setLink(release.link);
    setCover(release.cover);
   setCoverPreview(release.cover?.url || "");
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedCover = cover;

      if (newImage) {
        updatedCover = await uploadImage(newImage);
      }

      const updated = getReleases().map(r =>
        r.id === Number(id)
          ? { ...r, title, artist, link, cover: updatedCover }
          : r
      );

      saveReleases(updated);
      navigate("/admin/releases");
    } catch (err) {
      console.error(err);
      alert("Failed to update release");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-section">
      <h2>Edit Release</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <input value={artist} onChange={e => setArtist(e.target.value)} required />
        <input value={link} onChange={e => setLink(e.target.value)} required />

        <div className="admin-image-preview">
          {coverPreview ? (
            <img src={coverPreview} alt="Cover Preview" />
          ) : (
            <span>No image</span>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
