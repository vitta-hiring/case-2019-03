package br.com.vitta.hiring.service.impl;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.InteracaoMedicamentosaEntity;
import br.com.vitta.hiring.model.PacienteEntity;
import br.com.vitta.hiring.repository.InteracaoMedicamentosaRepository;
import br.com.vitta.hiring.repository.PacienteRepository;
import br.com.vitta.hiring.service.InteracaoMedicamentosaService;
import br.com.vitta.hiring.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InteracaoMedicamentosaServiceImpl implements InteracaoMedicamentosaService {

    private static final EventLog log = EventLog.defaults(InteracaoMedicamentosaServiceImpl.class);

    @Autowired
    private InteracaoMedicamentosaRepository repository;


    @Override
    public List<InteracaoMedicamentosaEntity> getAll(){
       return repository.findAll();
    }

    @Override
    public void insert(InteracaoMedicamentosaEntity interacaoMedicamentosa) {

        log.event().m("insert")
                .param("interacaoMedicamentosa", interacaoMedicamentosa)
                .info();

        repository.save(interacaoMedicamentosa);
    }

    @Override
    public void delete(Integer id) {
        final Optional<InteracaoMedicamentosaEntity> entity = repository
                .findById(id);
        entity.ifPresent(this::doDelete);
    }

    private void doDelete(final InteracaoMedicamentosaEntity entity) {
        repository.delete(entity);
    }

}
