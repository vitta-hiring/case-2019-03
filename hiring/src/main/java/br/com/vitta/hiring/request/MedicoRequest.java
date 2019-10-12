package br.com.vitta.hiring.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Data
@Getter
public class MedicoRequest {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer idMedico;

    @NotNull
    private String nome;

    @NotNull
    private String crm;
}
