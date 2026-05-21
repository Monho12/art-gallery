import "./header.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="main-header">
      <Link to="/" className="logo">NegTeg</Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>

      <nav className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/addart">Add Art</Link>
      </nav>
    </header>
  );
}
