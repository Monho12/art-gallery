import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../../client/instance";
import MiniArtCard from "../../components/miniArtCard/miniArtCard";
import "./artistProfile.css";

export default function ArtistProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [arts, setArts] = useState([]);
  const [artistName, setArtistName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get(`/arts/user/${userId}`)
      .then((res) => {
        setArts(res.data);
        if (res.data.length > 0) setArtistName(res.data[0].artist);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <main className="artist-page">
      <button className="artist-back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="artist-hero">
        <div className="artist-avatar">
          {artistName ? artistName[0].toUpperCase() : "?"}
        </div>
        <div className="artist-info">
          <h1 className="artist-name">{loading ? "—" : (artistName || "Unknown Artist")}</h1>
          <p className="artist-count">
            {loading ? "—" : arts.length} artwork{arts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="artist-divider" />

      {loading ? (
        <p className="artist-loading">Loading artworks...</p>
      ) : arts.length === 0 ? (
        <p className="artist-empty">No artworks yet.</p>
      ) : (
        <div className="artist-grid">
          {arts.map((art) => (
            <MiniArtCard key={art._id} {...art} />
          ))}
        </div>
      )}
    </main>
  );
}
