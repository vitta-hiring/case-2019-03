package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.PrescricaoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Getter
@Setter
public class PrescricaoResponse {

    private MedicoResponse medicoResponse;

    private PacienteResponse pacienteResponse;

    private PrescricaoMedicamentoResponse prescricaoMedicamentoResponse;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;

    public PrescricaoResponse(final PrescricaoEntity entity){
        if(entity != null) {
            this.medicoResponse = new MedicoResponse(entity.getMedicoEntity());
            this.pacienteResponse = new PacienteResponse(entity.getPacienteEntity());
            this.prescricaoMedicamentoResponse = new PrescricaoMedicamentoResponse(entity.getPrescricaoMedicamentoEntity());
            this.creationDate = entity.getCreationDate();
            this.updateDate = entity.getUpdateDate();
        }
    }
}
