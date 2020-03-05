exports.post = async (repository, validationContract, req, res) => {
  try {
    let data = req.body;
    if (!validationContract.isValid()) {
      res
        .status(400)
        .send({
          message: "Invalid data in request",
          validation: validationContract.errors()
        })
        .end();
      return;
    }
    let result = await repository.create(data);
    if(!result){
      res
      .status(200)
      .send({
        message: "Há interações graves entre os medicamentos receitados",
      })
      .end();
    return;
    }
    res.status(201).send(result);
  } catch (error) {
    console.log("Post with error: ", error);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};
exports.put = async (repository, validationContract, req, res) => {
  try {
    let data = req.body;
    if (!validationContract.isValid()) {
      res
        .status(400)
        .send({
          message: "Invalid data in request",
          validation: validationContract.errors()
        })
        .end();
      return;
    }
    let result = await repository.update(
      req.userLogged.user._id,
      data,
      req.userLogged.user
    );
    res.status(202).send(result);
  } catch (error) {
    console.log("Put with error : ", error);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};
exports.get = async (repository, req, res) => {
  try {
    let result = await repository.getAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};
exports.getById = async (repository, req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      let result = await repository.getById(id);
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "id required" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};
exports.delete = async (repository, req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      let result = await repository.delete(id, req.userLogged);
      if (result !== "Invalid Operation") {
        res.status(200).send({ message: `Register ${id} deleted` });
      } else {
        res.status(400).send({ message: "Invalid Operation", error: error });
      }
    } else {
      res.status(400).send({ message: "id required" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};
