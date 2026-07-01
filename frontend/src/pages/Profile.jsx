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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CoWork-Flex</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:text-blue-700 text-sm transition"
        >
          ← Retour au Dashboard
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">ID : {user.id}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Mes Réservations
          </h3>
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