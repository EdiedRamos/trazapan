import React from "react";
import { useHistory } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const AdminNav = () => {
  const history = useHistory();
  const [handleLogout] = useLogout();

  return (
    <nav>
      <div className="nav_container">
        <div className="nav_links">
          <button
            className={
              history.location.pathname === "/empleado-opciones"
                ? "current_link"
                : ""
            }
            onClick={() => history.push("/empleado-opciones")}
          >
            EMPLEADOS
          </button>
          <button
            className={
              history.location.pathname === "/empleado-registro"
                ? "current_link"
                : ""
            }
            onClick={() => history.push("/empleado-registro")}
          >
            REGISTRAR
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

export default AdminNav;
