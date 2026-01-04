import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReleaseById, updateRelease } from "../data/releases";
import { uploadImage } from "../utils/cloudinaryUpload";


export default function AdminEditRelease() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelease() {
      const release = await getReleaseById(id);
      if (!release) {
        alert("Release not found");
        navigate("/admin/releases");
        return;
      }

      setTitle(release.title || "");
      setArtist(release.artist || "");
      setLink(release.link || "");
      setCoverPreview(release.cover || "");
      setLoading(false);
    }

    loadRelease();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let cover = coverPreview;

      if (newImage) {
        cover = await uploadImage(newImage);
      }

      await updateRelease(id, {
        title,
        artist,
        link,
        cover
      });

      navigate("/admin/releases");
    } catch (err) {
      console.error(err);
      alert("Failed to update release");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="admin-section">Loading release...</p>;
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
            <img src={coverPreview} alt="Preview" />
          ) : (
            <span>No image</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            setNewImage(file);
            setCoverPreview(URL.createObjectURL(file));
          }}
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
