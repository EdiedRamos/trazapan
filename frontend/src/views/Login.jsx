import React, { useState, useEffect } from "react";
import salert from "sweetalert2";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Center,
  FormControl,
  FormLabel,
  Badge,
  Tag,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { base } from "../utils/axiosBase";
import { useRedirect } from "../hooks/useRedirect";

const runAlert = (icon, title) => {
  salert.fire({
    icon,
    title,
  });
};

const Login = () => {
  // ~~~~~ CONSTANTS ~~~~~
  const [viewPass, setViewPass] = useState(false);

  const [documentNumber, setDocumentNumber] = useState("");
  const [password, setPassword] = useState("");

  const [redirectAXIOS, redirect] = useRedirect();

  const [errorId, setErrorId] = useState(false);
  const [errorPw, setErrorPw] = useState(false);

  // ~~~~~ HANDLES ~~~~~
  const handleViewPass = () => {
    setViewPass(!viewPass);
  };

  const handleLogin = () => {
    setErrorId(documentNumber === "");
    setErrorPw(password === "");
    if (documentNumber === "" || password === "") {
      return;
    }
    const info = {
      cedula: documentNumber,
      contrasena: password,
    };
    axios
      .post(`${base}/login`, info)
      .then((ans) => {
        const { datos } = ans.data;
        localStorage.setItem("token", datos.token);
        localStorage.setItem(
          "datos",
          JSON.stringify({
            nombre: datos.nombre,
            cargo: datos.cargo,
            cedula: datos.cedula,
          })
        );
        // redirigir al empleado de acuerdo a su cargo
        const Toast = salert.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", salert.stopTimer);
            toast.addEventListener("mouseleave", salert.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: `Bienvenid@ ${datos.nombre.toUpperCase()}`,
        });
        redirect(datos.cargo);
      })
      .catch((err) => {
        runAlert("error", err.response.data.message);
      });
  };

  useEffect(() => {
    // verifico las credenciales almacenadas en el localstorage
    if (localStorage.getItem("token")) {
      redirectAXIOS("login");
    }
  }, []);

  return (
    !localStorage.getItem("token") && (
      <div className="gen_container gen_background" style={{ height: "100vh" }}>
        <div className="border_container_1_login">
          <FormControl>
            <Center>
              <Tag
                size="lg"
                my="5"
                color="#E9ECEF"
                background={"#212529"}
                userSelect="none"
                boxShadow={"0 0 5px black"}
              >
                TRAZAPAN
              </Tag>
            </Center>
            <FormLabel>Cédula:</FormLabel>
            <NumberInput value={documentNumber} isInvalid={errorId}>
              <NumberInputField
                placeholder="Ingrese la cédula"
                onChange={(evt) =>
                  setDocumentNumber(() =>
                    [...evt.target.value]
                      .filter((char) => /[0-9]/.test(char))
                      .join("")
                  )
                }
                onFocus={() => setErrorId(false)}
              />
            </NumberInput>
            {errorId && (
              <Badge colorScheme="red" variant="solid">
                La cédula es requerida
              </Badge>
            )}
            <FormLabel mt={2}>Contraseña:</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={viewPass ? "text" : "password"}
                placeholder="Ingrese la contraseña"
                my="5px"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                isInvalid={errorPw}
                onFocus={() => setErrorPw(false)}
              />
              <InputRightElement width="4.5rem">
                {viewPass ? (
                  <ViewOffIcon h="1.75rem" size="sm" onClick={handleViewPass} />
                ) : (
                  <ViewIcon h="1.75rem" size="sm" onClick={handleViewPass} />
                )}
              </InputRightElement>
            </InputGroup>
            {errorPw && (
              <Badge colorScheme="red" variant="solid">
                La contraseña es requerida
              </Badge>
            )}
            <Center mt={2}>
              <Button className="button_1" onClick={handleLogin}>
                Ingresar
              </Button>
            </Center>
          </FormControl>
        </div>
      </div>
    )
  );
};

export default Login;
