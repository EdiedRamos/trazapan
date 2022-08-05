import React, { useState, useEffect } from "react";
import salert from "sweetalert2";
import { timeFormat } from "../../utils/formats";
import { checkFields } from "../../utils/validator";
import {
  Button,
  Input,
  Center,
  FormLabel,
  FormControl,
  NumberInputField,
  NumberInput,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { base } from "../../utils/axiosBase";
import { authorization } from "../../helpers/authorization";
import { useRedirect } from "../../hooks/useRedirect";
import { GoBack } from "../../components/Header/GoBack";

const FormedForm = () => {
  const [checkInInfo, setCheckInInfo] = useState({
    checkInTime: "",
    temperature: "",
    humidity: "",
    quantity: "",
    comments: "",
    lotId: "",
  });

  const history = useHistory();

  const [, redirect] = useRedirect();

  const handleChange = (evt) => {
    setCheckInInfo({
      ...checkInInfo,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = () => {
    // checkFields
    if (!checkFields(checkInInfo)) {
      salert.fire({
        icon: "warning",
        title: "Por favor complete todos los campos",
      });
      return;
    }
    // confirm register
    salert
      .fire({
        icon: "warning",
        title: "¿Los datos ingresados son correctos?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#6a4c93",
        confirmButtonText: "Sí, registrar",
        confirmButtonColor: "#8ac926",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // make request
          axios
            .get(`${base}/lotes/referencias`, authorization())
            .then((ans) => {
              // obtengo la linea relacionada con el lote
              const linea = String(
                ans.data.codigos.filter(
                  (lote) => lote.codigoLote === checkInInfo.lotId
                )[0].linea
              );
              axios
                .get(`${base}/maquinarias`, authorization())
                .then((ans) => {
                  // obtengo el id de la maquina relacionada con la linea del lote
                  const idMaquina = ans.data.maquinarias.filter((maquina) => {
                    return maquina.nombre.split(" ")[2] === linea;
                  })[0].codigo;
                  // registro la información en formado crecimiento
                  axios
                    .post(
                      `${base}/formado/registro`,
                      { ...checkInInfo, machineId: idMaquina },
                      authorization()
                    )
                    .then((ans) => {
                      // actualizo la base de datos
                      axios
                        .put(
                          `${base}/lotes/fc/${checkInInfo.lotId}`,
                          {},
                          authorization()
                        )
                        .then(() => {
                          salert.fire({
                            icon: "success",
                            title: ans.data.message,
                          });
                          history.push("/usuario-operativo");
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => {
                      salert.fire({
                        icon: "error",
                        title: err.response.data.error,
                      });
                    });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${base}/verificar/${token}`)
      .then((ans) => {
        const { cargo } = ans.data.datos;
        if (cargo !== "operativo") {
          redirect("");
        }
      })
      .catch(() => {
        redirect("");
      });

    const time = new Date();
    setCheckInInfo({
      ...checkInInfo,
      checkInTime: `${timeFormat(time.getHours())}:${timeFormat(
        time.getMinutes()
      )}`,
      lotId: history.location.pathname.split("/")[2],
    });
  }, []);

  return (
    localStorage.getItem("token") && (
      <>
        <GoBack path="/usuario-operativo" />
        <div className="container_section_title">
          <h2 className="section_title">FORMULARIO FORMADO</h2>
        </div>
        <div className="gen_container gen_background">
          <div className="border_container_1" style={{ margin: "1rem" }}>
            <form>
              <FormControl>
                <FormLabel>
                  Hora de Ingreso
                  <Input
                    type="time"
                    name="checkInTime"
                    value={checkInInfo.checkInTime}
                    onChange={handleChange}
                  />
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Temperatura
                  <NumberInput min={0}>
                    <NumberInputField
                      name="temperature"
                      placeholder="temperatura"
                      onChange={handleChange}
                    />
                  </NumberInput>
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Humedad %
                  <NumberInput min={0}>
                    <NumberInputField
                      name="humidity"
                      placeholder="humedad"
                      onChange={handleChange}
                    />
                  </NumberInput>
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Cantidad
                  <NumberInput min={0}>
                    <NumberInputField
                      name="quantity"
                      placeholder="cantidad"
                      onChange={handleChange}
                    />
                  </NumberInput>
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Comentarios
                  <Input
                    placeholder="Ej: En proceso"
                    name="comments"
                    onChange={handleChange}
                  />
                </FormLabel>
              </FormControl>
              <Center>
                <Button className="button_1" onClick={handleSubmit}>
                  REGISTRAR
                </Button>
              </Center>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default FormedForm;
