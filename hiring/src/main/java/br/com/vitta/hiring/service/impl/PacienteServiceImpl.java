package br.com.vitta.hiring.service.impl;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.PacienteEntity;
import br.com.vitta.hiring.repository.PacienteRepository;
import br.com.vitta.hiring.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteServiceImpl implements PacienteService {

    private static final EventLog log = EventLog.defaults(PacienteServiceImpl.class);

    @Autowired
    private PacienteRepository repository;


    @Override
    public List<PacienteEntity> getAll(){
       return repository.findAll();
    }

    @Override
    public void insert(PacienteEntity paciente) {

        final Optional<PacienteEntity> pacienteDB = repository
                .findByCpf(paciente.getCpf());

        log.event().m("insert")
                .param("paciente", paciente)
                .info();

        if(!pacienteDB.isPresent()) {
            repository.save(paciente);
        }
    }

    @Override
    public void delete(Integer id) {
        final Optional<PacienteEntity> entity = repository
                .findById(id);
        entity.ifPresent(this::doDelete);
    }

    private void doDelete(final PacienteEntity entity) {
        repository.delete(entity);
    }

    @Override
    public void update(PacienteEntity paciente) {
        final Optional<PacienteEntity> pacienteDB = repository
                .findById(paciente.getId());
        pacienteDB.ifPresent(mapper -> doUpdate(pacienteDB.get(), paciente));
    }

    private void doUpdate(final PacienteEntity pacienteDB, PacienteEntity entity) {
        pacienteDB.setNomePaciente(entity.getNomePaciente());
        pacienteDB.setCpf(entity.getCpf());
        repository.save(pacienteDB);
    }
}
