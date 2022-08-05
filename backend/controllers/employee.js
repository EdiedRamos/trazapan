const router = require("../utils/router.js");
const authorization = require("../middlewares/authorization.js");
const Employee = require("../models/models.employee");

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~ GET ~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// get all employees
router.get("/empleados/all", authorization, (req, res) => {
  const employee = new Employee(req, res);
  employee.getAllEmployees();
});

// get an employee by "cedula"
router.get("/empleados/:id", authorization, (req, res) => {
  const employee = new Employee(req, res);
  employee.getEmployeeById();
});

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~ POST ~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  */

// register employee
router.post("/empleados/registro", authorization, (req, res) => {
  const employee = new Employee(req, res);
  employee.registerEmployee();
});

/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~ PUT ~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// update employee info
router.put("/empleados/actualizacion/:id", authorization, (req, res) => {
  const employee = new Employee(req, res);
  employee.updateEmployee();
});

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
router.delete("/empleados/eliminacion/:id", authorization, (req, res) => {
  const employee = new Employee(req, res);
  employee.deleteEmployee();
});

module.exports = router;
