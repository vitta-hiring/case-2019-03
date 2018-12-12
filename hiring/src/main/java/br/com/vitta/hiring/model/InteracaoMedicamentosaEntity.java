package br.com.vitta.hiring.model;

import br.com.vitta.hiring.request.InteracaoMedicamentosaRequest;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "interacao_medicamentosa")
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InteracaoMedicamentosaEntity {

    @Id
    @Column(name = "idt_interacao_medicamentosa", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_interacaomedic_idt")
    @SequenceGenerator(name = "sq_interacaomedic_idt", sequenceName = "sq_interacaomedic_idt", allocationSize = 1)
    private Integer id;

    @Column(name= "des_farmaco1")
    private String farmaco1;

    @Column(name= "des_farmaco2")
    private String farmaco2;

    @Column(name= "nom_interacao_medicamentosa")
    private String nomeInteracaoMedicamentosa;

    @Column(name= "des_interacao_medicamentosa")
    private String descricaoInteracaoMedicamentosa;

    public InteracaoMedicamentosaEntity(InteracaoMedicamentosaRequest request){
        if(request != null){
            this.farmaco1 = request.getFarmaco1();
            this.farmaco2 = request.getFarmaco2();
            this.nomeInteracaoMedicamentosa = request.getNome();
            this.descricaoInteracaoMedicamentosa = request.getDescricao();
        }
    }

}
