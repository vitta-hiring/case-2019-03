
require("../models/consulta-model");
require("../models/interacao-medicamentos-model");
const base = require("../bin/base/repository-base");
class consultaRepository {
  constructor() {
    this._base = new base("Consulta");
    this.interacao = new base("InteracaoMedicamentos");
    }
  async create(data) {
  let haInteracaoGrave = false;
  let interacoesGraves = await this.interacao._model.find({nome:'grave'},'medicamentos1 medicamentos2');
  for(const interacoesGraves1 of interacoesGraves){
  const medicamentos1 =  interacoesGraves1.medicamentos1.map(elm => ( elm.id_medicamento.toString() ));
  const medicamentos2 =  interacoesGraves1.medicamentos2.map(elm => ( elm.id_medicamento.toString() ));
  for(const medicamento1 of data.medicamentos){
    for(const medicamento2 of data.medicamentos){
       if(medicamento1.id_medicamento.includes(medicamentos1) && medicamento2.id_medicamento.includes(medicamentos2)){
          haInteracaoGrave = true;
        }
     }
  } 
}
  if(haInteracaoGrave){
    return false;
  } else {
    let consultaCreated = await this._base.create(data);
    return this._base.getById(consultaCreated._id);
    }
  }
  async update(id, data) {
   let consultaUpdated = await this._base._model.update(id,data);
   if(consultaUpdated){
     return await this._base.getById(id);
   } else {
     return { message: `Update failed` }
   }
  }
  async getAll() {
    return await this._base._model.find().populate({ path: 'paciente', select: 'name' }).populate({ path: 'medico', select: 'name' });
  }
  async getById(id) {
    return await this._base.getById(id);
  }
  async getMy(id,type) {
    if(type == 'medico'){
      return await this._base._model.find({ medico: id }).populate({ path: 'paciente', select: 'name' });
    } else {
      return await this._base._model.find({ paciente: id }).populate({ path: 'medico', select: 'name' });;
    }
  }
  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = consultaRepository;
