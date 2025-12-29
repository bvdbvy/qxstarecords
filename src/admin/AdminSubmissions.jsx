import React, { useState } from "react";
import { getSubmissions, saveSubmissions } from "../data/submissions";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState(getSubmissions());

  function deleteSubmission(id) {
    const updated = submissions.filter(s => s.id !== id);
    setSubmissions(updated);
    saveSubmissions(updated);
  }

  return (
    <section className="admin-section">
      <h2>Submissions</h2>

      {submissions.length === 0 && <p>No submissions yet.</p>}

      {submissions.map(sub => (
        <div key={sub.id} className="submission-card">
          <h3>{sub.name}</h3>
          <p><strong>Email:</strong> {sub.email}</p>
          <p><strong>Links:</strong> {sub.links}</p>
          <p>{sub.message}</p>
          <small>{sub.date}</small>

          {sub.file?.resource_type === "image" && (
            <img src={sub.file.url} alt="Submission" />
          )}

          {sub.file?.resource_type === "video" && (
            <audio controls src={sub.file.url} />
          )}

          {sub.file && (
            <a
              href={sub.file.url}
              target="_blank"
              rel="noreferrer"
              className="admin-btn"
            >
              Download File
            </a>
          )}

          <button
            className="admin-btn danger"
            onClick={() => deleteSubmission(sub.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}
