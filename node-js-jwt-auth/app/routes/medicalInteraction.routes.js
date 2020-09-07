const { authJwt } = require("../middleware");
const { verifyPharmacos } = require("../middleware");
const controller = require("../controllers/medicalInteraction.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/medicalInteraction",
    [
      verifyPharmacos.checkPharmacosExisted,
      authJwt.verifyToken, 
    ],
    controller.post
  );
  app.get("/api/medicalInteraction/findOne", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/medicalInteraction", [authJwt.verifyToken], controller.deleteOne);
};