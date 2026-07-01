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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CoWork-Flex</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:text-blue-700 text-sm transition"
        >
          ← Retour aux espaces
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Postes disponibles
        </h2>
        <p className="text-gray-500 mb-6">
          Sélectionnez un poste pour le réserver
        </p>

        {successMsg && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 font-medium">
            ✅ {successMsg}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {desks.map((desk) => (
              <div
                key={desk.id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{desk.label}</h3>
                  <p className="text-gray-500 text-sm mt-1">{getTypeLabel(desk.type)}</p>
                  <span className={`inline-block mt-3 text-xs px-3 py-1 rounded-full font-medium ${
                    desk.available
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {desk.available ? "✅ Disponible" : "❌ Indisponible"}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDesk(desk)}
                  disabled={!desk.available}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Réserver ce poste
                </button>
              </div>
            ))}
          </div>
        )}
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