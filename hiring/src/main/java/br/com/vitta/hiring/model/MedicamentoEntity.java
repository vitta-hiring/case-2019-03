package br.com.vitta.hiring.model;

import br.com.vitta.hiring.request.MedicamentoRequest;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "medicamento")
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicamentoEntity {

    @Id
    @Column(name = "idt_medicamento", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_medicamento_idt")
    @SequenceGenerator(name = "sq_medicamento_idt", sequenceName = "sq_medicamento_idt", allocationSize = 1)
    private Integer id;

    @Column(name= "des_nome_medicamento")
    private String nomeMedicamento;

    @Column(name= "des_farmaco")
    private String nomeFormaco;

    @Column(name= "des_concentracao")
    private Integer concentracao;

    @Column(name = "des_unidade")
    private String unidade;

    @Column(name = "des_tipo_medicamento")
    private String tipoMedicamento;

    @Column(name = "des_forma_farmaceutica")
    private String formaFarmaceutica;

    @Column(name = "des_via_administracao")
    private String viaAdministracao;

    @Column(name = "cod_atc")
    private String codigoAtc;

    @Column(name = "flg_uso_interno")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isUsoInterno;

    @Column(name = "flg_antimicrobiano")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isAntimicrobiano;

    @Column(name = "des_url_bula")
    private String bula;

    @Column(name = "des_portaria")
    private String portaria;

    @Column(name = "flg_controle_especial")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isControleEspecial;

    @Column(name = "des_tiss")
    private String tiss;

    @Column(name = "flg_mip")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isMip;

    @Column(name = "des_label")
    private String label;

    @Column(name = "des_unificado")
    private String unificado;

    @ManyToOne(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
    private PrescricaoMedicamentoEntity prescricaoMedicamento;

    public MedicamentoEntity(MedicamentoEntity entity){
        id = entity.getId();
        nomeMedicamento = entity.getNomeMedicamento();
        nomeFormaco = entity.getNomeFormaco();
        concentracao = entity.getConcentracao();
        unidade = entity.getUnidade();
        tipoMedicamento = entity.getTipoMedicamento();
        formaFarmaceutica = entity.getFormaFarmaceutica();
        viaAdministracao = entity.getViaAdministracao();
        codigoAtc = entity.getCodigoAtc();
        isUsoInterno = entity.isUsoInterno();
        isAntimicrobiano = entity.isAntimicrobiano();
        bula = entity.getBula();
        portaria= entity.getPortaria();
        isControleEspecial = entity.isControleEspecial();
        tiss = entity.getTiss();
        isMip = entity.isMip();
        label = entity.getLabel();
        unificado = entity.getUnificado();
    }

    @Builder
    public MedicamentoEntity(MedicamentoRequest request){
        if(request != null){
            id = request.getIdMedicamento();
            nomeMedicamento = request.getNome();
            concentracao = request.getConcentracao();
            unidade = request.getUnidade();
            tipoMedicamento = request.getTipoMedicamento();
            formaFarmaceutica = request.getFormaFarmaceutica();
            viaAdministracao = request.getViaAdministracao();
            codigoAtc = request.getCodigoATC();
            isUsoInterno = request.isUsoInterno();
            isAntimicrobiano = request.isAntimicrobiano();
            bula = request.getBula();
            portaria= request.getPortaria344();
            isControleEspecial = request.isControleEspecial();
            tiss = request.getTiss();
            isMip = request.isMip();
            label = request.getLabel();
            unificado = request.getUnificado();
        }
    }

    public MedicamentoEntity(Integer id){
        this.id = id;
    }



}
