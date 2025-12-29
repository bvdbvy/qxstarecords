import React, { useState } from "react";
import { getSubmissions, saveSubmissions } from "../data/submissions";
import { uploadFile } from "../utils/cloudinaryUploadFile";

export default function Press() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const file = form.file.files[0];

    let uploadedFile = null;

    if (file) {
      uploadedFile = await uploadFile(file);
    }

    const submission = {
      id: Date.now(),
      name: form.artist_name.value,
      email: form.email.value,
      links: form.links.value,
      message: form.message.value,
      file: uploadedFile,
      date: new Date().toLocaleString(),
    };

    const submissions = getSubmissions();
    submissions.unshift(submission);
    saveSubmissions(submissions);

    form.reset();
    setStatus("Submission sent successfully");
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

        <button type="submit">Submit</button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}
