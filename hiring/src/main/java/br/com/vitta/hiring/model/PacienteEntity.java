package br.com.vitta.hiring.model;

import br.com.vitta.hiring.request.PacienteRequest;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "paciente")
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PacienteEntity {

    @Id
    @Column(name = "idt_paciente", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_paciente_idt")
    @SequenceGenerator(name = "sq_paciente_idt", sequenceName = "sq_paciente_idt", allocationSize = 1)
    private Integer id;

    @Column(name= "des_paciente")
    private String nomePaciente;

    @Column(name= "des_cpf")
    private String cpf;

    @Builder
    public PacienteEntity(PacienteRequest request) {
        if (request != null) {
            id = request.getIdPaciente();
            nomePaciente = request.getNome();
            cpf = request.getCpf();
        }
    }

    public PacienteEntity(Integer id){
        this.id = id;
    }

}
