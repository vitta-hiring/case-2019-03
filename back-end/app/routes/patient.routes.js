const { authJwt } = require("../middleware");
const controller = require("../controllers/patient.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/patient", [authJwt.verifyToken], controller.post);
  app.get("/api/patient/findOne", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/patient", [authJwt.verifyToken], controller.deleteOne); 
  app.get("/api/patient/findAll", [authJwt.verifyToken], controller.findAll);   
};