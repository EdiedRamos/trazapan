import React, { useEffect } from "react";
import ExitBar from "../../components/Header/ExitBar";

import MachineReports from "../../components/Traceability/MachineReports";
import ProgrammedLotsOperative from "../../components/Traceability/ProgrammedLotsOperative";
import { useRedirect } from "../../hooks/useRedirect";

const OperativeUser = () => {
  const [redirectAXIOS] = useRedirect();

  useEffect(() => {
    // verifico las credenciales almacenadas en el localstorage
    redirectAXIOS();
  }, []);

  return (
    localStorage.getItem("token") && (
      <div>
        <ExitBar />
        <ProgrammedLotsOperative />
        <MachineReports />
      </div>
    )
  );
};

export default OperativeUser;
