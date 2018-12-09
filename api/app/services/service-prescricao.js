'use strict'
 const dao = require('../dao/dao-prescricao');
 const daoMedicamentos = require('../dao/dao-medicamento');
 const daoInteracao = require('../dao/dao-interacao_medicamentosa');
 const appError = require('../util/appError');
 const Validador = require('../util/Validador');

 exports.create = async(data) => {


    try {

        let validador = new Validador();
        
        validador.isRequired(data.Medicamentos_Id,"Medicamentos obrigatorios");
        validador.isRequired(data.Paciente_Id,"É necessario escolher um paciente");
        validador.isRequired(data.Medico_Id,"É necessario escolher um medico");

        if (!validador.isValid()) {
            throw new appError(JSON.stringify(validador.errors()), 400);
        }

        let famacos = await daoMedicamentos.getFamacos(data.Medicamentos_Id);

      

        let listFamacos = [];
        let auxFarmaco;

        famacos.forEach(element => {

            if(element.Farmacos.indexOf(",") == -1)
            {
                listFamacos.push( element.Farmacos);
            }
            else
            {
                
                auxFarmaco = element.Farmacos.split(",");
               auxFarmaco.forEach(aux => {
                listFamacos.push(aux);
               });
            }
            
        });


        if(!data.flgConcorda)
        {
            let  interacoes = await daoInteracao.getInteracao(listFamacos);

            if(interacoes.length > 0)
            {
                throw new appError(JSON.stringify(interacoes), 409);
            }
        }

        return await dao.create(data);

}
catch (error) {
     throw error;
    }
};

exports.getByPaciente = async(Paciente_Id) => {
    return await dao.getByPaciente(Paciente_Id);
};