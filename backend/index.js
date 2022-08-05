// requires
require("dotenv").config();

// constants
const express = require("express");
const app = express();

// uses
// app.use(require("morgan")("combined"));
app.use(express.json());
app.use(require("cors")());
app.use(require("./controllers/root"));
app.use(require("./controllers/login"));
app.use(require("./controllers/employee"));
app.use(require("./controllers/traceability"));
app.use(require("./controllers/roles"));

// start the server
app.listen(process.env.PORT, () => {
  console.log("server started on", process.env.PORT);
});
