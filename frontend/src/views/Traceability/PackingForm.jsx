import React, { useState, useEffect } from "react";
import BadProduct from "../../components/Traceability/BadProduct";
import PackingArea from "../../components/Traceability/PackingArea";
import salert from "sweetalert2";
import { checkFields } from "../../utils/validator";
import axios from "axios";
import { authorization } from "../../helpers/authorization";
import { base } from "../../utils/axiosBase";
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
import { GoBack } from "../../components/Header/GoBack";

const PackingForm = () => {
  // packing data
  const [packingData, setPackingData] = useState({
    temperatura: "",
    torresCanastillas: "",
    canastasSueltas: "",
  });

  // bad products dat
  const [badProductData, setBadProductData] = useState({
    crudas: "",
    cortas: "",
    deformes: "",
    quemadas: "",
    aplastadas: "",
    pegadas: "",
    sucias: "",
  });

  // history
  const history = useHistory();

  const [, redirect] = useRedirect();

  // handle packing data
  const handlePD = (evt) => {
    setPackingData({
      ...packingData,
      [evt.target.name]: evt.target.value,
    });
  };

  // handle bad product
  const handleBP = (evt) => {
    setBadProductData({
      ...badProductData,
      [evt.target.name]: evt.target.value,
    });
  };

  // make request for registering the data
  const handleSubmit = () => {
    // check bad product
    if (!checkFields(packingData) || !checkFields(badProductData)) {
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
          const idLote = history.location.pathname.split("/")[2];
          // make request
          axios
            .post(
              `${base}/empaques/registro`,
              {
                ...packingData,
                ...badProductData,
                idLote,
              },
              authorization()
            )
            .then((ans) => {
              axios
                .put(`${base}/lotes/em/${idLote}`, {}, authorization())
                .then(() => {
                  history.push("/usuario-operativo");
                  salert.fire({
                    icon: "success",
                    title: ans.data.message,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              salert.fire({
                icon: "error",
                title: err.response.data.error,
              });
            });
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${base}/verificar/${token}`, authorization(), { token: token })
      .then((ans) => {
        const { cargo } = ans.data.datos;
        if (cargo !== "operativo") {
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
        <GoBack path="/usuario-operativo" />
        <div className="container_section_title">
          <h2 className="section_title">FORMULARIO EMPAQUE</h2>
        </div>
        <PackingArea info={packingData} dispatch={handlePD} />
        <BadProduct
          info={badProductData}
          dispatch={handleBP}
          handleSubmit={handleSubmit}
        />
      </>
    )
  );
};

export default PackingForm;
