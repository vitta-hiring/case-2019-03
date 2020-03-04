
require("../models/interacao-medicamentos-model");
const base = require("../bin/base/repository-base");
class interacaomedicamentosRepository {
  constructor() {
    this._base = new base("InteracaoMedicamentos");
    }
  async create(data) {
    let interacaomedicamentosCreated = await this._base.create(data);
    return this._base.getById(interacaomedicamentosCreated._id);
  }
  async update(id, data) {
   let interacaomedicamentosUpdated = await this._base._model.update(id,data);
   if(interacaomedicamentosUpdated){
     return await this._base.getById(id);
   } else {
     return { message: `Update failed` }
   }
  }
  async getAll() {
    return await this._base.getAll();
  }
  async getById(id) {
    return await this._base.getById(id);
  }
  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = interacaomedicamentosRepository;
