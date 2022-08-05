import React from "react";
import { Center, Stack } from "@chakra-ui/react";
import LotsDone from "../../components/Traceability/LotsDone";
import MachinesInfo from "../../components/Traceability/MachinesInfo";
import { CoorHeader } from "../../components/Header/CoorHeader";

const LotsReport = () => {
  return (
    <div>
      <CoorHeader />
      <div className="gen_container" style={{ marginTop: "1rem" }}>
        <div className="border_container_1">
          <Center className="title_2">LOTES</Center>
          <Center>
            <LotsDone />
          </Center>
          <Center className="title_2">MAQUINARIAS</Center>
          <Center>
            <MachinesInfo />
          </Center>
        </div>
      </div>
    </div>
  );
};

export default LotsReport;
