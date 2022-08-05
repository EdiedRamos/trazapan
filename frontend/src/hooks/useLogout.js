import { useHistory } from "react-router-dom";

export const useLogout = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("datos");
    history.push("/login");
  };

  return [handleLogout];
};
