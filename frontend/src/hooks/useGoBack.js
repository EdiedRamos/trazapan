import { useHistory } from "react-router-dom";

export const useGoBack = () => {
  const history = useHistory();
  const goBack = (path) => {
    history.push(path);
  };
  return {
    goBack,
  };
};
