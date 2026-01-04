import React, { useEffect, useState } from "react";
import { getSubmissions, deleteSubmission } from "../data/submissions";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getSubmissions();
      setSubmissions(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleDelete(id) {
    await deleteSubmission(id);
    setSubmissions(prev => prev.filter(s => s.id !== id));
  }

  if (loading) return <p className="admin-section">Loading...</p>;

  return (
    <section className="admin-section">
      <h2>Submissions</h2>

      {submissions.length === 0 && <p>No submissions yet.</p>}

      {submissions.map(sub => (
        <div key={sub.id} className="submission-card">
          <h3>{sub.name}</h3>
          <p>{sub.email}</p>
          <p>{sub.links}</p>
          <p>{sub.message}</p>
          <small>{new Date(sub.created_at).toLocaleString()}</small>

          {sub.file?.url && (
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
            onClick={() => handleDelete(sub.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}