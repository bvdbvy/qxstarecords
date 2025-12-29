import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img
            src="/qxsta-logo.png"
            alt="QXSTA Records"
            className="logo"
          />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/artists" onClick={() => setOpen(false)}>
            Artists
          </Link>
          <Link to="/releases" onClick={() => setOpen(false)}>
            Releases
          </Link>
          <Link to="/press" onClick={() => setOpen(false)}>
            Press
          </Link>
        </div>
      </div>
    </nav>
  );
}