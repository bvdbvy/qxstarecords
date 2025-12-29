import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        QXSTA
      </Link>

      <div className="nav-links">
        <Link to="/artists">Artists</Link>
        <Link to="/releases">Releases</Link>
        <Link to="/press">Press</Link>
      </div>
    </nav>
  );
}
<img 
  src="/logo.jpeg" 
  alt="QXSTA Records" 
  className="logo"
/>
