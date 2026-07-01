import { useNavigate } from "react-router-dom";

function SpaceCard({ space }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/spaces/${space.id}`)}
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "1.5rem",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(100,108,255,0.15)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      <img
        src={space.imageUrl}
        alt={space.name}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#213547" }}>{space.name}</h2>
        <span style={{
          background: "rgba(100,108,255,0.1)",
          color: "#646cff",
          padding: "0.3rem 0.8rem",
          borderRadius: "20px",
          fontSize: "0.8rem",
          fontWeight: "600"
        }}>
          👥 {space.capacity} places
        </span>
      </div>
      <p style={{ color: "#888", fontSize: "0.9rem" }}>📍 {space.city} — {space.address}</p>
      <p style={{ color: "#555", fontSize: "0.9rem" }}>{space.description}</p>
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/spaces/${space.id}`); }}
        style={{
          marginTop: "auto",
          background: "linear-gradient(135deg, #646cff, #a855f7)",
          color: "white",
          border: "none",
          padding: "0.6rem 1rem",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.9rem",
          width: "100%"
        }}
      >
        Voir les postes →
      </button>
    </div>
  );
}

export default SpaceCard;