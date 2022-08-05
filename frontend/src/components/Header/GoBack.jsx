import { useGoBack } from "../../hooks/useGoBack";

export const GoBack = ({ path }) => {
  const { goBack } = useGoBack();
  return (
    <header className="sticky nav_container">
      <div className="nav_links start">
        <div className="nav_title">TRAZAPAN</div>
      </div>
      <div className="nav_links end">
        <button m={2} onClick={() => goBack(path)} className="button_1">
          VOLVER
        </button>
      </div>
    </header>
  );
};
