package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.PacienteEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PacienteResponse {

    private Integer idPaciente;

    private String nome;

    private String cpf;

    @Builder
    public PacienteResponse(final PacienteEntity paciente) {
        if (paciente != null) {
            idPaciente = paciente.getId();
            nome = paciente.getNomePaciente();
            cpf = paciente.getCpf();
        }
    }
}
