import React, { useEffect } from "react";
import CardsEmployeeOptions from "../../components/EmployeeOptions/CardsEmployeeOptions";
import { AdminHeader } from "../../components/Header/AdminHeader";
import { useRedirect } from "../../hooks/useRedirect";

const EmployeeOptions = () => {
  const [redirectAXIOS] = useRedirect();

  useEffect(() => {
    redirectAXIOS("administrador");
  }, []);

  return (
    localStorage.getItem("token") && (
      <div>
        <AdminHeader />
        <CardsEmployeeOptions />
      </div>
    )
  );
};

export default EmployeeOptions;
