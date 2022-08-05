import React, { useState, useEffect } from "react";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";

const LotsList = ({ dispatch, selected }) => {
  const [data, setData] = useState([]);

  const handleSelected = (identificacion, linea) => {
    dispatch({
      ...selected,
      idReferencias: identificacion,
      linea: linea,
    });
  };

  useEffect(() => {
    axios
      .get(`${base}/referencias`, authorization())
      .then((ans) => {
        setData(ans.data.referencias);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <table className="table_style">
      <thead>
        <tr>
          <th className="title_1">ID Referencias</th>
          <th className="title_1">Referencias</th>
          <th className="title_1">Línea</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ identificacion, nombreProducto, linea }) => (
          <tr
            key={identificacion}
            onClick={() => handleSelected(identificacion, linea)}
            className={`clickable ${
              identificacion === selected.idReferencias && "selected"
            }`}
          >
            <td>{identificacion}</td>
            <td>{nombreProducto}</td>
            <td>{linea}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LotsList;
