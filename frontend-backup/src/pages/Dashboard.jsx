import { useState, useEffect } from "react";
import { getSpaces } from "../api/api";
import SpaceCard from "../components/SpaceCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import bgImage from "/src/assets/téléchargement.jpg";

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
    <div style={{ background: "#F5F1ED", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#FAFAF8",
        borderLeft: "1px solid #E8DCC8",
        borderRight: "1px solid #E8DCC8",
        minHeight: "100vh",
      }}>

        {/* HERO */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "60vh",
          gap: "15px",
          padding: "40px 30px",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0",
          position: "relative",
        }}>

          <h1 style={{ fontSize: "5rem", margin: 0, marginBottom: "25px", fontWeight: 700, color: "#2C2C2C", textShadow: "1px 1px 3px rgba(255,255,255,0.3)" }}>
            CoWork Flex
          </h1>

          <p style={{ color: "#3C3C3C", fontSize: "20px", marginTop: "10px" }}>
            Trouvez et réservez votre espace de travail idéal.
          </p>

          <div style={{ marginTop: "25px", width: "70%", display: "flex", justifyContent: "center", }}>
            <SearchBar
              city={city}
              setCity={setCity}
              capacity={capacity}
              setCapacity={setCapacity}
              onSearch={fetchSpaces}
            />
          </div>
        </div>

        {/* LIGNE SÉPARATRICE */}
        <div style={{ height: "1px", background: "#E8DCC8", width: "100%" }} />

        {/* DEUX CARTES STYLE VITE */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid #E8DCC8",
        }}>
          {/* Carte 1 — Espaces */}
          <div style={{ padding: "27px", borderRight: "1px solid #E8DCC8" }}>
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
              📄
            </div>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>Espaces disponibles</h2>
            <p style={{ color: "#666", fontSize: "0.95rem", margin: "0 0 20px 0" }}>
              Parcourez tous nos espaces de coworking et trouvez celui qui correspond à vos besoins.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
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
                Explorer
              </button>
            </div>
          </div>

          {/* Carte 2 — Mon compte */}
          <div style={{ padding: "27px" }}>
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
              👥
            </div>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>Mon compte</h2>
            <p style={{ color: "#666", fontSize: "0.95rem", margin: "0 0 20px 0" }}>
              Consultez vos réservations en cours et gérez vos espaces réservés.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/profile")}
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
                Mes réservations
              </button>
            </div>
          </div>
        </div>

        {/* LIGNE SÉPARATRICE */}
        <div style={{ height: "1px", background: "#E8DCC8", width: "100%" }} />

        {/* GRILLE DES ESPACES */}
        <div style={{ padding: "40px 30px" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>
            Tous les espaces
          </h2>
          {loading ? (
            <Loader />
          ) : spaces.length === 0 ? (
            <p style={{ color: "#999" }}>Aucun espace trouvé.</p>
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

      </div>
    </div>
  );
}

export default Dashboard;
