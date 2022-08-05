import React, { useState, useEffect } from "react";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";

import CardEmployeeOptions from "../../components/EmployeeOptions/CardEmployeeOptions";

const CardsEmployeeOptions = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState("CARGANDO...");

  const dispatch = () => {
    setReload(!reload);
  };

  useEffect(() => {
    axios
      .get(`${base}/empleados/all`, authorization())
      .then((ans) => {
        if (!ans.data.length) {
          setMessage("NO HAY EMPLEADOS");
        }
        setUsers(ans.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [reload]);

  return (
    <section>
      <div className="container_section_title">
        <h2 className="section_title">EMPLEADOS</h2>
      </div>
      <div className="container_section_title">
        {users.length === 0 && (
          <div className="section_title green">{message}</div>
        )}
      </div>
      {users.map((info) => (
        <CardEmployeeOptions key={info.cedula} {...info} dispatch={dispatch} />
      ))}
    </section>
  );
};

export default CardsEmployeeOptions;
