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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 rounded-tl-lg">Espace</th>
            <th className="px-4 py-3">Poste</th>
            <th className="px-4 py-3">Début</th>
            <th className="px-4 py-3">Fin</th>
            <th className="px-4 py-3">Statut</th>
            <th className="px-4 py-3 rounded-tr-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{r.spaceName}</td>
              <td className="px-4 py-3 text-gray-600">{r.deskLabel}</td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(r.startDate).toLocaleString("fr-FR")}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(r.endDate).toLocaleString("fr-FR")}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  r.status === "ACTIVE"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {r.status === "ACTIVE" ? "Active" : "Annulée"}
                </span>
              </td>
              <td className="px-4 py-3">
                {r.status === "ACTIVE" && (
                  <button
                    onClick={() => handleCancel(r.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition"
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