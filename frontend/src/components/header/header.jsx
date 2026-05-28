import "./header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="main-header">
      <Link to="/" className="logo">NegTeg</Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>

      <nav className="auth-links">
        {user ? (
          <>
            <Link to="/addart">Add Art</Link>
            <Link to="/profile" className="profile-avatar">
              {user.username[0].toUpperCase()}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
