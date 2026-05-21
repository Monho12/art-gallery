import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer">
      <small className="footer-left">
        &copy; 2026 NegTeg. All rights reserved.
      </small>
      <nav className="footer-right">
        <Link to="/terms">Terms</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/newsletter">News Letter</Link>
      </nav>
    </footer>
  );
}
