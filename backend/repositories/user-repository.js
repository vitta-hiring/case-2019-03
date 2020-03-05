require("../models/user-model");
const base = require("../bin/base/repository-base");
const bcrypt = require("bcryptjs");
class userRepository {
  constructor() {
    this._base = new base("User");
    this._projection =
      "name email _id coords type";
     }
  async authenticate(Email, Password) {
    let user = await this._base._model.findOne({ email: Email });
    let userR = await this._base._model.findOne(
      { email: Email },
      this._projection
    );
    if (await bcrypt.compareSync(Password, user.password)) {
      return userR;
    }
    return null;
  }
  async IsEmailExists(Email) {
    return await this._base._model.findOne({ email: Email }, this._projection);
  }
  async create(data) {
    let userCreated = await this._base.create(data);
    return this._base._model.findById(userCreated._id, this._projection);
  }
  async update(id, data, userLogged) {
    if (userLogged._id === id) {
      if (
        data.oldPassword !== data.password &&
        data.oldPassword &&
        data.password !== undefined &&
        data.passwordConfirmation !== undefined &&
        data.password === data.passwordConfirmation
      ) {
        let user = await this._base._model.findOne({ _id: id });
        if (await bcrypt.compareSync(data.oldPassword, user.password)) {
          var salt = await bcrypt.genSaltSync(10);
          let _hashPassword = await bcrypt.hashSync(data.password, salt);
          let name = user.name;
          let email = user.email;
          if (data.name) {
            name = data.name;
          }
          if (data.email) {
            email = data.email;
          }
          let userUpdated = await this._base.update(id, {
            name: name,
            email: email,
            password: _hashPassword
          });
          return this._base._model.findById(
            userUpdated._id,
            this._projection
          );
        } else {
          return { message: `Password incorrect` };
        }
      } else {
        let userUpdated;
        if (userLogged.email === undefined) {
            userUpdated = await this._base.update(id, {
              name: data.name
            });
        } else {
          return await this._base._model.findById(
            userLogged._id,
            this._projection
          );
        }
        return this._base._model.findById(
          userUpdated._id,
          this._projection
        );
      }
    } else {
      return {
        message: `Your user ${userLogged.name} doesn´t have permission for conclude this action.`
      };
    }
  }
  async getAll() {
    return await this._base._model.find({}, this._projection);
  }
  async getPatients() {
    return await this._base._model.find({type:'patient'}, this._projection);
  }
  async getById(id) {
    return await this._base._model.findById(id, this._projection);
  }
  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = userRepository;
