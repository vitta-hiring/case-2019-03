'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Medicamentos', [  
    {  
       "id":35715,
       "Nome":"ESTOMAZIL",
       "Farmaco":null,
       "Farmacos": "TIMOLOL,ACIDO CITRICO,CARBONATO DE SODIO,BICARBONATO DE SODIO",
       "Concentracao":"(462+90+438)",
       "Unidade":"MG/G",
       "TipoMedicamento":"SIMILAR",
       "FormaFarmaceutica":"PO EFERVESCENTE",
       "ViaAdministracao":"ORAL",
       "CodigoATC":"A02A1",
       "UsoInterno":true,
       "Antimicrobiano":false,
       "Bula":null,
       "Portaria344":"",
       "ControleEspecial":false,
       "TISS":"540916090022803",
       "MIP":true,
       "Label":"ESTOMAZIL (462+90+438)MG/G - PO EFERVESCENTE",
       "Unificado":null,
       "createdAt" : new Date(),
       "updatedAt" : new Date()
    },
    
    {  
      "id":31553,
      "Nome":"DIGIAZIA",
      "Farmaco":null,
      "Farmacos":"ACIDO CITRICO,CARBONATO DE SODIO,BICARBONATO DE SODIO,ACIDO ACETILSALICILICO",
      "Concentracao":"460 + 100 + 440",
      "Unidade":"MG/G",
      "TipoMedicamento":"REFERENCIA",
      "FormaFarmaceutica":"PO EFERVESCENTE",
      "ViaAdministracao":"ORAL",
      "CodigoATC":"A02A1",
      "UsoInterno":true,
      "Antimicrobiano":false,
      "Bula":null,
      "Portaria344":"",
      "ControleEspecial":false,
      "TISS":"526217070014604",
      "MIP":true,
      "Label":"DIGIAZIA 460 + 100 + 440MG/G - PO EFERVESCENTE",
      "Unificado":null,
      "createdAt" : new Date(),
      "updatedAt" : new Date()
   },
   {  
    "id":31692,
    "Nome":"FRUTAXX",
    "Farmaco":null,
    "Farmacos":"ACIDO CITRICO,CARBONATO DE SODIO,BICARBONATO DE SODIO",
    "Concentracao":"462 + 438 + 90",
    "Unidade":"MG/G",
    "TipoMedicamento":"REFERENCIA",
    "FormaFarmaceutica":"PO EFERVESCENTE",
    "ViaAdministracao":"ORAL",
    "CodigoATC":"A02A1",
    "UsoInterno":true,
    "Antimicrobiano":false,
    "Bula":null,
    "Portaria344":"",
    "ControleEspecial":false,
    "TISS":"533017040065104",
    "MIP":true,
    "Label":"FRUTAXX 462 + 438 + 90MG/G - PO EFERVESCENTE",
    "Unificado":null,
    "createdAt" : new Date(),
    "updatedAt" : new Date()
 },
 {  
  "id":39550,
  "Nome":"SIMETICONA;EMULSAO DE SIMETICONE 30%",
  "Farmaco":null,
  "Farmacos":"SIMETICONA,EMULSAO DE SIMETICONE 30%",
  "Concentracao":"75",
  "Unidade":"MG/ML",
  "TipoMedicamento":"GENERICO",
  "FormaFarmaceutica":"EMULSAO ORAL",
  "ViaAdministracao":"ORAL",
  "CodigoATC":"A02A2",
  "UsoInterno":true,
  "Antimicrobiano":false,
  "Bula":null,
  "Portaria344":"",
  "ControleEspecial":false,
  "TISS":"510417020149606",
  "MIP":true,
  "Label":"SIMETICONA;EMULSAO DE SIMETICONE 30% 75MG/ML - EMULSAO ORAL",
  "Unificado":null,
  "createdAt" : new Date(),
  "updatedAt" : new Date()
}
 ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
