import axios from "axios";
import { authorization } from "../helpers/authorization";
import { base } from "./axiosBase";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const lotsPdfById = (idLote = "todos") => {
  axios
    .get(`${base}/lotes/listos/${idLote}`, authorization())
    .then((ans) => {
      const docDefinition = {
        watermark: {
          text: "Trazapan",
          opacity: 0.2,
        },
        header: {
          text: `Informe del lote ${idLote}`,
          alignment: "center",
          color: "#E9ECEF",
          background: "#1982c4",
          margin: [0, 5],
        },
        content: [
          {
            table: {
              headerRows: 1,
              widths: ["*", "*"],
              body: [],
            },
          },
        ],
        defaultStyle: {
          fontSize: 15,
          bold: true,
        },
      };

      const {
        nombre,
        nombreProducto,
        codigoLote,
        idEmpleado,
        jornadaLaboral,
        idMaquina,
        estadoMaquina,
        horaIngreso,
        temperatura,
        humedad,
        cantidades,
        comentarios,
        torresCanastillas,
        canastas,
        udsDefCrudas,
        udsDefCortas,
        udsDefDeformes,
        udsDefQuemadas,
        udsDefAplastadas,
        udsDefPegadas,
        udsDefSucias,
      } = ans.data.lotes[0];

      docDefinition.content[0].table.body.push(
        ["Encargado", nombre],
        ["Cédula del encargado", idEmpleado],
        ["Nombre del producto", nombreProducto],
        ["Código del lote", codigoLote],
        ["Comentarios", comentarios],
        ["Jornada Laboral", jornadaLaboral === "t" ? "Tarde" : "Mañana"],
        ["Id del horno", idMaquina],
        ["Estado de la máquina", estadoMaquina],
        ["Hora del ingreso", horaIngreso],
        ["Temperatura", temperatura],
        ["Humedad", humedad],
        ["Cantidades", cantidades],
        ["Torres de canastillas", torresCanastillas],
        ["Canastas", canastas],
        ["Unidades crudas", udsDefCrudas],
        ["Unidades cortas", udsDefCortas],
        ["Unidades deformes", udsDefDeformes],
        ["Unidades quemadas", udsDefQuemadas],
        ["Unidades aplastadas", udsDefAplastadas],
        ["Unidades pegadas", udsDefPegadas],
        ["Unidades sucias", udsDefSucias]
      );

      pdfMake.createPdf(docDefinition).open();
    })
    .catch();
};
