import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../client/instance";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await instance.post("/login", { email, password });
      login(data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
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

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
