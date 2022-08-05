import React from "react";
import { useLogout } from "../../hooks/useLogout";

const ExitBar = () => {
  const [handleLogout] = useLogout();

  return (
    <header className="sticky nav_container">
      <div className="nav_links start">
        <div className="nav_title">TRAZAPAN</div>
      </div>
      <div className="nav_links end">
        <button m={2} onClick={handleLogout} className="button_1">
          SALIR
        </button>
      </div>
    </header>
  );
};

export default ExitBar;
