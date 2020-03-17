import Medicamento from "./Medicamento";

export default class PrescricaoMedica {

  constructor(
    readonly remedio: Medicamento, 
    readonly posologia: string,
    readonly viaAdministracao: string
  ) {}
}