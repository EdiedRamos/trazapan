const router = require("../utils/router");

router.get("/", (_, res) => {
  res.send(
    '<body style="background-color:#8ac926;display:flex;justify-content:center;align-items:center"><div style="height:95%;width:95%;background-color:#ffca3a;border-radius:20px;box-shadow:10px 10px #748067;display:flex;justify-content:center;align-items:center;border:1px solid #FFFC31;"><p style="font-family:fantasy;font-size:70px;">🥖TRAZAPAN🥐</p></div></body>'
  );
});

module.exports = router;
