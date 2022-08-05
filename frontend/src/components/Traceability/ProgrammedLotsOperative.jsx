import React, { useState, useEffect } from "react";
import { Stack, Center, Button } from "@chakra-ui/react";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";
import { CheckIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

const ProgrammedLotsOperative = () => {
  const [lots, setLots] = useState([]);

  const history = useHistory();

  const handleFormado = (fc, codigoLote) => {
    if (fc > 0) return;
    history.push(`/formulario-formado/${codigoLote}`);
  };

  const handleEmpaque = (fc, em, codigoLote) => {
    if (fc < 1 || em > 0) return;
    history.push(`/formulario-empaque/${codigoLote}`);
  };

  useEffect(() => {
    axios
      .get(`${base}/lotes/referencias`, authorization())
      .then((ans) => {
        setLots(
          ans.data.codigos.filter(
            (lote) => lote.fc_listo === "0" || lote.em_listo === "0"
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Stack className="gen_container" my="1rem">
      <div className="border_container_1">
        <Center className="title_1">PROGRAMACIÓN</Center>
        <Center mt="1rem">
          <table className="table_style">
            <thead>
              <tr>
                <th className="title_2">Referencias</th>
                <th className="title_2">Lotes</th>
                <th className="title_2" title="Formado Crecimiento">
                  FC
                </th>
                <th className="title_2" title="Empaques">
                  EM
                </th>
              </tr>
            </thead>
            <tbody>
              {lots.map(
                ({ codigoLote, nombreProducto, fc_listo, em_listo }) => (
                  <tr key={codigoLote}>
                    <td>
                      <p className="title_2">{nombreProducto}</p>
                    </td>
                    <td>
                      <p>{codigoLote}</p>
                    </td>
                    <td
                      className={fc_listo < 1 ? "clickable" : ""}
                      onClick={() => handleFormado(fc_listo, codigoLote)}
                    >
                      <Center>
                        <CheckIcon color={fc_listo !== "0" && "green.500"} />
                      </Center>
                    </td>
                    <td
                      className={
                        fc_listo > 0 && em_listo < 1 ? "clickable" : ""
                      }
                      onClick={() =>
                        handleEmpaque(fc_listo, em_listo, codigoLote)
                      }
                    >
                      <Center>
                        <CheckIcon color={em_listo !== "0" && "green.500"} />
                      </Center>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Center>
      </div>
    </Stack>
  );
};

export default ProgrammedLotsOperative;
