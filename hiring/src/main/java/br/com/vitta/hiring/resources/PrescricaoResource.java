package br.com.vitta.hiring.resources;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.PrescricaoEntity;
import br.com.vitta.hiring.request.PrescricaoRequest;
import br.com.vitta.hiring.responses.PacienteResponse;
import br.com.vitta.hiring.responses.PrescricaoResponse;
import br.com.vitta.hiring.service.PrescricaoMedicaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController("prescricao-medica")
@Api(description = "Serviços de prescricao medica.")
public class PrescricaoResource {

    @Autowired
    private PrescricaoMedicaService service;

    private static final EventLog log = EventLog.defaults(PrescricaoResource.class);

    @GetMapping(value = "/prescricao-medica/listar")
    @ApiOperation(value = "Consulta todos as prescrições médicas")
    public ResponseEntity<List<PrescricaoResponse>> consultarPrescricoesMedicas() {

        log.event().m("consultarPrescricoesMedicas").state(EventLog.State.NEW).info();

        final List<PrescricaoResponse> responseList = new ArrayList<>();
        List<PrescricaoEntity> entitys = service.getAll();
        if(CollectionUtils.isNotEmpty(entitys)){
            entitys.stream().forEach(pres -> responseList.add(new PrescricaoResponse(pres)));
        }

        log.event().m("consultarPrescricoesMedicas").state(EventLog.State.SUCCESS).info();

        return ResponseEntity.ok(responseList);
    }

    @PostMapping({"/prescricao-medica/salvar"})
    @ApiOperation("Salva uma prescrição")
    public ResponseEntity inserirPrescricaoMedica(@Valid @RequestBody PrescricaoRequest request) {
        this.service.insert(request);
        return ResponseEntity.ok().build();
    }

}