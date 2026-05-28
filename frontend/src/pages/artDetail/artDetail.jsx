import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./artDetail.css";
import ArtCard from "../../components/artCard/artCard";
import { instance } from "../../client/instance";

export default function ArtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);

  useEffect(() => {
    instance
      .get(`/art/${id}`)
      .then((res) => {
        setArt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!art) {
    return (
      <main className="loadin-container">
        <p>Loading artwork...</p>
      </main>
    );
  }

  return (
    <main className="main-containerDetail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <ArtCard
        title={art.title}
        artist={art.artist}
        description={art.description}
        image={art.image}
        medium={art.medium}
        dimensions={art.dimensions}
        year={art.year}
        genre={art.genre}
        _id={art._id}
        userId={art.userId}
      />
    </main>
  );
}
