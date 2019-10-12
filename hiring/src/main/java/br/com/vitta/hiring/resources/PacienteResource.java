package br.com.vitta.hiring.resources;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.MedicoEntity;
import br.com.vitta.hiring.model.PacienteEntity;
import br.com.vitta.hiring.request.MedicoRequest;
import br.com.vitta.hiring.request.PacienteRequest;
import br.com.vitta.hiring.responses.MedicoResponse;
import br.com.vitta.hiring.responses.PacienteResponse;
import br.com.vitta.hiring.service.MedicoService;
import br.com.vitta.hiring.service.PacienteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController("paciente")
@Api(description = "Serviços de paciente")
public class PacienteResource {

    @Autowired
    private PacienteService service;

    private static final EventLog log = EventLog.defaults(PacienteResource.class);

    @GetMapping(value = "/paciente/todos")
    @ApiOperation(value = "Consulta todos os pacientes")
    public ResponseEntity<List<PacienteResponse>> consultaPacientes() {

        log.event().m("consultaPacientes").state(EventLog.State.NEW).info();

        final List<PacienteResponse> responseList = new ArrayList<>();
        List<PacienteEntity> entitys = service.getAll();
        if(CollectionUtils.isNotEmpty(entitys)){
            entitys.stream().forEach(med -> responseList.add(new PacienteResponse(med)));
        }

        log.event().m("consultaPacientes").state(EventLog.State.SUCCESS).info();

        return ResponseEntity.ok(responseList);
    }



    @PostMapping({"/paciente/salvar"})
    @ApiOperation("Salva um paciente")
    public ResponseEntity inserirPaciente(@Valid PacienteRequest request) {
        this.service.insert(new PacienteEntity(request));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping({"/paciente/{id}"})
    @ApiOperation("Apaga um paciente pelo Id")
    public ResponseEntity deletarPaciente(@PathVariable("id") Integer id) {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping({"/paciente/atualizar"})
    @ApiOperation("Salvar um paciente pelo Id")
    public ResponseEntity updatePaciente(@Valid @RequestBody PacienteRequest request) {
        this.service.update(new PacienteEntity(request));
        return ResponseEntity.ok().build();
    }
}