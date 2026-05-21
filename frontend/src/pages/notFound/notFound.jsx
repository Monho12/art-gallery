import { Link } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-title">Page not found</p>
      <Link to="/" className="notfound-btn">
        Back to home
      </Link>
    </main>
  );
}
