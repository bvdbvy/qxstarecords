import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addArtist } from "../data/artists";
import { uploadImage } from "../utils/cloudinaryUpload";

export default function AdminAddArtist() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // SAFETY REDIRECT (after refresh)
  useEffect(() => {
    if (sessionStorage.getItem("artistUploadDone")) {
      navigate("/admin/artists", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile) return alert("Please upload artist image");

    try {
      setLoading(true);
      setProgress(0);

      // A. IMAGE UPLOAD (0–80)
      const image = await uploadImage(imageFile, setProgress);

      // B.  SAVE (80–100)
      setProgress(85);

await addArtist({
  name,
  genre,
  image: image.url,
  image_public_id: image.public_id,
  created_at: new Date().toISOString(),
});

      setProgress(100);
      sessionStorage.setItem("artistUploadDone", "true");

      navigate("/admin/artists", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Failed to add artist");
    } finally {
      setLoading(false);
      sessionStorage.removeItem("artistUploadDone");
    }
  }

  return (
    <section className="admin-section">
      <h2>Add Artist</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Artist name"
          required
        />

        <input
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />

        <div className="admin-image-preview">
          {preview ? <img src={preview} alt="Preview" /> : <span>No image</span>}
        </div>

        <input
          type="file"
          accept="image/*"
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
              ? "Saving artist…"
              : "Completed"}
          </p>
        )}

        <button disabled={loading}>
          {loading ? "Processing…" : "Add Artist"}
        </button>
      </form>
    </section>
  );
}