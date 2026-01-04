import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addRelease } from "../data/releases";
import { uploadImage } from "../utils/cloudinaryUpload";

export default function AdminAddRelease() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("releaseUploadDone")) {
      navigate("/admin/releases", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile) return alert("Upload cover art");

    try {
      setLoading(true);
      setProgress(0);

      // A. IMAGE UPLOAD (0–80)
      const cover = await uploadImage(imageFile, setProgress);

      // B.  SAVE (80–100)
      setProgress(85);

await addRelease({
  title,
  artist,
  link,
  cover: cover.url,
  cover_public_id: cover.public_id,
  created_at: new Date().toISOString(),
});

      setProgress(100);
      sessionStorage.setItem("releaseUploadDone", "true");

      navigate("/admin/releases", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
      sessionStorage.removeItem("releaseUploadDone");
    }
  }

  return (
    <section className="admin-section">
      <h2>Add New Release</h2>

<form className="admin-form" onSubmit={handleSubmit}>
  <input
    value={title}
    onChange={e => setTitle(e.target.value)}
    placeholder="Release title"
    required
  />

  <input
    value={artist}
    onChange={e => setArtist(e.target.value)}
    placeholder="Artist name"
    required
  />

  <input
    value={link}
    onChange={e => setLink(e.target.value)}
    placeholder="Streaming link (Spotify, Audiomack, etc.)"
    required
  />

  <div className="admin-image-preview">
    {preview ? <img src={preview} alt="Cover preview" /> : <span>No cover art</span>}
  </div>

  <input
    type="file"
    accept="image/*"
    required
    onChange={e => {
      const file = e.target.files[0];
      if (!file) return;
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }}
  />

  {loading && (
    <p className="admin-progress">
      {progress < 80
        ? `Uploading image… ${progress}%`
        : progress < 100
        ? "Saving release…"
        : "Completed"}
    </p>
  )}

  <button disabled={loading}>
    {loading ? "Processing…" : "Add Release"}
  </button>
</form>
    </section>
  );
}