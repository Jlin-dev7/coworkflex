function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
      <div style={{
        animation: "spin 1s linear infinite",
        borderRadius: "50%",
        height: "48px",
        width: "48px",
        border: "4px solid #E8DCC8",
        borderTop: "4px solid #8B7355"
      }}></div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
