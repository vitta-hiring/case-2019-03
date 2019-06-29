'use strict'

const Exception = require('../util/Exception');
const prescricaoRepository = require('../repository/PrescricaoRep');
const medicamentoRepository = require('../repository/MedicamentoRep');
const interacaoMedicamentosaRepository = require('../repository/InteracaoMedicamentosaRep');
const Validador = require('../util/Validator');

exports.findAll = async () => {
	return await prescricaoRepository.findAll();
}

exports.find = async (id) => {
	return await prescricaoRepository.findByPk(id);
}

exports.create = async (obj) => {
	try {
		let validador = new Validador();
		validador.isRequired(obj.Medicamentos_Id, "Medicamentos são obrigatórios");
		validador.isRequired(obj.Paciente_Id, "É necessario escolher um paciente");
		validador.isRequired(obj.Medico_Id, "É necessario escolher um médico");
		
		if (!validador.isValid())
			throw new Error(JSON.stringify(validador.errors()), 400);
		
		let listFarmacos = [];
		let aux = [];
		let farmacos = await medicamentoRepository.findFarmacos(obj.Medicamentos_Id);
		farmacos.forEach(item => {
			if (item.Farmacos.indexOf(',') == -1){
				listFarmacos.push(item.Farmacos);
			}
			else{
				aux = item.Farmacos.split(',');
				aux.forEach(a => {
					listFarmacos.push(a);
				});
			}
		});
		
		let interacoes = await interacaoMedicamentosaRepository.findInteracaoMedicamentosa(listFarmacos);
		if (interacoes.length > 0)
			throw new Exception('Medicamentos prescritos possuem interação entre si: '+JSON.stringify(interacoes), 409);

		return await prescricaoRepository.create(obj);
	} catch (error) {
		throw error;
	}
}