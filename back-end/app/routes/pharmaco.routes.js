const { authJwt } = require("../middleware");
const controller = require("../controllers/pharmaco.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/pharmaco", [authJwt.verifyToken], controller.post);
  app.get("/api/pharmaco/findOne", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/pharmaco", [authJwt.verifyToken], controller.deleteOne); 
  app.get("/api/pharmaco/findAll", [authJwt.verifyToken], controller.findAll);   
};