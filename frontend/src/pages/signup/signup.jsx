import "./signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../client/instance";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await instance.post("/register", { username, email, password });
      login(data);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

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

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-divider" />

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
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
