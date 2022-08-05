import React, { useState, useEffect } from "react";
import { Stack, Center, Button } from "@chakra-ui/react";
import axios from "axios";
import salert from "sweetalert2";
import { base } from "../../utils/axiosBase";
import { authorization } from "../../helpers/authorization";

const MachineReports = () => {
  const [machines, setMachines] = useState([]);

  const handleReport = async (codigo) => {
    const { value: report } = await salert.fire({
      input: "textarea",
      inputLabel: `Problemas de <<${
        machines.filter(({ codigo: code }) => code === codigo)[0].nombre
      }>>`,
    });
    if (report) {
      axios
        .put(
          `${base}/maquinaria/estado/${codigo}`,
          { estado: report },
          authorization()
        )
        .then((ans) => {
          salert.fire({
            icon: "success",
            title: ans.data.message,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get(`${base}/maquinarias`, authorization())
      .then((ans) => {
        setMachines(ans.data.maquinarias);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Stack className="gen_container">
      <div className="border_container_1">
        <Center className="title_1">MAQUINARIA</Center>
        <Center mt="1rem">
          <Stack>
            {machines.map(({ codigo, nombre }) => (
              <div key={codigo}>
                <p className="title_2">{nombre}</p>
                <Button
                  className="button_1"
                  ml="1rem"
                  onClick={() => handleReport(codigo)}
                >
                  Reportar Avería
                </Button>
              </div>
            ))}
          </Stack>
        </Center>
      </div>
    </Stack>
  );
};

export default MachineReports;
