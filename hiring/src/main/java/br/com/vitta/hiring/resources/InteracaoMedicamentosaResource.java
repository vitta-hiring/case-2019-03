package br.com.vitta.hiring.resources;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.InteracaoMedicamentosaEntity;
import br.com.vitta.hiring.model.MedicoEntity;
import br.com.vitta.hiring.request.InteracaoMedicamentosaRequest;
import br.com.vitta.hiring.request.MedicoRequest;
import br.com.vitta.hiring.responses.InteracaoMedicamentosaResponse;
import br.com.vitta.hiring.responses.MedicoResponse;
import br.com.vitta.hiring.service.InteracaoMedicamentosaService;
import br.com.vitta.hiring.service.MedicoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController("interacao-medicamentosa")
@Api(description = "Serviços de interacao medicamentosa")
public class InteracaoMedicamentosaResource {

    @Autowired
    private InteracaoMedicamentosaService service;

    private static final EventLog log = EventLog.defaults(InteracaoMedicamentosaResource.class);

    @GetMapping(value = "/interacao-medicamentosa/todos")
    @ApiOperation(value = "Consulta todos os medicos")
    public ResponseEntity<List<InteracaoMedicamentosaResponse>> consultaInteracoesMedicamentosas() {

        log.event().m("consultaInteracoesMedicamentosas").state(EventLog.State.NEW).info();

        final List<InteracaoMedicamentosaResponse> responseList = new ArrayList<>();
        List<InteracaoMedicamentosaEntity> entitys = service.getAll();
        if(CollectionUtils.isNotEmpty(entitys)){
            entitys.stream().forEach(interacao -> responseList.add(new InteracaoMedicamentosaResponse(interacao)));
        }

        log.event().m("consultaInteracoesMedicamentosas").state(EventLog.State.SUCCESS).info();

        return ResponseEntity.ok(responseList);
    }



    @PostMapping({"/interacao-medicamentosa/salvar"})
    @ApiOperation("Salva uma interacao medicamentosa")
    public ResponseEntity inserirInteracaoMedicamentosa(@Valid InteracaoMedicamentosaRequest request) {
        this.service.insert(new InteracaoMedicamentosaEntity(request));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping({"/interacao-medicamentosa/{id}"})
    @ApiOperation("Apaga uma interacao medicamentosa pelo Id")
    public ResponseEntity deletarInteracaoMedicamentosa(@PathVariable("id") Integer id) {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }
}