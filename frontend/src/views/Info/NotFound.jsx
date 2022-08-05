import React from "react";

const container = {
  display: "flex",
  width: "max(70%, 500px)",
  height: "400px",
  backgroundColor: "#ADB5BD",
  margin: "auto",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px 100px",
  boxShadow: "0 5px 20px #495057",
};

const flex = {
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
};

const p = {
  color: "#ADB5BD",
  fontSize: "2rem",
  textAlign: "center",
  borderRadius: "10px",
  padding: "0 5px",
  boxShadow: "0 0 4px #343A40",
  backgroundColor: "#212529",
  userSelect: "none",
};

const NotFound = () => {
  return (
    <div style={flex}>
      <div style={container}>
        <p style={p}>RUTA NO ENCONTRADA</p>
      </div>
    </div>
  );
};

export default NotFound;
