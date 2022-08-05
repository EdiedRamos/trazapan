import { useHistory } from "react-router-dom";
import axios from "axios";
import { base } from "../utils/axiosBase";

export const useRedirect = () => {
  const history = useHistory();

  const redirect = (cargo) => {
    switch (cargo) {
      case "administrador":
        history.push("/empleado-opciones");
        break;
      case "operativo":
        history.push("/usuario-operativo");
        break;
      case "coordinador":
        history.push("/generacion-lote");
        break;
      default:
        history.push("/login");
        break;
    }
  };

  const redirectAXIOS = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${base}/verificar/${token}`, { token: token })
      .then((ans) => {
        const { cargo } = ans.data.datos;
        redirect(cargo);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        redirect("");
      });
  };

  return [redirectAXIOS, redirect];
};
