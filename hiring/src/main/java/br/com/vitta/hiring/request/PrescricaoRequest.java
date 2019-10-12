package br.com.vitta.hiring.request;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Getter
public class PrescricaoRequest {

    @NotNull
    private Integer idPaciente;

    @NotNull
    private Integer idMedico;

    @NotNull
    private Integer idMedicamento;

    @NotNull
    private Integer qtddMedicamento;

}
