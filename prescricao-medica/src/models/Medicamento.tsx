export default class Medicamento {

  constructor(
    readonly idMedicamento: number, readonly nome: string, 
    readonly farmaco: any, readonly farmacos: string[], 
    readonly concentracao: string, readonly unidade: string,
    readonly tipoMedicamento: string, readonly formaFarmaceutica: string,
    readonly viaAdministracao: string, readonly codigoATC: string,
    readonly usoInterno: boolean, readonly antimicrobiano: boolean,
    readonly bula: string, readonly portaria344: string,
    readonly controleEspecial: boolean, readonly tiss: string,
    readonly mip: boolean, readonly label: string, readonly unificado: any,
    ) {}

  static converteDeJson(json: any): Medicamento {
    let testaCampos = Medicamento.testaSeJsonValido(json);

    if(testaCampos)
      return new Medicamento(json.IdMedicamento,json.Nome,json.Farmaco,json.Farmacos,json.Concentracao,json.Unidade,json.TipoMedicamento,json.FormaFarmaceutica,json.ViaAdministracao,json.CodigoATC,json.UsoInterno,json.Antimicrobiano,json.Bula,json.Portaria344,json.ControleEspecial,json.TISS,json.MIP,json.Label,json.Unificado);
    throw new Error('Um dos medicamentos eh invalido');
  }

  private static testaSeJsonValido(json: any) {
    let camposJson = ["IdMedicamento", "Nome", "Farmaco", "Farmacos", "Concentracao", "Unidade", "TipoMedicamento", "FormaFarmaceutica", "ViaAdministracao", "CodigoATC", "UsoInterno", "Antimicrobiano", "Bula", "Portaria344", "ControleEspecial", "TISS", "MIP", "Label", "Unificado"];
    return camposJson.reduce((acumulador: any, atual) =>
      (acumulador && atual in json) ? true : false
    , true);
  }
}