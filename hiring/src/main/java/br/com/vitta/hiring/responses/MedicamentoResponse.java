package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.MedicamentoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class MedicamentoResponse {

    private String nomeMedicamento;

    private String nomeFormaco;

    private Integer concentracao;

    private String unidade;

    private String tipoMedicamento;

    private String formaFarmaceutica;

    private String viaAdministracao;

    private String codigoAtc;

    private boolean isUsoInterno;

    private boolean isAntimicrobiano;

    private String bula;

    private String portaria;

    private boolean isControleEspecial;

    private String tiss;

    private boolean isMip;

    private String label;

    private String unificado;

    public MedicamentoResponse(final MedicamentoEntity entity){
        this.nomeMedicamento = entity.getNomeMedicamento();
        this.nomeFormaco = entity.getNomeFormaco();
        this.concentracao = entity.getConcentracao();
        this.unidade = entity.getUnidade();
        this.tipoMedicamento = entity.getTipoMedicamento();
        this.formaFarmaceutica = entity.getFormaFarmaceutica();
        this.viaAdministracao = entity.getViaAdministracao();
        this.codigoAtc = entity.getCodigoAtc();
        this.isUsoInterno = entity.isUsoInterno();
        this.isAntimicrobiano = entity.isAntimicrobiano();
        this.bula = entity.getBula();
        this.portaria = entity.getPortaria();
        this.isControleEspecial = entity.isControleEspecial();
        this.tiss = entity.getTiss();
        this.isMip = entity.isMip();
        this.label = entity.getLabel();
        this.unificado = entity.getUnificado();
    }
}
