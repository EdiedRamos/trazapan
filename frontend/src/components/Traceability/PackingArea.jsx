import React from "react";
import {
  NumberInput,
  Center,
  FormLabel,
  FormControl,
  NumberInputField,
} from "@chakra-ui/react";

const PackingArea = ({ info, dispatch }) => {
  return (
    <div className="gen_container gen_background">
      <div className="border_container_1" style={{ margin: "1rem" }}>
        <Center>AREA DE EMPAQUE</Center>
        <form>
          <FormControl>
            <FormLabel>
              Temperatura
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="temperatura"
                  name="temperatura"
                  value={info.temperatura}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Torres Canastillas X 8
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="torres canastillas"
                  name="torresCanastillas"
                  value={info.torresCanastillas}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Canastas Sueltas
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="canastas sueltas"
                  name="canastasSueltas"
                  value={info.canastasSueltas}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default PackingArea;
