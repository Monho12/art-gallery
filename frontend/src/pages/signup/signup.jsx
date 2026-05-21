import "./signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
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
          <p className="auth-left-label">Artgal — Join Us</p>
          <h1 className="auth-left-title">Begin Your Collection</h1>
          <p className="auth-left-sub">
            Create an account to save favourites, follow artists, and explore
            curated exhibitions.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <p className="auth-form-label">New member</p>
          <h2 className="auth-form-title">Create Account</h2>

          <form>
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" />
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>

            <div className="auth-divider" />

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <div className="auth-field">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <button type="submit" className="auth-submit">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
