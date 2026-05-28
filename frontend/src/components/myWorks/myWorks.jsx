import MiniArtCard from "../miniArtCard/miniArtCard";

export default function MyWorks({ arts, loading }) {
  if (loading) return <p className="profile-empty">Loading...</p>;

  if (arts.length === 0)
    return (
      <p className="profile-empty">No artworks yet. Add your first piece!</p>
    );

  return (
    <div className="profile-grid">
      {arts.map((art) => (
        <MiniArtCard key={art._id} {...art} />
      ))}
    </div>
  );
}
