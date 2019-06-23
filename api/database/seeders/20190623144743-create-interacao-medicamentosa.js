'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Interacao_Medicamentosas', [
      {  
        'Farmaco1':'NORTRIPTILINA',
        'Farmaco2':'ACETAZOLAMIDA',
        'Nome':'Leve',
        'Descricao':'Acetazolamida pode diminuir a excreção urinária de antidepressivos tricíclicos, por alcalinização da urina. Esta interação é pouco provável que seja clinicamente importante.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'LIDOCAINA + OXITETRACICLINA',
        'Farmaco2':'ACETAZOLAMIDA',
        'Nome':'Leve',
        'Descricao':'A administração concomitante de tetraciclinas e diuréticos pode resultar em diminuição da função renal, manifestado pelo aumento da creatinina sérica e uréia (BUN). Geralmente, não é necessária a intervenção clínica, a menos que a função renal tenha uma diminuição. Se a função renal deteriora, a suspensão de um ou ambos os agentes podem ser necessário.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'TETRACICLINA',
        'Farmaco2':'ACETAZOLAMIDA',
        'Nome':'Leve',
        'Descricao':'A co-administração de diuréticos e tetraciclinas pode resultar na diminuição da função renal manifestada por aumentos na creatinina sérica e nitrogênio uréico sangüíneo (BUN). Normalmente, não é necessária intervenção clínica, a menos que a função renal diminuir significamente. Se a função renal deteriorar, interrupção de um ou ambos os agentes podem ser necessários.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'AMINOFILINA',
        'Farmaco2':'ACICLOVIR',
        'Nome':'Leve',
        'Descricao':'Dados limitados sugerem que a combinação de uma metilxantina com aciclovir podem conduzir a elevados níveis da teofilina e potencialização farmacológica dos efeitos adversos. O mecanismo pode ser devido à inibição do metabolismo oxidativo da teofilina. Monitorização clínica e laboratorial se justifica se estes agentes são administrados simultaneamente. Pacientes recebendo esta combinação devem ser aconselhados a relatar quaisquer sinais de toxicidade pela teofilina incluindo náuseas, vômitos, diarréia, dor de cabeça, agitação, insônia, batimento cardíaco irregular ao seu médico.   ',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'TEOFILINA',
        'Farmaco2':'ACICLOVIR',
        'Nome':'Leve',
        'Descricao':'Dados limitados sugerem que a combinação de um metil xantina com aciclovir podem conduzir a elevados níveis da teofilina e a potencialização farmacológica e efeitos adversos. O mecanismo pode ser devido à inibição do metabolismo oxidativo da teofilina. Monitorização clínica e laboratorial se justifica se estes agentes são dadas simultaneamente. Os pacientes recebendo esta combinação devem ser aconselhados a relatar quaisquer sinais de toxicidade da teofilina incluindo náuseas, vômitos, diarréia, dor de cabeça, agitação, insônia, batimento cardíaco irregular ou ao seu médico.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'ZIDOVUDINA',
        'Farmaco2':'ACICLOVIR',
        'Nome':'Leve',
        'Descricao':'Letargia excessiva tem sido relatada em pacientes recebendo concomitante de aciclovir e zidovudina. Essa interação não tem sido relatada com valaciclovir. O mecanismo da interação é desconhecido. Redução da dosagem pode ser necessário.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'SOTALOL',
        'Farmaco2':'ACIDO ACETILSALICILICO',
        'Nome':'Leve',
        'Descricao':'Altas doses de salicilatos pode atenuar o efeito anti-hipertensivos dos beta-bloqueadores. O mecanismo proposto é a inibição de síntese de prostaglandinas. Uma dose baixa de aspirina aparentemente não afeta a pressão arterial. Além disso, os beta-bloqueadores pode exercer um efeito antiagregante, que pode ser aditivo com os efeitos de alguns salicilatos. Metoprolol  também podem aumentar a absorção e / ou concentrações plasmáticas de salicilatos, entretanto, o significado clínico deste efeito é desconhecido. Os dados têm sido conflitantes. Até mais informação estiver disponível, os pacientes que necessitam de terapia concomitante deve ser monitorizado sempre um salicilato é introduzido ou descontinuado, ou quando a sua dosagem é modificada.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'TIMOLOL',
        'Farmaco2':'ACIDO ACETILSALICILICO',
        'Nome':'Leve',
        'Descricao':'Altas doses de salicilatos pode alterar os efeitos anti-hipertensivos dos beta-bloqueadores. O mecanismo proposto é a inibição de síntese de prostaglandinas. Uma dose baixa de aspirina parece não afetar a pressão arterial. Além disso, a beta-bloqueadores podem exercer um efeito antiagregante, que pode ser aditivo com os efeitos de alguns salicilatos. Metoprolol também podem aumentar a absorção e / ou concentrações plasmáticas de salicilatos, entretanto, o significado clínico deste efeito é desconhecido. Os dados têm sido conflitantes. Até que mais informações estejam disponíveis, os pacientes que necessitam de terapia concomitante deve ser monitorizado para alteração uma resposta sempre que é introduzida ou interrompida, ou quando a sua dosagem é modificada.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'MEXILETINA',
        'Farmaco2':'ACIDO ASCORBICO',
        'Nome':'Leve',
        'Descricao':'Agentes que acidificar a urina aumentar a depuração plasmática da mexiletina. O resultado pode ser diminuição dos níveis plasmáticos da mexiletina e diminuiu eficácia. A relevância clínica é desconhecida. Recomenda-se que tais drogas ou dieta deve ser interrompido ou que mexiletina tenha dose aumentada conforme necessário e tolerado.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'OXCARBAZEPINA',
        'Farmaco2':'ACIDO VALPROICO',
        'Nome':'Leve',
        'Descricao':'Algumas drogas antiepilépticas moderadamente pode diminuir as concentrações plasmáticas do MHD, o metabolito ativo da oxcarbazepina. O mecanismo pode estar relacionado à indução do CYP450 no metabolismo hepático. O efeito da oxcarbazepina sobre as concentrações plasmáticas de algumas drogas antiepilépticas é variável. Oxcarbazepina doses superiores a 1.200 mg / dia pode aumentar os níveis de fenitoína em até 40% e os níveis de fenobarbital em 15%. Ajuste de dose pode ser indicado se uma interação é suspeita.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'AMINOFILINA',
        'Farmaco2':'ALOPURINOL',
        'Nome':'Leve',
        'Descricao':'Alopurinol pode inibir o metabolismo das xantinas, possivelmente aumenta as concentrações séricas e do risco de toxicidade. Esta interação pode ser mais provável de ocorrer com alopurinol em doses diárias de 600 mg ou mais. O mecanismo é desconhecido e os dados de estudos controlados têm sido conflitantes. Pacientes recebendo esta combinação devem ser aconselhados a relatar quaisquer sinais de toxicidade da teofilina incluindo náuseas, vômitos, diarréia, dor de cabeça, agitação, insônia, batimento cardíaco irregular ou ao seu médico.  ',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     },
     {  
        'Farmaco1':'TAMOXIFENO',
        'Farmaco2':'ALOPURINOL',
        'Nome':'Leve',
        'Descricao':'Dados limitados sugerem que o tamoxifeno pode diminuir o metabolismo hepático de alopurinol. Além disso, o risco de hepatotoxicidade pode ser maior do que com o uso concomitante com qualquer agente sozinho. A relevância clínica é desconhecida. Pacientes que receberam ambos os agentes devem ser monitorizados para hepatotoxicidade.',
        'createdAt' : new Date(),
        'updatedAt' : new Date()
     }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Interacao_Medicamentosas', null, {});
  }
};