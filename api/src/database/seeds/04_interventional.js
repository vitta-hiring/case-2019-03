
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('medication_intervention').del()
    .then(function () {
      // Inserts seed entries
      return knex('medication_intervention').insert([
        {
          "id": 1,
          "pharmaco_one": "NORTRIPTILINA",
          "pharmacos_two": "ACETAZOLAMIDA",
          "name": "Leve",
          "description": "Acetazolamida pode diminuir a excreção urinária de antidepressivos tricíclicos, por alcalinização da urina. Esta interação é pouco provável que seja clinicamente importante."
        }, {
          "id": 2,
          "pharmaco_one": "LIDOCAINA + OXITETRACICLINA",
          "pharmacos_two": "ACETAZOLAMIDA",
          "name": "Leve",
          "description": "A administração concomitante de tetraciclinas e diuréticos pode resultar em diminuição da função renal, manifestado pelo aumento da creatinina sérica e uréia (BUN). Geralmente, não é necessária a intervenção clínica, a menos que a função renal tenha uma diminuição. Se a função renal deteriora, a suspensão de um ou ambos os agentes podem ser necessário."
        }, {
          "id": 3,
          "pharmaco_one": "TETRACICLINA",
          "pharmacos_two": "ACETAZOLAMIDA",
          "name": "Leve",
          "description": "A co-administração de diuréticos e tetraciclinas pode resultar na diminuição da função renal manifestada por aumentos na creatinina sérica e nitrogênio uréico sangüíneo (BUN). Normalmente, não é necessária intervenção clínica, a menos que a função renal diminuir significamente. Se a função renal deteriorar, interrupção de um ou ambos os agentes podem ser necessários."
        }
      ]);
    });
};
