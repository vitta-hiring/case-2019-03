import ConsultaMedica from "../models/ConsultaMedica";


export default class LocalStorageCalls {

  private static chaveLocalStorage = 'consultas';
  
  public static getConsultas(): ConsultaMedica[] | null {
    let consultas = localStorage.getItem(LocalStorageCalls.chaveLocalStorage);
    if(consultas !== null){
      const consultasParseadas = JSON.parse(consultas);
      const consultasMedicas: ConsultaMedica[] = [];
      consultasParseadas.forEach((consulta: any) =>
        consultasMedicas.push(ConsultaMedica.resgataConsultas(consulta.medico,
              consulta.paciente,consulta.data,consulta.prescricoes_))
      );
      return consultasMedicas;
    }
      
    throw Error('Não há consultas no localStorage.');
  }

  public static salvaConsultas(consultas: ConsultaMedica[]) {
    localStorage.setItem(
      LocalStorageCalls.chaveLocalStorage,
      JSON.stringify(consultas)
    );
  }

}