package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.MedicoEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class MedicoResponse {

    private Integer idMedico;

    private String nome;

    private String crm;

    @Builder
    public MedicoResponse(final MedicoEntity medico) {
        if (medico != null) {
            idMedico = medico.getId();
            nome = medico.getNomeMedico();
            crm = medico.getCrm();
        }
    }
}
