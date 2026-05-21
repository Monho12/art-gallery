import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <img
          className="auth-left-bg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/960px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg"
          alt=""
        />
        <div className="auth-left-overlay" />
        <div className="auth-left-content">
          <p className="auth-left-label">Artgal — The Gallery</p>
          <h1 className="auth-left-title">Where Art Finds Its Audience</h1>
          <p className="auth-left-sub">
            Discover curated works from emerging and established artists around
            the world.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <p className="auth-form-label">Welcome back</p>
          <h2 className="auth-form-title">Sign In</h2>

          <form>
            <div className="auth-field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <Link to="/">
              <button type="submit" className="auth-submit">
                Continue
              </button>
            </Link>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
