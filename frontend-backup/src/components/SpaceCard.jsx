import { useNavigate } from "react-router-dom";

function SpaceCard({ space, isLast }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/spaces/${space.id}`)}
      style={{
        width: "100%",
        padding: "1rem 1.5rem",
        cursor: "pointer",
        transition: "background 0.2s",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "flex-start",
        borderBottom: isLast ? "none" : "1px solid #E8DCC8",
        background: "#FAFAF8",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#F0E6D8"}
      onMouseLeave={(e) => e.currentTarget.style.background = "#FAFAF8"}
    >
      <img
        src={space.imageUrl}
        alt={space.name}
        style={{ width: "180px", height: "120px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"}
      />
      <div style={{ flex: "1 1 0", minWidth: "220px", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#213547", margin: 0 }}>{space.name}</h2>
          <span style={{
            background: "rgba(201,168,119,0.1)",
            color: "#8B7355",
            padding: "0.35rem 0.85rem",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: "600"
          }}>
            👥 {space.capacity} places
          </span>
        </div>
        <p style={{ color: "#888", fontSize: "0.95rem", margin: 0 }}>📍 {space.city} — {space.address}</p>
        <p style={{ color: "#555", fontSize: "0.95rem", margin: 0 }}>{space.description}</p>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/spaces/${space.id}`); }}
          style={{
            alignSelf: "flex-start",
            background: "transparent",
            color: "#8B7355",
            border: "1px solid #8B7355",
            padding: "0.55rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.9rem"
          }}
        >
          Voir les postes →
        </button>
      </div>
    </div>
  );
}

export default SpaceCard;
