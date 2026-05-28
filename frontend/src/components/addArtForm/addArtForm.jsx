import "./addArtForm.css";
import { useRef, useState } from "react";
import { instance } from "../../client/instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AddArtForm() {
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setPreview(null);
    setImageFile(null);
    fileRef.current.value = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating artwork, please wait...");
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const { data } = await instance.post("/upload", formData);
        imageUrl = data.url;
      }

      await instance.post("/arts", {
        title,
        description: desc,
        image: imageUrl,
        artist: user.username,
        userId: user._id,
        year,
        medium,
        dimensions,
        genre,
      });
      toast.success("Art added successfully!", { id: toastId });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="addart-page">
      <h1 className="addart-title">Add artwork</h1>
      <p className="addart-sub">Share your latest piece with the community</p>

      <p className="label">Upload image</p>
      {!preview ? (
        <div
          className="upload-zone"
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <p className="upload-icon">+</p>
          <p className="upload-text">Drop your image here</p>
          <p className="upload-sub">PNG, JPG, WEBP — up to 20MB</p>
          <span className="upload-btn">Browse files</span>
        </div>
      ) : (
        <div className="preview-wrap">
          <img src={preview} alt="preview" className="preview-img" />
          <button className="preview-remove" onClick={removeImage}>
            ✕
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileRef}
        onChange={handleFile}
        accept="image/*"
        hidden
      />

      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Artist</label>
          <input type="text" value={user?.username || ""} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Name your artwork"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              placeholder="2026"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select genre</option>
              <option>Realism</option>
              <option>Digital</option>
              <option>Impressionism</option>
              <option>Surrealism</option>
              <option>Abstract</option>
              <option>Symbolism</option>
              <option>Romanticism</option>
              <option>Contemporary</option>
              <option>Photography</option>
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="medium">Medium</label>
            <input
              id="medium"
              type="text"
              placeholder="e.g. Oil on canvas"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dimensions">Dimensions</label>
            <input
              id="dimensions"
              type="text"
              placeholder="e.g. 73 × 92 cm"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            placeholder="Tell the story behind this piece..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            maxLength={500}
          />
          <p className="char-count">{desc.length} / 500</p>
        </div>

        <div className="actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Creating, please wait..." : "Publish artwork"}
          </button>
        </div>
      </form>
    </main>
  );
}
