const { authJwt } = require("../middleware");
const controller = require("../controllers/medication.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/medication", [authJwt.verifyToken], controller.post);
  app.get("/api/medication/findOne", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/medication", [authJwt.verifyToken], controller.deleteOne); 
};