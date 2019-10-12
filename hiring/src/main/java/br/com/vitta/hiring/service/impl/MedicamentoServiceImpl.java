package br.com.vitta.hiring.service.impl;

import br.com.vitta.hiring.log.EventLog;
import br.com.vitta.hiring.model.MedicamentoEntity;
import br.com.vitta.hiring.repository.MedicamentoRepository;
import br.com.vitta.hiring.service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicamentoServiceImpl implements MedicamentoService {

    private static final EventLog log = EventLog.defaults(MedicamentoServiceImpl.class);

    @Autowired
    private MedicamentoRepository medicamentoRepository;


    @Override
    public List<MedicamentoEntity> getAll(){
       return medicamentoRepository.findAll();
    }

    @Override
    public void insert(MedicamentoEntity medicamento) {

        final Optional<MedicamentoEntity> medicamentoDB = medicamentoRepository
                .findByNomeMedicamento(medicamento.getNomeMedicamento());

        log.event().m("insert")
                .param("medicamentoEntity", medicamento)
                .info();

        if(!medicamentoDB.isPresent()) {
            medicamentoRepository.save(medicamento);
        }
    }

    @Override
    public void delete(Integer id) {
        final Optional<MedicamentoEntity> entity = medicamentoRepository
                .findById(id);
        entity.ifPresent(this::doDelete);
    }

    private void doDelete(final MedicamentoEntity entity) {
        medicamentoRepository.delete(entity);
    }

    @Override
    public void update(MedicamentoEntity medicamentoEntity) {
        final Optional<MedicamentoEntity> medicamentoDB = medicamentoRepository
                .findById(medicamentoEntity.getId());
        medicamentoDB.ifPresent(mapper -> doUpdate(medicamentoDB.get(), medicamentoEntity));
    }

    private void doUpdate(final MedicamentoEntity medicamentoDB, MedicamentoEntity entity) {
        medicamentoDB.setNomeMedicamento(entity.getNomeMedicamento());
        medicamentoDB.setBula(entity.getBula());
        medicamentoDB.setConcentracao(entity.getConcentracao());
        medicamentoDB.setUnidade(entity.getUnidade());
        medicamentoDB.setTipoMedicamento(entity.getTipoMedicamento());
        medicamentoDB.setFormaFarmaceutica(entity.getFormaFarmaceutica());
        medicamentoDB.setViaAdministracao(entity.getViaAdministracao());
        medicamentoDB.setCodigoAtc(entity.getCodigoAtc());
        medicamentoDB.setUsoInterno(entity.isUsoInterno());
        medicamentoDB.setAntimicrobiano(entity.isAntimicrobiano());
        medicamentoDB.setPortaria(entity.getPortaria());
        medicamentoDB.setControleEspecial(entity.isControleEspecial());
        medicamentoDB.setTiss(entity.getTiss());
        medicamentoDB.setMip(entity.isMip());
        medicamentoDB.setLabel(entity.getLabel());
        medicamentoDB.setUnificado(entity.getUnificado());
        medicamentoRepository.save(medicamentoDB);
    }
}
