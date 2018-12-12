package br.com.vitta.hiring.model;

import br.com.vitta.hiring.request.PrescricaoRequest;
import lombok.*;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prescricao")
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescricaoEntity {

    @Id
    @Column(name = "idt_prescricao", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_prescricao_idt")
    @SequenceGenerator(name = "sq_prescricao_idt", sequenceName = "sq_prescricao_idt", allocationSize = 1)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "idt_paciente", nullable = false, referencedColumnName = "idt_paciente")
    private PacienteEntity pacienteEntity;

    @OneToOne
    @JoinColumn(name = "idt_medico", nullable = false, referencedColumnName = "idt_medico")
    private MedicoEntity medicoEntity;

    @OneToOne
    @JoinColumn(name = "idt_prescricao_medicamento", nullable = false, referencedColumnName = "idt_prescricao_medicamento")
    private PrescricaoMedicamentoEntity prescricaoMedicamentoEntity;

    @Column(name = "dat_create")
    private LocalDateTime creationDate;

    @Column(name = "dat_update")
    @LastModifiedDate
    private LocalDateTime updateDate;

    @PreUpdate
    public void setLastUpdate() {
        this.updateDate = LocalDateTime.now();
    }

    @PrePersist
    public void setLastCreate() {
        this.creationDate = LocalDateTime.now();
    }

    public PrescricaoEntity(PrescricaoRequest request){
        pacienteEntity = new PacienteEntity(request.getIdPaciente());
        medicoEntity = new MedicoEntity(request.getIdMedico());

        MedicamentoEntity medicamento = new MedicamentoEntity(request.getIdMedicamento());
               prescricaoMedicamentoEntity = new PrescricaoMedicamentoEntity(medicamento, request.getQtddMedicamento());
    }


}
