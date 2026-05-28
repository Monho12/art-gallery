import { useEffect, useState } from "react";
import { instance } from "../../client/instance";
import MiniArtCard from "../miniArtCard/miniArtCard";

export default function SavedWorks() {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get("/saved")
      .then((res) => setArts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="profile-empty">Loading...</p>;

  if (arts.length === 0)
    return <p className="profile-empty">No saved artworks yet.</p>;

  return (
    <div className="profile-grid">
      {arts.map((art) => (
        <MiniArtCard key={art._id} {...art} />
      ))}
    </div>
  );
}
