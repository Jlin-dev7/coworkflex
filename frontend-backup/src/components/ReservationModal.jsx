import { useState } from "react";
import { createReservation } from "../api/api";
import { useUser } from "../context/UserContext";

function ReservationModal({ desk, spaceId, onClose, onSuccess }) {
  const { user } = useUser();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setError("Veuillez remplir toutes les dates");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError("La date de début doit être avant la date de fin");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createReservation({
        deskId: desk.id,
        userId: user.id,
        startDate: startDate + ":00",
        endDate: endDate + ":00",
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "2rem",
        width: "100%",
        maxWidth: "450px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        border: "1px solid #ebebef"
      }}>
        <h2 style={{ margin: "0 0 4px 0", fontSize: "1.4rem", color: "#213547" }}>
          Réserver un poste
        </h2>
        <p style={{ color: "#888", fontSize: "0.9rem", margin: "0 0 1.5rem 0" }}>
          {desk.label} — {desk.type.replace("_", " ")}
        </p>

        {error && (
          <div style={{
            background: "#fff0f0",
            border: "1px solid #fca5a5",
            color: "#dc2626",
            padding: "10px 14px",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#444", marginBottom: "6px" }}>
            Date de début
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #ebebef",
              borderRadius: "8px",
              padding: "0.6rem 1rem",
              fontSize: "0.95rem",
              outline: "none",
              background: "white",
              color: "#213547",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#444", marginBottom: "6px" }}>
            Date de fin
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #ebebef",
              borderRadius: "8px",
              padding: "0.6rem 1rem",
              fontSize: "0.95rem",
              outline: "none",
              background: "white",
              color: "#213547",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              border: "1px solid #ebebef",
              borderRadius: "8px",
              background: "#fafafa",
              cursor: "pointer",
              fontWeight: 500,
              color: "#444"
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              border: "none",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #646cff, #a855f7)",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "En cours..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;