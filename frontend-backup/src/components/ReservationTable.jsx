import { cancelReservation } from "../api/api";

function ReservationTable({ reservations, onCancelled }) {
  const handleCancel = async (id) => {
    if (!window.confirm("Confirmer l'annulation ?")) return;
    try {
      await cancelReservation(id);
      onCancelled();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de l'annulation");
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Aucune réservation trouvée.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", fontSize: "0.875rem", textAlign: "left" }}>
        <thead style={{ background: "#F0E6D8", color: "#8B7355", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 600 }}>
          <tr>
            <th style={{ padding: "0.75rem 1rem", borderTopLeftRadius: "8px" }}>Espace</th>
            <th style={{ padding: "0.75rem 1rem" }}>Poste</th>
            <th style={{ padding: "0.75rem 1rem" }}>Début</th>
            <th style={{ padding: "0.75rem 1rem" }}>Fin</th>
            <th style={{ padding: "0.75rem 1rem" }}>Statut</th>
            <th style={{ padding: "0.75rem 1rem", borderTopRightRadius: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} style={{ borderBottom: "1px solid #E8DCC8" }} 
              onMouseEnter={(e) => e.currentTarget.style.background = "#F5F1ED"} 
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "0.75rem 1rem", fontWeight: 500, color: "#213547" }}>{r.spaceName}</td>
              <td style={{ padding: "0.75rem 1rem", color: "#666" }}>{r.deskLabel}</td>
              <td style={{ padding: "0.75rem 1rem", color: "#666" }}>
                {new Date(r.startDate).toLocaleString("fr-FR")}
              </td>
              <td style={{ padding: "0.75rem 1rem", color: "#666" }}>
                {new Date(r.endDate).toLocaleString("fr-FR")}
              </td>
              <td style={{ padding: "0.75rem 1rem" }}>
                <span style={{
                  padding: "0.25rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  display: "inline-block",
                  background: r.status === "ACTIVE" ? "#E8DCC8" : "#E8D7C3",
                  color: r.status === "ACTIVE" ? "#5A4A3A" : "#6B5344"
                }}>
                  {r.status === "ACTIVE" ? "Active" : "Annulée"}
                </span>
              </td>
              <td style={{ padding: "0.75rem 1rem" }}>
                {r.status === "ACTIVE" && (
                  <button
                    onClick={() => handleCancel(r.id)}
                    style={{
                      background: "#D4A574",
                      color: "white",
                      fontSize: "0.75rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#C9A877"}
                    onMouseLeave={(e) => e.target.style.background = "#D4A574"}
                  >
                    Annuler
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;
