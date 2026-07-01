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
        startDate: new Date(startDate).toISOString().slice(0, 19),
        endDate: new Date(endDate).toISOString().slice(0, 19),
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Réserver un poste</h2>
        <p className="text-gray-500 text-sm mb-4">
          {desk.label} — {desk.type.replace("_", " ")}
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de début
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de fin
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "En cours..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;