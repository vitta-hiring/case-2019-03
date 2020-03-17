import InteracaoMedicamentosa from "./InteracaoMedicamentosa";
import dadosInteracoesMedicamentosas from "../static/interacao_medicamentosa.json";

class InteracoesMedicamentosas {

  private interacoesMedicamentosas_: Map<string,InteracaoMedicamentosa> = new Map();

  constructor() {
    this.inicializaEstruturaDeInteracoes();
  }

  private inicializaEstruturaDeInteracoes(): void {
    let dadosInteracoes:any = dadosInteracoesMedicamentosas;
    dadosInteracoes.data.forEach((element: any)=> {
      let chaveDaInteracao = this.gerarChave(element.Farmaco1,element.Farmaco2);
      let interacao;
      try {
        interacao = InteracaoMedicamentosa.converteDeJson(element);
        this.interacoesMedicamentosas_.set(chaveDaInteracao,interacao);
      } catch(e) {
        console.log(e.message());
      }
    });
  }

  haInteracao(farmaco1: string, farmaco2: string): InteracaoMedicamentosa | null {
    let interacao = 
      this.interacoesMedicamentosas_.get(this.gerarChave(farmaco1,farmaco2)); 
    if(interacao !== undefined) {
      return interacao;
    }

    interacao = 
      this.interacoesMedicamentosas_.get(this.gerarChave(farmaco2,farmaco1));   
    if(interacao !== undefined) {
      return interacao;
    }
    return null;
  }

  private gerarChave(farmaco1: string, farmaco2: string): string {
    return farmaco1.toUpperCase()+farmaco2.toUpperCase();
  }
}

const interacoesMedicamentosas = new InteracoesMedicamentosas();
Object.freeze(interacoesMedicamentosas)

export default interacoesMedicamentosas;