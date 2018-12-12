package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.InteracaoMedicamentosaEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Data
@Getter
@Setter
public class InteracaoMedicamentosaResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer id;

    private String farmaco1;

    private String farmaco2;

    private String nome;

    private String descricao;

    public InteracaoMedicamentosaResponse(InteracaoMedicamentosaEntity entity){
        if(entity != null){
            this.id = entity.getId();
            this.farmaco1 = entity.getFarmaco1();
            this.farmaco2 = entity.getFarmaco2();
            this.descricao = entity.getDescricaoInteracaoMedicamentosa();
            this.nome = entity.getNomeInteracaoMedicamentosa();
        }
    }
}
