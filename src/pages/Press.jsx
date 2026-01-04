import React, { useState } from "react";
import { addSubmission } from "../data/submissions";
import { uploadFile } from "../utils/cloudinaryUploadFile";

export default function Press() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("Uploading...");

    const form = e.target;
    const file = form.file.files[0];

    try {
      let uploadedFile = null;

      if (file) {
        uploadedFile = await uploadFile(file);
      }

      await addSubmission({
        name: form.artist_name.value,
        email: form.email.value,
        links: form.links.value,
        message: form.message.value,
        file: uploadedFile,
        created_at: new Date().toISOString()
      });

      form.reset();
      setStatus("Submission sent successfully");
    } catch (err) {
      console.error(err);
      setStatus("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page press-page">
      <div className="page-header">
        <h1>Submissions</h1>
        <p>Send your music to QXSTA Records</p>
      </div>

      <form className="press-form" onSubmit={handleSubmit}>
        <input name="artist_name" placeholder="Artist name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="links" placeholder="Streaming / Drive link" required />
        <textarea name="message" placeholder="Message" />
        <input type="file" name="file" />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}