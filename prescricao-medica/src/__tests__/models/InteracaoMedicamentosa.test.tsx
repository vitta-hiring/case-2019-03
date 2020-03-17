import InteracaoMedicamentosa from "../../models/InteracaoMedicamentosa";

test('Checa se gera InteracaoMedicamentosa de JSON valido', () => {
  let element = {
    "Farmaco1":"VORTIOXETINA",
    "Farmaco2":"CITALOPRAM",
    "Nome":"Grave",
    "Descricao":"O uso concomitante de vortioxetina e agentes serotonérgicos "
      +" pode resultar em aumento do risco de síndrome serotoninérgica "+
      "(hipertensão, hipertermia,mioclonia,alterações do estado mental).",
  }
  let interacao = InteracaoMedicamentosa.converteDeJson(element);
  expect(interacao.descricao).toBe(element.Descricao);
  expect(interacao.farmaco1).toBe(element.Farmaco1);
  expect(interacao.farmaco2).toBe(element.Farmaco2);
  expect(interacao.nome).toBe(element.Nome);
})

test('Checa se um JSON invalido retorna erro', () => {
  let element = {
    "Farmaco1":"VORTIOXETINA",
    "farmaco2":"CITALOPRAM",
    "Nome":"Grave",
    "Descricao":"O uso concomitante de vortioxetina e agentes serotonérgicos "
      +" pode resultar em aumento do risco de síndrome serotoninérgica "+
      "(hipertensão, hipertermia,mioclonia,alterações do estado mental).",
  }
  expect(()=> InteracaoMedicamentosa.converteDeJson(element))
    .toThrowError();
})

