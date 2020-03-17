export default class InteracaoMedicamentosa {

  constructor(
    readonly farmaco1: string,
    readonly farmaco2: string,
    readonly nome: string,
    readonly descricao: string
  ) {}

  static converteDeJson(json: any): InteracaoMedicamentosa {
    if(!json["Farmaco1"] || !json["Farmaco2"] || !json["Nome"] || !json["Descricao"])
      throw new Error('Uma das interacoes eh invalida');
    return new InteracaoMedicamentosa(json.Farmaco1,json.Farmaco2,json.Nome,
      json.Descricao);
  }
}