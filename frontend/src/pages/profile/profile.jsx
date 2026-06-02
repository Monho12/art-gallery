import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { instance } from "../../client/instance";
import { useNavigate, Link } from "react-router-dom";
import MyWorks from "../../components/myWorks/myWorks";
import SavedWorks from "../../components/savedWorks/savedWorks";
import "./profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("works");
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    instance
      .get(`/arts/user/${user._id}`)
      .then((res) => setArts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, navigate]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  if (!user) return null;

  return (
    <main className="profile-page">
      <div className="profile-hero">
        <div className="profile-hero-avatar">
          {user.username[0].toUpperCase()}
        </div>
        <div className="profile-hero-info">
          <h1 className="profile-hero-name">{user.username}</h1>
          <p className="profile-hero-email">{user.email}</p>
          <p className="profile-hero-count">
            {loading ? "—" : arts.length} artwork{arts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="profile-hero-actions">
          <Link to="/addart" className="profile-hero-addArt">
            Add Art
          </Link>
          <button className="profile-hero-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="profile-divider" />

      <div className="profile-tabs">
        <button
          className={`profile-tab${tab === "works" ? " active" : ""}`}
          onClick={() => setTab("works")}
        >
          My Works
        </button>
        <button
          className={`profile-tab${tab === "saved" ? " active" : ""}`}
          onClick={() => setTab("saved")}
        >
          Saved
        </button>
      </div>

      {tab === "works" && <MyWorks arts={arts} loading={loading} />}
      {tab === "saved" && <SavedWorks />}
    </main>
  );
}
