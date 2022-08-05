import React, { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";
import salert from "sweetalert2";

const ProgrammedLots = ({ reload, dispatch }) => {
  // data
  const [data, setData] = useState([]);

  const handleClick = (idLote, fc_listo, em_listo) => {
    if (fc_listo !== "1" || em_listo !== "1") return;
    axios
      .put(`${base}/lotes/listo/${idLote}`, {}, authorization())
      .then((ans) => {
        const { message } = ans.data;
        salert.fire({
          icon: message.estado,
          title: message.informacion,
          text: `Lote: ${message.idLote} Producto: ${message.nombreProducto}`,
        });
        dispatch(!reload);
      })
      .catch((err) => {
        salert.fire({
          icon: "error",
          title: err.response.data.error,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`${base}/lotes/referencias`, authorization())
      .then((ans) => {
        setData(
          ans.data.codigos
            .filter((lote) => !lote.listo)
            .sort((a) => {
              if (a.fc_listo === "1" && a.em_listo === "1") {
                return -1;
              }
              return 1;
            })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  return (
    <div className="border_container_2">
      <Center>
        <p className="title_1">Listado de Lotes Programados</p>
      </Center>
      <div className="overflow_container">
        {data.map(({ codigoLote, fc_listo, em_listo }) => (
          <Center
            id="center"
            key={codigoLote}
            className={
              fc_listo !== "0" && em_listo !== "0" && "notification clickable"
            }
            onClick={() => handleClick(codigoLote, fc_listo, em_listo)}
          >
            {codigoLote}
          </Center>
        ))}
      </div>
    </div>
  );
};

export default ProgrammedLots;
