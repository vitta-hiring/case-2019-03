package br.com.vitta.hiring.responses;

import br.com.vitta.hiring.model.MedicamentoEntity;
import br.com.vitta.hiring.model.MedicoEntity;
import br.com.vitta.hiring.model.PacienteEntity;
import br.com.vitta.hiring.model.PrescricaoMedicamentoEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
@Setter
public class PrescricaoMedicamentoResponse {

    private List<MedicamentoResponse> medicamentoResponse;

    private Integer posologia;

    @Builder
    public PrescricaoMedicamentoResponse(final List<MedicamentoEntity> medicamentos, Integer quantidade) {

        if (CollectionUtils.isNotEmpty(medicamentos)) {
            List<MedicamentoResponse> responses = new ArrayList<>();
            responses.addAll(medicamentos.stream()
                    .map(med -> new MedicamentoResponse(med)).collect(Collectors.toList()));
            this.medicamentoResponse = responses;
        }
        this.posologia = quantidade;
    }

    @Builder
    public PrescricaoMedicamentoResponse(final PrescricaoMedicamentoEntity entity) {
        if (entity != null) {
//            if (CollectionUtils.isNotEmpty(entity.getMedicamento())) {
//                List<MedicamentoResponse> responses = new ArrayList<>();
//                responses.addAll(entity.getMedicamento().stream()
//                        .map(med -> new MedicamentoResponse(med)).collect(Collectors.toList()));
//                this.medicamentoResponse = responses;
//            }

            this.medicamentoResponse = Arrays.asList(new MedicamentoResponse(entity.getMedicamento()));
            this.posologia = entity.getPosologia();
        }
    }


}
