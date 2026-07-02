import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserReservations } from "../api/api";
import { useUser } from "../context/UserContext";
import ReservationTable from "../components/ReservationTable";
import Loader from "../components/Loader";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await getUserReservations(user.id);
      setReservations(res.data);
    } catch (err) {
      console.error("Erreur chargement réservations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
            ← Retour au Dashboard
          </button>
        </div>

        {/* PROFIL */}
        <div style={{
          padding: "40px 30px",
          borderBottom: "1px solid #E8DCC8",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>
          <div style={{
            width: 60, height: 60,
            background: "linear-gradient(135deg, #C9A877, #8B7355)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "white"
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>{user.name}</h2>
            <p style={{ margin: 0, color: "#888", fontSize: "0.9rem" }}>ID : {user.id}</p>
          </div>
        </div>

        {/* RÉSERVATIONS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid #E8DCC8",
        }}>
          <div style={{ padding: "40px", borderRight: "1px solid #E8DCC8" }}>
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
              📋
            </div>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>Mes Réservations</h2>
            <p style={{ color: "#666", fontSize: "0.95rem", margin: "0 0 20px 0" }}>
              Consultez et gérez toutes vos réservations en cours.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "10px 18px",
                  border: "1px solid #D4C4B0",
                  borderRadius: "12px",
                  background: "#E8DCC8",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  color: "#5A4A3A"
                }}
              >
                Nouvel espace
              </button>
            </div>
          </div>

          <div style={{ padding: "40px" }}>
            <div style={{
              width: 50, height: 50,
              background: "#E8D7C3",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: "16px"
            }}>
              📊
            </div>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>Statistiques</h2>
            <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>
              Total : <strong>{reservations.length}</strong> réservation(s)
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem", margin: "8px 0 0 0" }}>
              Actives : <strong style={{ color: "#16a34a" }}>
                {reservations.filter(r => r.status === "ACTIVE").length}
              </strong>
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem", margin: "8px 0 0 0" }}>
              Annulées : <strong style={{ color: "#dc2626" }}>
                {reservations.filter(r => r.status === "CANCELLED").length}
              </strong>
            </p>
          </div>
        </div>

        {/* LIGNE SÉPARATRICE */}
        <div style={{ height: "1px", background: "#E8DCC8", width: "100%" }} />

        {/* TABLEAU */}
        <div style={{ padding: "30px" }}>
          {loading ? (
            <Loader />
          ) : (
            <ReservationTable
              reservations={reservations}
              onCancelled={fetchReservations}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
