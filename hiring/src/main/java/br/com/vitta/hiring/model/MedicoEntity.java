package br.com.vitta.hiring.model;

import br.com.vitta.hiring.request.MedicoRequest;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "medico")
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicoEntity {

    @Id
    @Column(name = "idt_medico", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_medico_idt")
    @SequenceGenerator(name = "sq_medico_idt", sequenceName = "sq_medico_idt", allocationSize = 1)
    private Integer id;

    @Column(name= "des_nome_medico")
    private String nomeMedico;

    @Column(name= "des_crm")
    private String crm;

    @Builder
    public MedicoEntity(MedicoRequest request) {
        if (request != null) {
            id = request.getIdMedico();
            nomeMedico = request.getNome();
            crm = request.getCrm();
        }
    }

    public MedicoEntity(Integer id) {
        this.id = id;
    }
}
