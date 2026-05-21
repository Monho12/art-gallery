import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../client/instance";
import "./artCard.css";
import toast from "react-hot-toast";

export default function ArtCard({
  title,
  artist,
  description,
  image,
  _id,
  dimensions,
  medium,
  year,
  genre,
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title,
    artist,
    description,
    medium,
    dimensions,
    year,
    genre,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete() {
    if (!window.confirm("Delete this artwork permanently?")) return;
    try {
      await instance.delete(`/art/${_id}`);
      toast.success("Artwork deleted");
      navigate("/");
    } catch (err) {
      toast.error("Delete failed");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await instance.put(`/art/${_id}`, form);
      toast.success("Artwork updated");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      toast.error("Update failed");
    }
  }

  if (isEditing) {
    return (
      <article className="art-card" id={_id}>
        <img src={image} alt={form.title} className="img" />
        <div className="art-info">
          <h5>Edit Artwork</h5>
          <form className="edit-form" onSubmit={handleUpdate}>
            <label className="edit-label">
              Title
              <input
                className="edit-input"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
              />
            </label>
            <label className="edit-label">
              Artist
              <input
                className="edit-input"
                name="artist"
                value={form.artist || ""}
                onChange={handleChange}
              />
            </label>
            <label className="edit-label">
              Description
              <textarea
                className="edit-textarea"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
              />
            </label>
            <label className="edit-label">
              Medium
              <input
                className="edit-input"
                name="medium"
                value={form.medium || ""}
                onChange={handleChange}
              />
            </label>
            <label className="edit-label">
              Dimensions
              <input
                className="edit-input"
                name="dimensions"
                value={form.dimensions || ""}
                onChange={handleChange}
              />
            </label>
            <footer className="art-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </article>
    );
  }

  return (
    <article className="art-card" id={_id}>
      <img src={image} alt={title} className="img" />

      <div className="art-info">
        <h5>Current Exhibition</h5>
        <h1 className="art-title">{title}</h1>
        <h4 className="art-artist">{artist}</h4>
        <p className="art-description">{description}</p>

        <dl className="art-details">
          <div className="art-detail">
            <dt className="detail-label">Medium</dt>
            <dd className="detail-value">{medium}</dd>
          </div>
          <div className="art-detail">
            <dt className="detail-label">Dimensions</dt>
            <dd className="detail-value">{dimensions}</dd>
          </div>
        </dl>

        <footer className="art-buttons">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </footer>
      </div>
    </article>
  );
}
