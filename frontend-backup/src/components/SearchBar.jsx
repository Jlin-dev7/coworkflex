function SearchBar({ city, setCity, capacity, setCapacity, onSearch }) {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Filtrer par ville..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "0.6rem 1rem",
          fontSize: "0.95rem",
          outline: "none",
          width: "200px",
          background: "white"
        }}
      />
      <input
        type="number"
        placeholder="Capacité min..."
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "0.6rem 1rem",
          fontSize: "0.95rem",
          outline: "none",
          width: "200px",
          background: "white"
        }}
      />
      <button
        onClick={onSearch}
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
        Rechercher
      </button>
    </div>
  );
}

export default SearchBar;