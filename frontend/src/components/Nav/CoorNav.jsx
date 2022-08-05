import React from "react";
import { useHistory } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const CoorNav = () => {
  const history = useHistory();
  const [handleLogout] = useLogout();

  return (
    <nav className="sticky">
      <div className="nav_container">
        <div className="nav_links">
          <button onClick={() => history.push("/generacion-lote")}>
            LOTES
          </button>
          <button onClick={() => history.push("/reportes-lote")}>
            INFORMES
          </button>
        </div>
        <div className="nav_title">TRAZAPAN</div>
        <div className="nav_links end">
          <button onClick={handleLogout}>SALIR</button>
        </div>
      </div>
    </nav>
  );
};

export default CoorNav;
