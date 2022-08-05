import React from "react";
import {
  Button,
  NumberInput,
  Center,
  FormLabel,
  FormControl,
  NumberInputField,
} from "@chakra-ui/react";

const BadProduct = ({ info, dispatch, handleSubmit }) => {
  return (
    <div className="gen_container gen_background">
      <div className="border_container_1" style={{ margin: "1rem" }}>
        <Center>UNIDADES NO CONFORMES</Center>
        <form>
          <FormControl>
            <FormLabel>
              Crudas
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="crudas"
                  name="crudas"
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Cortas
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="cortas"
                  name="cortas"
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Deformes
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="deformes"
                  name="deformes"
                  value={info.deformes}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Quemadas
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="quemadas"
                  name="quemadas"
                  value={info.quemadas}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Aplastadas
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="aplastadas"
                  name="aplastadas"
                  value={info.aplastadas}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Pegadas
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="pegadas"
                  name="pegadas"
                  value={info.pegadas}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>
              Sucias
              <NumberInput min={0}>
                <NumberInputField
                  placeholder="sucias"
                  name="sucias"
                  value={info.sucias}
                  onChange={dispatch}
                />
              </NumberInput>
            </FormLabel>
          </FormControl>
          <Center>
            <Button className="button_1" onClick={handleSubmit}>
              REALIZADO
            </Button>
          </Center>
        </form>
      </div>
    </div>
  );
};

export default BadProduct;
