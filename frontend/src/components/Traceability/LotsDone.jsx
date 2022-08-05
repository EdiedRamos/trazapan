import React, { useState, useEffect } from "react";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";
import axios from "axios";
import { dateFromCode } from "../../utils/formats";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { lotsPdfById } from "../../utils/makePdf";

const LotsDone = () => {
  const [lots, setLots] = useState([]);

  const generarPdf = (codigoLote) => {
    lotsPdfById(codigoLote);
  };

  useEffect(() => {
    axios
      .get(`${base}/lotes/listos`, authorization())
      .then((ans) => {
        setLots(
          ans.data.lotes.map((info) => {
            return {
              ...info,
              fecha: dateFromCode(info.codigoLote),
            };
          })
        );
      })
      .catch();
  }, []);

  return (
    <table className="table_style">
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Referencias</th>
          <th>Ver más</th>
        </tr>
      </thead>
      <tbody>
        {lots.map(({ codigoLote, fecha, nombreProducto }) => (
          <tr key={codigoLote}>
            <td>{codigoLote}</td>
            <td>{fecha}</td>
            <td>{nombreProducto}</td>
            <td className="clickable" onClick={() => generarPdf(codigoLote)}>
              <Center>
                <ExternalLinkIcon />
              </Center>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LotsDone;
