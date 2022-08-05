import React, { useState, useEffect } from "react";
import { authorization } from "../../helpers/authorization";
import axios from "axios";
import { base } from "../../utils/axiosBase";

const MachinesInfo = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios
      .get(`${base}/maquinarias`, authorization())
      .then((ans) => {
        setMachines(ans.data.maquinarias);
      })
      .catch();
  }, []);

  return (
    <table className="table_style">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {machines.map(({ codigo, nombre, estado }) => (
          <tr key={codigo}>
            <td>{nombre}</td>
            <td>{estado === "ok" ? "Correcto" : "Alerta"}</td>
            <td>{estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MachinesInfo;
