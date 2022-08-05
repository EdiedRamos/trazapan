import React, { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import LotsList from "../../components/Traceability/LotsList";
import LotsGenerator from "../../components/Traceability/LotsGenerator";
import ProgrammedLots from "../../components/Traceability/ProgrammedLots";
import { useRedirect } from "../../hooks/useRedirect";
import { CoorHeader } from "../../components/Header/CoorHeader";

const LotsMake = () => {
  const [selected, setSelected] = useState({
    idReferencias: -1,
    jornadaLaboral: "",
    linea: "",
    idEmpleado: "",
  });

  // para recargar la vista de las listas programadas ( evito usar "WEB SOCKET")
  const [reload, setReload] = useState(false);

  const [redirectAXIOS] = useRedirect();

  useEffect(() => {
    try {
      redirectAXIOS();
      setSelected({
        ...selected,
        idEmpleado: JSON.parse(localStorage.getItem("datos")).cedula,
      });
    } catch (exc) {}
  }, []);

  return (
    localStorage.getItem("token") && (
      <>
        <CoorHeader />
        <div className="gen_container" style={{ marginTop: "1rem" }}>
          <div className="border_container_1">
            <Center className="title_2">GENERACIÓN DE LOTES</Center>
            <Center>
              <LotsList dispatch={setSelected} selected={selected} />
            </Center>
            <Center>
              <LotsGenerator
                dispatch={setSelected}
                selected={selected}
                setReload={setReload}
                reload={reload}
              />
            </Center>
            <Center>
              <ProgrammedLots reload={reload} dispatch={setReload} />
            </Center>
          </div>
        </div>
      </>
    )
  );
};

export default LotsMake;
