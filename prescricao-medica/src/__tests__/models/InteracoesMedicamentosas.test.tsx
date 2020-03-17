import interacoesMedicamentosas from "../../models/InteracoesMedicamentosas";
import InteracaoMedicamentosa from "../../models/InteracaoMedicamentosa";

let interacoes: any;

beforeAll(()=> {
  interacoes = interacoesMedicamentosas;
})

test('Checa se 2 farmacos com interacao retornam uma interacao', () => {
  expect(interacoes.haInteracao('ACETAZOLAMIDA','NORTRIPTILINA'))
    .toBeInstanceOf(InteracaoMedicamentosa);
})

test('Checa se 2 farmacos com interacao na ordem trocada retornam uma' +
  'interacao', () => {
  expect(interacoes.haInteracao('NORTRIPTILINA','ACETAZOLAMIDA'))
    .toBeInstanceOf(InteracaoMedicamentosa);
})

test('Checa se 2 farmacos sem interacao retornam nulo', () => {
  expect(interacoes.haInteracao('NORTRIPTILINA','ACETAZOLAMI')).toBeNull();
})

