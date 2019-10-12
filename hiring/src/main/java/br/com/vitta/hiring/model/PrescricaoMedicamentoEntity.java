package br.com.vitta.hiring.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "prescricao_medicamento")
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescricaoMedicamentoEntity {

    @Id
    @Column(name = "idt_prescricao_medicamento", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_prescmedicamento_idt")
    @SequenceGenerator(name = "sq_prescmedicamento_idt", sequenceName = "sq_prescmedicamento_idt", allocationSize = 1)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
    @JoinColumn(name = "idt_medicamento")
    private MedicamentoEntity medicamento;

    @Column(name= "qtd_medicamento")
    private Integer posologia;

    public PrescricaoMedicamentoEntity(MedicamentoEntity entity, Integer quantidade){
        this.medicamento = entity;
        this.posologia = quantidade;
    }

}
