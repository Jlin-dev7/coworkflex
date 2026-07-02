import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDesks } from "../api/api";
import ReservationModal from "../components/ReservationModal";
import Loader from "../components/Loader";

function SpaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [desks, setDesks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDesks = async () => {
    setLoading(true);
    try {
      const res = await getDesks(id);
      setDesks(res.data);
    } catch (err) {
      console.error("Erreur chargement postes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesks();
  }, [id]);

  const handleSuccess = () => {
    setSuccessMsg("Réservation effectuée avec succès !");
    setTimeout(() => setSuccessMsg(""), 3000);
    fetchDesks();
  };

  const getTypeLabel = (type) => {
    const labels = {
      OPEN_SPACE: "🖥️ Open Space",
      MEETING_ROOM: "🤝 Salle de Réunion",
      PRIVATE_OFFICE: "🔒 Bureau Privé",
    };
    return labels[type] || type;
  };

  return (
    <div style={{ background: "#F5F1ED", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#FAFAF8",
        borderLeft: "1px solid #E8DCC8",
        borderRight: "1px solid #E8DCC8",
        minHeight: "100vh",
      }}>

        {/* HEADER */}
        <div style={{
          padding: "20px 30px",
          borderBottom: "1px solid #E8DCC8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#8B7355" }}>CoWork-Flex</h1>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "1px solid #E8DCC8",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              color: "#8B7355",
              fontWeight: 500
            }}
          >
            ← Retour aux espaces
          </button>
        </div>

        {/* TITRE */}
        <div style={{ padding: "40px 30px 20px 30px", borderBottom: "1px solid #E8DCC8" }}>
          <div style={{
            width: 50, height: 50,
            background: "#F0E6D8",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            marginBottom: "16px"
          }}>
            🖥️
          </div>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "2rem" }}>Postes disponibles</h2>
          <p style={{ color: "#666", margin: 0 }}>Sélectionnez un poste pour le réserver</p>

          {successMsg && (
            <div style={{
              marginTop: "16px",
              background: "#E8DCC8",
              border: "1px solid #C9A877",
              color: "#5A4A3A",
              padding: "12px 16px",
              borderRadius: "8px",
              fontWeight: 500
            }}>
              ✅ {successMsg}
            </div>
          )}
        </div>

        {/* GRILLE DES POSTES */}
        <div style={{ padding: "30px" }}>
          {loading ? (
            <Loader />
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem"
            }}>
              {desks.map((desk) => (
                <div
                  key={desk.id}
                  style={{
                    border: "1px solid #E8DCC8",
                    borderRadius: "12px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: "#FAFAF8",
                    transition: "box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,119,0.2)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{desk.label}</h3>
                  <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>{getTypeLabel(desk.type)}</p>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: desk.available ? "#E8DCC8" : "#E8D7C3",
                    color: desk.available ? "#5A4A3A" : "#6B5344",
                    border: `1px solid ${desk.available ? "#C9A877" : "#D4A574"}`,
                    width: "fit-content"
                  }}>
                    {desk.available ? "✅ Disponible" : "❌ Indisponible"}
                  </span>
                  <button
                    onClick={() => setSelectedDesk(desk)}
                    disabled={!desk.available}
                    style={{
                      marginTop: "auto",
                      padding: "10px 18px",
                      border: "1px solid #D4C4B0",
                      borderRadius: "12px",
                      background: desk.available ? "linear-gradient(135deg, #C9A877, #8B7355)" : "#E8DCC8",
                      color: desk.available ? "white" : "#999",
                      cursor: desk.available ? "pointer" : "not-allowed",
                      fontWeight: 500,
                      fontSize: "0.9rem"
                    }}
                  >
                    Réserver ce poste
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedDesk && (
        <ReservationModal
          desk={selectedDesk}
          spaceId={id}
          onClose={() => setSelectedDesk(null)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

export default SpaceDetail;
