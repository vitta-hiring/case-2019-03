package br.com.vitta.hiring.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Data
@Getter
@Setter
public class InteracaoMedicamentosaRequest {

    @NotNull
    private String farmaco1;

    @NotNull
    private String farmaco2;

    @NotNull
    private String nome;

    @NotNull
    private String descricao;
}
