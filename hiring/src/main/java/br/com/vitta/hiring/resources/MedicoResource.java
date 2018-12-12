package br.com.vitta.hiring.resources;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.MedicoEntity;
import br.com.vitta.hiring.request.MedicoRequest;
import br.com.vitta.hiring.responses.MedicoResponse;
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

@RestController("medico")
@Api(description = "Serviços de medico")
public class MedicoResource {

    @Autowired
    private MedicoService service;

    private static final EventLog log = EventLog.defaults(MedicoResource.class);

    @GetMapping(value = "/medico/todos")
    @ApiOperation(value = "Consulta todos os medicos")
    public ResponseEntity<List<MedicoResponse>> consultaMedicos() {

        log.event().m("consultaMedicos").state(EventLog.State.NEW).info();

        final List<MedicoResponse> responseList = new ArrayList<>();
        List<MedicoEntity> entitys = service.getAll();
        if(CollectionUtils.isNotEmpty(entitys)){
            entitys.stream().forEach(med -> responseList.add(new MedicoResponse(med)));
        }

        log.event().m("consultaMedicos").state(EventLog.State.SUCCESS).info();

        return ResponseEntity.ok(responseList);
    }



    @PostMapping({"/medico/salvar"})
    @ApiOperation("Salva um medico")
    public ResponseEntity inserirMedico(@Valid MedicoRequest request) {
        this.service.insert(new MedicoEntity(request));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping({"/medico/{id}"})
    @ApiOperation("Apaga um medico pelo Id")
    public ResponseEntity deletarMedico(@PathVariable("id") Integer id) {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping({"/medico/atualizar"})
    @ApiOperation("Salvar um medico pelo Id")
    public ResponseEntity updateMedico(@Valid @RequestBody MedicoRequest request) {
        this.service.update(new MedicoEntity(request));
        return ResponseEntity.ok().build();
    }
}