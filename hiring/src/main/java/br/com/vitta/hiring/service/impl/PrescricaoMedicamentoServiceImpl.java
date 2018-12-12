package br.com.vitta.hiring.service.impl;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.PrescricaoMedicamentoEntity;
import br.com.vitta.hiring.repository.PrescricaoMedicamentoRepository;
import br.com.vitta.hiring.service.PrescricaoMedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrescricaoMedicamentoServiceImpl implements PrescricaoMedicamentoService {

    private static final EventLog log = EventLog.defaults(PrescricaoMedicamentoServiceImpl.class);

    @Autowired
    private PrescricaoMedicamentoRepository repository;


    @Override
    public List<PrescricaoMedicamentoEntity> getAll(){
       return repository.findAll();
    }

    @Override
    public void insert(PrescricaoMedicamentoEntity prescricao) {

        log.event().m("insert")
                .param("paciente", prescricao)
                .info();

            repository.save(prescricao);
    }

    @Override
    public void delete(Integer id) {
        final Optional<PrescricaoMedicamentoEntity> entity = repository
                .findById(id);
        entity.ifPresent(this::doDelete);
    }

    private void doDelete(final PrescricaoMedicamentoEntity entity) {
        repository.delete(entity);
    }

}
