import React from "react";
import { useHistory } from "react-router-dom";
import salert from "sweetalert2";
import axios from "axios";
import { base } from "../../utils/axiosBase";
import { authorization } from "../../helpers/authorization";

// styles object
const style = {
  display: "flex",
  flexWrap: "wrap",
  width: "80%",
  margin: "15px auto",
  justifyContent: "space-evenly",
};

const style2 = (option) => {
  return {
    width: option ? "200px" : "80px",
    height: "30px",
    margin: "5px",
  };
};

const CardEmployeeOptions = ({
  nombre: name = "Sin Nombre",
  cedula: id = "000000000",
  estado = "activo",
  dispatch,
}) => {
  const history = useHistory();

  const handleUpdate = () => {
    history.push(`/empleado-actualizacion/${id}`);
  };

  // request for "estado"
  const stateRequest = (value) => {
    axios
      .put(
        `${base}/empleados/actualizacion/${id}`,
        { estado: value },
        authorization()
      )
      .then((ans) => {
        salert.fire({
          icon: "success",
          title: "Estado actualizado",
        });
        dispatch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    // confirm the action
    salert
      .fire({
        icon: "warning",
        title: `¿Está seguro de eliminar al empleado con cédula ${id}?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#6a4c93",
        confirmButtonText: "Sí, Eliminar",
        confirmButtonColor: "#8ac926",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // make request
          axios
            .delete(`${base}/empleados/eliminacion/${id}`, authorization())
            .then((ans) => {
              salert.fire({
                icon: "success",
                title: ans.data.message,
              });
              dispatch();
            })
            .catch((err) => {
              salert.fire({
                icon: "error",
                title: "Error de eliminacion",
              });
              console.log("err", err);
            });
        }
      });
  };

  return (
    <article>
      <div style={style} className="set_color_1 container_style_1">
        <div className="user_control">
          <p style={style2(true)} className="center input_style_1">
            {name.toUpperCase()}
          </p>
          <p style={style2(true)} className="center input_style_1">
            {id}
          </p>
        </div>
        <div>
          <button
            style={style2(false)}
            className="button_update"
            onClick={handleUpdate}
          >
            Actualizar
          </button>
          {estado === "activo" ? (
            <button
              style={style2(false)}
              onClick={() => stateRequest("inactivo")}
              className="button_inactivate"
            >
              Inactivar
            </button>
          ) : (
            <button
              style={style2(false)}
              onClick={() => stateRequest("activo")}
              className="button_activate"
            >
              Activar
            </button>
          )}
          <button
            style={style2(false)}
            className="button_danger"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardEmployeeOptions;
