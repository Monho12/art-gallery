import { Link } from "react-router-dom";
import "./miniArtCard.css";

export default function MiniArtCard({ title, year, image, _id }) {
  return (
    <Link to={`/art/${_id}`} className="card">
      <img className="miniImg" src={image} alt={title} />

      <footer className="card-info">
        <p className="date">{year}</p>
        <h2 className="title">{title}</h2>
      </footer>
    </Link>
  );
}
