package br.com.vitta.hiring.resources;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.MedicamentoEntity;
import br.com.vitta.hiring.request.MedicamentoRequest;
import br.com.vitta.hiring.responses.MedicamentosResponse;
import br.com.vitta.hiring.service.MedicamentoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController("medicamento")
@Api(description = "Serviços de medicamentos")
public class MedicamentoResource {

    @Autowired
    private MedicamentoService service;

    private static final EventLog log = EventLog.defaults(MedicamentoResource.class);

    @GetMapping(value = "/medicamentos/todos")
    @ApiOperation(value = "Consulta todos os medicamentos")
    public ResponseEntity<List<MedicamentosResponse>> consultAll() {

        log.event().m("consultAll").state(EventLog.State.NEW).info();

        final List<MedicamentosResponse> responseList = new ArrayList<>();
        List<MedicamentoEntity> entitys = service.getAll();
        if(CollectionUtils.isNotEmpty(entitys)){
            entitys.stream().forEach(med -> responseList.add(new MedicamentosResponse(med)));
        }

        log.event().m("consultAll").state(EventLog.State.SUCCESS).info();

        return ResponseEntity.ok(responseList);
    }



    @PostMapping({"/medicamentos/salvar"})
    @ApiOperation("Salva um medicamento")
    public ResponseEntity inserirMedicamento(@Valid MedicamentoRequest request) {
        this.service.insert(new MedicamentoEntity(request));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping({"/medicamentos/{id}"})
    @ApiOperation("Apaga um medicamento pelo Id")
    public ResponseEntity deletarMedicamento(@PathVariable("id") Integer id) {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping({"/medicamentos/atualizar"})
    @ApiOperation("Salvar um medicamento pelo Id")
    public ResponseEntity updateMedicamento(@Valid @RequestBody MedicamentoRequest request) {
        this.service.update(new MedicamentoEntity(request));
        return ResponseEntity.ok().build();
    }
}