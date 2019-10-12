package br.com.vitta.hiring.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Data
@Getter
public class PacienteRequest {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer idPaciente;

    @NotNull
    private String nome;

    @NotNull
    private String cpf;
}
