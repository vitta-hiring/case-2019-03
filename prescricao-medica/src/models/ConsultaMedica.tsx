import PrescricaoMedica from "./PrescricaoMedica";
import InteracaoMedicamentosa from "./InteracaoMedicamentosa";
import interacoesMedicamentosas from "./InteracoesMedicamentosas";
import medicamentos from "./Medicamentos";

export default class ConsultaMedica {

  private prescricoes_: PrescricaoMedica[] = [];
  private interacoesDasPrescricoes_: InteracaoMedicamentosa[] = [];
  
  constructor( 
    readonly medico:string, 
    readonly paciente:string, 
    readonly data:Date
  ) {}

  get prescricoes(): PrescricaoMedica[] {
    return this.prescricoes_;
  }

  get interacoesDasPrescricoes(): InteracaoMedicamentosa[] {
    return this.interacoesDasPrescricoes_;
  }

  adicionaPrescricao(prescricao: PrescricaoMedica): void {
    this.consultaInteracaoComPrescricoesAnteriores(prescricao)
    this.prescricoes_.push(prescricao);
  }

  private consultaInteracaoComPrescricoesAnteriores(
    prescricaoNovo: PrescricaoMedica
  ): void {
    this.prescricoes_.forEach(prescricao => {
      this.consultaInteracaoEntreDuasPrescricoes(prescricao, prescricaoNovo);
    })
  }

  private consultaInteracaoEntreDuasPrescricoes(
    prescricao1: PrescricaoMedica, 
    prescricao2: PrescricaoMedica
  ): void {
    prescricao1.remedio.farmacos.forEach(farmacoPrescricao1 => {
      prescricao2.remedio.farmacos.forEach(farmacoPrescricao2 => {
        let interacao = 
          this.consultaInteracaoDoisFarmacos(farmacoPrescricao2, farmacoPrescricao1);
        if (interacao !== null)
          this.interacoesDasPrescricoes_.push(interacao);
      });
    });
  }

  private consultaInteracaoDoisFarmacos(
    farmaco1: string, 
    farmaco2: string
  ): InteracaoMedicamentosa | null {
    return interacoesMedicamentosas.haInteracao(farmaco1,farmaco2);
  }

  public static resgataConsultas (
    medico:string, 
    paciente:string, 
    data:Date,
    prescricoes:PrescricaoMedica[]
  ): ConsultaMedica {
    const consulta = new ConsultaMedica(medico,paciente,data);
    prescricoes.forEach(prescricao => {
      const medicamento = medicamentos.buscaRemedio(prescricao.remedio.nome);
      if(medicamento !== null) {
        consulta.adicionaPrescricao(
          new PrescricaoMedica(medicamento,prescricao.posologia,
            prescricao.viaAdministracao
          )
        )
      }
    })
    return consulta;
  }

}