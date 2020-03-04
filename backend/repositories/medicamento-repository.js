
require("../models/medicamento-model");
const base = require("../bin/base/repository-base");
class medicamentoRepository {
  constructor() {
    this._base = new base("Medicamento");
    }
  async create(data) {
    let medicamentoCreated = await this._base.create(data);
    return this._base.getById(medicamentoCreated._id);
  }
  async update(id, data) {
   let medicamentoUpdated = await this._base._model.update(id,data);
   if(medicamentoUpdated){
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
  async getByFarmaco(farmaco) {
    return await this._base._model.find({ farmacos: { $elemMatch: { nome: farmaco } } });
  }
  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = medicamentoRepository;
