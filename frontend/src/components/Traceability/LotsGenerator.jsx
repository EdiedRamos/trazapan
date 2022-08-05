import React, { useState } from "react";
import { Button, Stack, Center } from "@chakra-ui/react";
import salert from "sweetalert2";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";

const LotsGenerator = ({ dispatch, selected, reload, setReload }) => {
  const handleJornada = (jornada) => {
    dispatch({
      ...selected,
      jornadaLaboral: jornada,
    });
  };

  const handleGenerar = () => {
    if (selected.idReferencias === -1) {
      salert.fire({
        icon: "warning",
        title: "Por favor seleccione una referencia",
      });
      return;
    }
    if (selected.jornadaLaboral === "") {
      salert.fire({
        icon: "warning",
        title: "Por favor selecciona la jornada",
      });
      return;
    }
    axios
      .get(`${base}/lotes/cantidad`, authorization())
      .then((ans) => {
        const { cantidad } = ans.data;
        const time = new Date();
        const codigoLote = `CL.${
          time.getMonth() + 1
        }.${time.getDate()}.${time.getFullYear()}.${cantidad + 1}`;
        axios
          .post(
            `${base}/lotes/registro`,
            {
              ...selected,
              codigoLote,
            },
            authorization()
          )
          .then((ans) => {
            salert.fire({
              icon: "success",
              title: ans.data.message,
              text: codigoLote,
            });
            setReload(!reload);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack className="border_container_2">
      <Center className="title_1">Lotes a lanzar por referencia</Center>
      <Center>
        <Button className="button_1" onClick={handleGenerar}>
          Generar Lote
        </Button>
      </Center>
      <Center className="title_1">Jornada</Center>
      <Center>
        <Button
          className={`button_1 ${
            selected.jornadaLaboral === "m" && "selected"
          }`}
          mr="10px"
          onClick={() => handleJornada("m")}
        >
          M
        </Button>
        <Button
          className={`button_1 ${
            selected.jornadaLaboral === "t" && "selected"
          }`}
          onClick={() => handleJornada("t")}
        >
          T
        </Button>
      </Center>
    </Stack>
  );
};

export default LotsGenerator;
