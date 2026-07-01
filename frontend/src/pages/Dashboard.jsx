import { useState, useEffect } from "react";
import { getSpaces } from "../api/api";
import SpaceCard from "../components/SpaceCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const res = await getSpaces(city, capacity);
      setSpaces(res.data);
    } catch (err) {
      console.error("Erreur chargement espaces", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
      {/* Header style Vite */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "4rem" }}>🏢</span>
      </div>

      <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        CoWork-Flex
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Trouvez et réservez votre espace de travail idéal
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <SearchBar
          city={city}
          setCity={setCity}
          capacity={capacity}
          setCapacity={setCapacity}
          onSearch={fetchSpaces}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "linear-gradient(135deg, #646cff, #a855f7)",
            color: "white",
            border: "none",
            padding: "0.6rem 1.4rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem"
          }}
        >
          Mes Réservations
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : spaces.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999" }}>Aucun espace trouvé.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem"
        }}>
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;