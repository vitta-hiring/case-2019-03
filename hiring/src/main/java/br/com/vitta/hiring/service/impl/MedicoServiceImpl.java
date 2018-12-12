package br.com.vitta.hiring.service.impl;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.MedicamentoEntity;
import br.com.vitta.hiring.model.MedicoEntity;
import br.com.vitta.hiring.repository.MedicoRepository;
import br.com.vitta.hiring.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoServiceImpl implements MedicoService {

    private static final EventLog log = EventLog.defaults(MedicoServiceImpl.class);

    @Autowired
    private MedicoRepository medicoRepository;


    @Override
    public List<MedicoEntity> getAll(){
       return medicoRepository.findAll();
    }

    @Override
    public void insert(MedicoEntity medico) {

        final Optional<MedicoEntity> medicoDB = medicoRepository
                .findByCrm(medico.getCrm());

        log.event().m("insert")
                .param("medico", medico)
                .info();

        if(!medicoDB.isPresent()) {
            medicoRepository.save(medico);
        }
    }

    @Override
    public void delete(Integer id) {
        final Optional<MedicoEntity> entity = medicoRepository
                .findById(id);
        entity.ifPresent(this::doDelete);
    }

    private void doDelete(final MedicoEntity entity) {
        medicoRepository.delete(entity);
    }

    @Override
    public void update(MedicoEntity medicoEntity) {
        final Optional<MedicoEntity> medicoDB = medicoRepository
                .findById(medicoEntity.getId());
        medicoDB.ifPresent(mapper -> doUpdate(medicoDB.get(), medicoEntity));
    }

    private void doUpdate(final MedicoEntity medicoDB, MedicoEntity entity) {
        medicoDB.setNomeMedico(entity.getNomeMedico());
        medicoDB.setCrm(entity.getCrm());
        medicoRepository.save(medicoDB);
    }
}
