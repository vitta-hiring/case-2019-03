import dadosMedicamentosJson from "../static/medicamentos.json";
import Medicamento from "./Medicamento";

class Medicamentos {

  private medicamentos_: Map<string,Medicamento> = new Map();

  constructor() {
    this.inicializaEstruturaDeMedicamentos();
  }

  private inicializaEstruturaDeMedicamentos(): void {
    let dadosMedicamentos:any = dadosMedicamentosJson;
    dadosMedicamentos.forEach((medicamentoJson: any)=> {
      let chaveDoMedicamento = this.gerarChave(medicamentoJson.Nome);
      let medicamento;
      try {
        medicamento = Medicamento.converteDeJson(medicamentoJson);
        this.medicamentos_.set(chaveDoMedicamento,medicamento);
      } catch(e) {
        console.log(e);
      }
    });
  }

  buscaRemedio(remedioBuscado: string): Medicamento | null {
    let remedio = 
      this.medicamentos_.get(this.gerarChave(remedioBuscado)); 
    if(remedio !== undefined) {
      return remedio;
    }
    return null;
  }

  private gerarChave(remedio: string): string {
    return remedio.toUpperCase();
  }
}

const medicamentos = new Medicamentos();
Object.freeze(medicamentos)

export default medicamentos;