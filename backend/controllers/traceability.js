const router = require("../utils/router");
const mysql = require("../utils/database");
const authorization = require("../middlewares/authorization");
const References = require("../models/models.trace.references");
const Lots = require("../models/models.trace.lots");
const Machines = require("../models/models.trace.machines");
const Packaging = require("../models/models.trace.packaging");
const Formed = require("../models/models.trace.formed");

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~ GET ~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// obtener las referencias
router.get("/referencias", authorization, (req, res) => {
  const references = new References(req, res);
  references.getReferences();
});

// obtener la cantidad de lotes para determinar el codigo
router.get("/lotes/cantidad", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.getLotsQuantity();
});

// obtener los códigos de los lotes de producción
router.get("/lotes/codigos", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.getLotsCode();
});

// obtener el cruce entre lotes y referencia
router.get("/lotes/referencias", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.getLotsReferences();
});

// obtener  el codigo y la referencia de los lotes que ya están listo
router.get("/lotes/listos", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.getReadyLots();
});

// obtener el nombre del encargado, el nombre del producto, todo del lote, todo de formadocrecimiento, todo de empaques de todos los lotes de producción
router.get("/lotes/listos/todos", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.getAllFromReadyLots();
});

// obtener el nombre del encargado, el nombre del producto, todo del lote, todo de formadocrecimiento, todo de empaques dado el codigo del lote
router.get("/lotes/listos/:id", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.getAllFromReadyLotsById();
});

// obtener las máquinas
router.get("/maquinarias", authorization, (req, res) => {
  const machines = new Machines(req, res);
  machines.getMachines();
});

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~ POST ~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// registrar datos de empaque
router.post("/empaques/registro", authorization, (req, res) => {
  const packaging = new Packaging(req, res);
  packaging.registerPackage();
});

// registrar formado crecimiento
router.post("/formado/registro", authorization, (req, res) => {
  const formed = new Formed(req, res);
  formed.registerFormed();
});

// registrar lote de producción
router.post("/lotes/registro", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.registerLot();
});

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~ PUT ~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// actualizar el estado de una máquina
router.put("/maquinaria/estado/:id", authorization, (req, res) => {
  const machines = new Machines(req, res);
  machines.updateStateById();
});

// actualizar el estado de un lote de producción [formadoCrecimiento]
router.put("/lotes/fc/:id", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.updateLotFormedById();
});

// actualizar el estado de un lote de produccion [empaques]
router.put("/lotes/em/:id", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.updateLotPackagingById();
});

// actualizar el estado de un lote de producción [listo]
router.put("/lotes/listo/:id", authorization, (req, res) => {
  const lots = new Lots(req, res);
  lots.updateLotReadyById();
});

module.exports = router;
