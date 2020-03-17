import interacoesMedicamentosas from "../../models/InteracoesMedicamentosas";
import InteracaoMedicamentosa from "../../models/InteracaoMedicamentosa";
import ConsultaMedica from "../../models/ConsultaMedica";
import Medicamento from "../../models/Medicamento";
import PrescricaoMedica from "../../models/PrescricaoMedica";

let interacoes: any;
let consulta: ConsultaMedica;
let medicamentoA: Medicamento;

beforeAll(()=> {
  interacoes = interacoesMedicamentosas;
  medicamentoA = new Medicamento(36385,"RETAPAMULINA",null,["RETAPAMULINA"],"10","MG/G","GENERICO","POMADA DERMATOLOGICA","TOP","D06AX13",true,true,"http://www.anvisa.gov.br/datavisa/fila_bula/frmVisualizarBula.asp?pNuTransacao=9442872014&pIdAnexo=2273137","",false,"510611203161218",false,"RETAPAMULINA 10MG/G - POMADA DERMATOLOGICA",null);
})

beforeEach(()=> {
  consulta = new ConsultaMedica('Raphael','Alexandre',new Date());
})

test('Checa se ao adicionar 2 remédios com interacao gera interacao', () => {

  let medicamentoB = new Medicamento(36385,"ERITROMICINA",null,["ERITROMICINA"],"10","MG/G","GENERICO","POMADA DERMATOLOGICA","TOP","D06AX13",true,true,"http://www.anvisa.gov.br/datavisa/fila_bula/frmVisualizarBula.asp?pNuTransacao=9442872014&pIdAnexo=2273137","",false,"510611203161218",false,"RETAPAMULINA 10MG/G - POMADA DERMATOLOGICA",null);

  let prescricaoA = new PrescricaoMedica(medicamentoA,'2 em 2 dias','oral');
  let prescricaoB = new PrescricaoMedica(medicamentoB,'3 em 3 dias','oral');
  consulta.adicionaPrescricao(prescricaoA);
  consulta.adicionaPrescricao(prescricaoB);

  expect(consulta.prescricoes.length).toBe(2);
  expect(consulta.interacoesDasPrescricoes.length).toBe(1);
  expect(consulta.interacoesDasPrescricoes[0].nome).toBe("Leve");
})

test('Checa se ao adicionar 2 remédios sem interacao não gera interacao', () => {

  let medicamentoB = new Medicamento(36385,"ERITROMICIN",null,["ERITROMICIN"],"10","MG/G","GENERICO","POMADA DERMATOLOGICA","TOP","D06AX13",true,true,"http://www.anvisa.gov.br/datavisa/fila_bula/frmVisualizarBula.asp?pNuTransacao=9442872014&pIdAnexo=2273137","",false,"510611203161218",false,"RETAPAMULINA 10MG/G - POMADA DERMATOLOGICA",null);

  let prescricaoA = new PrescricaoMedica(medicamentoA,'2 em 2 dias','oral');
  let prescricaoB = new PrescricaoMedica(medicamentoB,'3 em 3 dias','oral');
  consulta.adicionaPrescricao(prescricaoA);
  consulta.adicionaPrescricao(prescricaoB);

  expect(consulta.prescricoes.length).toBe(2);
  expect(consulta.interacoesDasPrescricoes.length).toBe(0);
})

