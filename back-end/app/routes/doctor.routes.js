const { authJwt } = require("../middleware");
const controller = require("../controllers/doctor.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/doctor", [authJwt.verifyToken], controller.post);
  app.get("/api/doctor/findOne", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/doctor", [authJwt.verifyToken], controller.deleteOne); 
  app.get("/api/doctor/findAll", [authJwt.verifyToken], controller.findAll);   
};