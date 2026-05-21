import { Link } from "react-router-dom";
import MiniArtCard from "../miniArtCard/miniArtCard.jsx";
import "./newArrivals.css";
import { useEffect, useState } from "react";
import { instance } from "../../client/instance.js";

export default function NewArrivals() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    instance
      .get("/arts")
      .then((res) => {
        setArts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newArts = [...arts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="home-section">
      <header className="section-header">
        <hgroup>
          <p className="section-label">Recently Added</p>
          <h2 className="section-title">New Arrivals</h2>
        </hgroup>
        <Link to="/gallery" className="see-all">
          See All
        </Link>
      </header>
      <ul className="arrivals-grid">
        {newArts.map((art) => (
          <li key={art._id}>
            <MiniArtCard {...art} />
          </li>
        ))}
      </ul>
    </section>
  );
}
