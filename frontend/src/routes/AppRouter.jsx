import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// employee options
import EmployeeRegister from "../views/Employees/EmployeeRegister";
import EmployeeUpdate from "../views/Employees/EmployeeUpdate";
import EmployeeOptions from "../views/Employees/EmployeeOptions";
// formed options
import FormedForm from "../views/Traceability/FormedForm";
import PackingForm from "../views/Traceability/PackingForm";
import OperativeUser from "../views/Traceability/OperativeUser";
// logging
import Login from "../views/Login";
// Lots
import LotsMake from "../views/Traceability/LotsMake";
import LotsReport from "../views/Traceability/LotsReport";
// not found
import NotFound from "../views/Info/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <React.StrictMode>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/empleado-registro" component={EmployeeRegister} />
          <Route
            exact
            path="/empleado-actualizacion/:id"
            component={EmployeeUpdate}
          />
          <Route exact path="/empleado-opciones" component={EmployeeOptions} />
          <Route exact path="/formulario-formado/:id" component={FormedForm} />
          <Route exact path="/formulario-empaque/:id" component={PackingForm} />
          <Route exact path="/usuario-operativo" component={OperativeUser} />
          <Route exact path="/generacion-lote" component={LotsMake} />
          <Route exact path="/reportes-lote" component={LotsReport} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.StrictMode>
    </Router>
  );
};

export default AppRouter;
