package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.MedicamentoEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@Setter
public class MedicamentosResponse {

    private Integer idMedicamento;

    private String nome;

    private String farmaco;

    private List<String> farmacos;

    private Integer concentracao;

    private String unidade;

    private String tipoMedicamento;

    private String formaFarmaceutica;

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

    @Builder
    public MedicamentosResponse(final MedicamentoEntity medicamentoEntity) {
        if (medicamentoEntity != null) {
            idMedicamento = medicamentoEntity.getId();
            nome = medicamentoEntity.getNomeMedicamento();
            concentracao = medicamentoEntity.getConcentracao();
            unidade = medicamentoEntity.getUnidade();
            tipoMedicamento = medicamentoEntity.getTipoMedicamento();
            formaFarmaceutica = medicamentoEntity.getFormaFarmaceutica();
            viaAdministracao = medicamentoEntity.getViaAdministracao();
            codigoATC = medicamentoEntity.getCodigoAtc();
            usoInterno = medicamentoEntity.isUsoInterno();
            antimicrobiano = medicamentoEntity.isAntimicrobiano();
            bula = medicamentoEntity.getBula();
            portaria344 = medicamentoEntity.getPortaria();
            controleEspecial = medicamentoEntity.isControleEspecial();
            tiss = medicamentoEntity.getTiss();
            mip = medicamentoEntity.isMip();
            label = medicamentoEntity.getLabel();
            unificado = medicamentoEntity.getUnificado();
        }
    }
}
