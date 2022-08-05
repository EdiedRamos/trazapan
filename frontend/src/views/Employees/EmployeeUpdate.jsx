import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { authorization } from "../../helpers/authorization";
import {
  checkEmail,
  checkFields,
  checkJustDigits,
  checkPassword,
} from "../../utils/validator.js";
import salert from "sweetalert2";
import {
  Button,
  Input,
  Center,
  FormLabel,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { AdminHeader } from "../../components/Header/AdminHeader";
import { base } from "../../utils/axiosBase";
import { useRedirect } from "../../hooks/useRedirect";

const runAlert = (icon, title) => {
  salert.fire({
    icon,
    title,
  });
};

const Register = () => {
  const [employee, setEmployee] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    nacimiento: "",
    sexo: "",
    cargo: "",
    direccion: "",
    estado: "",
    salario: "",
    contrasena: "",
  });

  const [redirectAXIOS, redirect] = useRedirect();

  const handleChange = (evt) => {
    setEmployee({
      ...employee,
      [evt.target.name]: evt.target.value,
    });
  };

  const { id } = useParams();

  const handleSubmit = () => {
    //check if it's empty
    if (
      !checkFields({
        correo: employee.correo,
        direccion: employee.direccion,
        salario: employee.salario,
      })
    ) {
      runAlert("warning", "Complete los campos requeridos");
      return;
    }

    // check email
    if (!checkEmail(employee.correo)) {
      runAlert("warning", "El correo es incorrecto");
      return;
    }
    // check salary
    if (!checkJustDigits(employee.salario.toString())) {
      runAlert("warning", "El valor del salario es incorrecto");
      return;
    }

    // check password
    if (!checkPassword(employee.contrasena)) {
      salert.fire({
        icon: "warning",
        title: "La contraseña no puede incluir espacios",
      });
      return;
    }
    // make request
    axios
      .put(`${base}/empleados/actualizacion/${id}`, employee, authorization())
      .then((ans) => {
        salert.fire({
          icon: "success",
          title: "Actualización Exitosa",
        });
      })
      .catch((err) => {
        salert.fire({
          icon: "error",
          title: "Actualización Incorrecta",
          text: err.response.data.message,
        });
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

    axios
      .get(`${base}/empleados/${id}`, authorization())
      .then((ans) => {
        const { data } = ans.data;
        setEmployee({
          nombres: data.nombre,
          apellidos: data.apellido,
          cedula: data.cedula,
          correo: data.correo,
          nacimiento: data.fechaNacimiento,
          sexo: data.sexo,
          cargo: data.cargo,
          direccion: data.direccion,
          estado: data.estado,
          salario: data.salario,
          contrasena: "",
        });
      })
      .catch((err) => {
        redirectAXIOS();
      });
  }, []);

  return (
    localStorage.getItem("token") && (
      <>
        <AdminHeader />
        <div className="container_section_title">
          <h2 className="section_title">ACTUALIZACIÓN</h2>
        </div>
        <div className="gen_container gen_background">
          <div className="border_container_1" style={{ margin: "1rem" }}>
            <form>
              <FormControl mb={2}>
                <FormLabel>Nombres</FormLabel>
                <Input disabled value={employee.nombres} />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Apellidos</FormLabel>
                <Input disabled value={employee.apellidos} />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Número de cédula</FormLabel>
                <Input disabled value={employee.cedula} />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  placeholder="correo"
                  name="correo"
                  value={employee.correo}
                  onChange={handleChange}
                  isInvalid={employee.correo === ""}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Input disabled type="date" value={employee.nacimiento} />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Sexo</FormLabel>
                <Select disabled value={employee.sexo}>
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
                  isInvalid={employee.direccion === ""}
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
                  isInvalid={employee.salario === ""}
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
                  placeholder="Nueva contraseña (opcional)"
                  title="Si deja el campo vacío, permanecerá la contraseña antigua"
                  name="contrasena"
                  value={employee.contrasena}
                  onChange={handleChange}
                />
              </FormControl>
              <Center>
                <Button className="button_1" onClick={handleSubmit}>
                  Actualizar
                </Button>
              </Center>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default Register;
