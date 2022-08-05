const Roles = require("../models/models.roles");
const router = require("../utils/router");

router.get("/verificar/:id", (req, res) => {
  const roles = new Roles(req, res);
  roles.getPayload();
});

module.exports = router;
