import { useState, useEffect } from "react";
import { instance } from "../../client/instance";
import MiniArtCard from "../../components/miniArtCard/miniArtCard";
import "./gallery.css";

const GENRES = [
  "All",
  "Digital",
  "Realism",
  "Impressionism",
  "Surrealism",
  "Abstract",
  "Symbolism",
  "Romanticism",
  "Contemporary",
  "Photography",
];

export default function Gallery() {
  const [arts, setArts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    instance
      .get("/arts")
      .then((res) => setArts(res.data))
      .catch(console.error);
  }, []);

  const filtered = arts.filter((art) => {
    const matchesGenre = activeGenre === "All" || art.genre === activeGenre;
    const matchesSearch = art.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <h1 className="gallery-title">Gallery</h1>
        <p className="gallery-sub">{filtered.length} works</p>
      </header>

      <div className="gallery-controls">
        <input
          className="gallery-search"
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="gallery-tabs">
          {GENRES.map((g) => (
            <button
              key={g}
              className={`gallery-tab ${activeGenre === g ? "active" : ""}`}
              onClick={() => setActiveGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">No artworks found.</p>
      ) : (
        <div className="gallery-grid">
          {filtered.map((art) => (
            <MiniArtCard key={art._id} {...art} />
          ))}
        </div>
      )}
    </main>
  );
}
