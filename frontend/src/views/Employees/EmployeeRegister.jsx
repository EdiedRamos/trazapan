import React, { useState, useEffect } from "react";
import salert from "sweetalert2";
import {
  checkEmail,
  checkFields,
  checkJustDigits,
  checkPassword,
  checkJustLetters,
} from "../../utils/validator.js";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { AdminHeader } from "../../components/Header/AdminHeader.jsx";
import {
  Button,
  Input,
  Center,
  FormLabel,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { base } from "../../utils/axiosBase.js";
import { useRedirect } from "../../hooks/useRedirect.js";

const runAlert = (icon, title) => {
  salert.fire({
    icon,
    title,
  });
};

const EmployeeRegister = () => {
  const [employee, setEmployee] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    nacimiento: "",
    sexo: "masculino",
    cargo: "operativo",
    direccion: "",
    estado: "activo",
    salario: "",
    contrasena: "",
  });

  const [, redirect] = useRedirect();

  const clearEmployee = () => {
    const keys = Object.keys(employee);
    const newEmployee = {};
    for (const key of keys) {
      newEmployee[key] = "";
    }
    newEmployee["sexo"] = "masculino";
    newEmployee["cargo"] = "operativo";
    newEmployee["estado"] = "activo";
    setEmployee(newEmployee);
  };

  const handleSubmit = () => {
    // check there are not empty fields
    if (!checkFields(employee)) {
      runAlert("warning", "Por favor complete todos los campos");
      return;
    }

    // check name
    if (!checkJustLetters(employee.nombres)) {
      runAlert("warning", "El nombre solo puede contener letras");
      return;
    }

    // check lastname
    if (!checkJustLetters(employee.apellidos)) {
      runAlert("warning", "El apellido solo puede contener letras");
      return;
    }

    // check email
    if (!checkEmail(employee.correo)) {
      runAlert("warning", "El correo es incorrecto");
      return;
    }

    // check salary
    if (!checkJustDigits(employee.salario)) {
      runAlert("warning", "El valor del salario es incorrecto");
      return;
    }

    // check "cedula"
    if (!checkJustDigits(employee.cedula)) {
      runAlert("warning", "La cédula debe contener solo dígitos");
      return;
    }

    // check password
    if (!checkPassword(employee.contrasena)) {
      runAlert("warning", "La contraseña no puede incluir espacios");
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
          // sent to backend
          axios
            .post(`${base}/empleados/registro`, employee, authorization())
            .then((ans) => {
              console.log("ans", ans);
              clearEmployee();
              salert.fire({
                icon: "success",
                title: "Empleado registrado",
              });
            })
            .catch((err) => {
              salert.fire({
                icon: "error",
                title: "Error de registro",
                text: err.response.data.error,
              });
              console.log("error", err);
            });
        }
      });
  };

  const handleChange = (evt) => {
    setEmployee({
      ...employee,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${base}/verificar/${token}`, authorization(), { token: token })
      .then((ans) => {
        const { cargo } = ans.data.datos;
        if (cargo !== "administrador") {
          redirect(cargo);
        }
      })
      .catch(() => {
        redirect("");
      });
  }, []);

  return (
    localStorage.getItem("token") && (
      <>
        <AdminHeader />
        <div className="container_section_title">
          <h2 className="section_title">REGISTRO</h2>
        </div>
        <div className="gen_container gen_background">
          <div className="border_container_1" style={{ margin: "1rem" }}>
            <form>
              <FormControl mb={2}>
                <FormLabel>Nombres</FormLabel>
                <Input
                  placeholder="nombres"
                  value={employee.nombres}
                  name="nombres"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Apellidos</FormLabel>
                <Input
                  placeholder="apellidos"
                  name="apellidos"
                  value={employee.apellidos}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Número de cédula</FormLabel>
                <Input
                  placeholder="cédula"
                  name="cedula"
                  value={employee.cedula}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  placeholder="correo"
                  name="correo"
                  value={employee.correo}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Input
                  type="date"
                  name="nacimiento"
                  onChange={handleChange}
                  value={employee.nacimiento}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Sexo</FormLabel>
                <Select
                  name="sexo"
                  onChange={handleChange}
                  value={employee.sexo}
                >
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Cargo</FormLabel>
                <Select
                  name="cargo"
                  onChange={handleChange}
                  value={employee.cargo}
                >
                  <option value="operativo">Operativo</option>
                  <option value="coordinador">Coordinador</option>
                  <option value="administrador">Administrador</option>
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Dirección</FormLabel>
                <Input
                  placeholder="Dirección"
                  name="direccion"
                  value={employee.direccion}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Estado</FormLabel>
                <Select
                  name="estado"
                  onChange={handleChange}
                  value={employee.estado}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Salario</FormLabel>
                <Input
                  placeholder="Salario"
                  type="text"
                  name="salario"
                  value={employee.salario}
                  onChange={(evt) =>
                    setEmployee({
                      ...employee,
                      salario: [...evt.target.value]
                        .filter((char) => /[0-9]/.test(char))
                        .join(""),
                    })
                  }
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  placeholder="Contraseña"
                  name="contrasena"
                  value={employee.contrasena}
                  onChange={handleChange}
                />
              </FormControl>
              <Center>
                <Button className="button_1" onClick={handleSubmit}>
                  Registrar
                </Button>
              </Center>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default EmployeeRegister;
