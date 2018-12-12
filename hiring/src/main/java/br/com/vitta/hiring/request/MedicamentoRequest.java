package br.com.vitta.hiring.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@Getter
@Setter
public class MedicamentoRequest {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer idMedicamento;

    @NotNull
    private String nome;

    private Integer concentracao;

    private String unidade;

    private String tipoMedicamento;

    private String formaFarmaceutica;

    @NotNull
    private String viaAdministracao;

    private String codigoATC;

    private boolean usoInterno;

    private boolean antimicrobiano;

    private String bula;

    private String portaria344;

    private boolean controleEspecial;

    private String tiss;

    private boolean mip;

    private String label;

    private String unificado;

}
