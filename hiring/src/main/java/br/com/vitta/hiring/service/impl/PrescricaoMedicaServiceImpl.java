package br.com.vitta.hiring.service.impl;

import br.com.vitta.hiring.exception.VittaException;
import br.com.vitta.hiring.model.*;
import br.com.vitta.hiring.repository.*;
import br.com.vitta.hiring.request.PrescricaoRequest;
import br.com.vitta.hiring.responses.MedicamentoResponse;
import br.com.vitta.hiring.service.PrescricaoMedicaService;
import io.micrometer.core.instrument.util.StringUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PrescricaoMedicaServiceImpl implements PrescricaoMedicaService {

    @Autowired
    private PrescricaoRepository prescricaoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private InteracaoMedicamentosaRepository interacaoMedicamentosaRepository;

    @Autowired
    private PrescricaoMedicamentoRepository prescricaoMedicamentoRepository;

    @Override
    public List<PrescricaoEntity> getAll(){
       return prescricaoRepository.findAll();
    }

    @Override
    public void insert(PrescricaoRequest request) throws VittaException {

        Optional<PacienteEntity> pacienteOptional = pacienteRepository.findById(request.getIdPaciente());
        if(!pacienteOptional.isPresent()){
            throw new VittaException("Paciente não encontrado.");
        }

        Optional<MedicoEntity> medicoOptional = medicoRepository.findById(request.getIdMedico());
        if(!medicoOptional.isPresent()){
            throw new VittaException("Médico não encontrado.");
        }

        PrescricaoEntity prescricao = new PrescricaoEntity();
        prescricao.setMedicoEntity(medicoOptional.get());
        prescricao.setPacienteEntity(pacienteOptional.get());

        Optional<MedicamentoEntity> medicamentoOptional = medicamentoRepository.findById(request.getIdMedicamento());
        if (!medicamentoOptional.isPresent()) {
            throw new VittaException("Medicamento não encontrado.");
        }

        MedicamentoEntity medicamento = medicamentoOptional.get();
        validaExistenciaDeInteracaoMedicamentosa(medicamento);

        PrescricaoMedicamentoEntity prescricaoMed = new PrescricaoMedicamentoEntity(medicamento, request.getQtddMedicamento());
        prescricaoMed = prescricaoMedicamentoRepository.save(prescricaoMed);

        prescricao.setPrescricaoMedicamentoEntity(prescricaoMed);

        prescricaoRepository.save(prescricao);
    }

    private void validaExistenciaDeInteracaoMedicamentosa(MedicamentoEntity medicamento){

        if(StringUtils.isNotEmpty(medicamento.getNomeFormaco())) {
            Optional<InteracaoMedicamentosaEntity> interacaoOptional = interacaoMedicamentosaRepository.
                    findByFarmaco1ContainingIgnoreCase(medicamento.getNomeFormaco());

            if (interacaoOptional.isPresent()) {
                InteracaoMedicamentosaEntity entity = interacaoOptional.get();
                StringBuilder builder = new StringBuilder();
                builder.append(entity.getNomeInteracaoMedicamentosa())
                        .append(" - ")
                        .append(entity.getDescricaoInteracaoMedicamentosa());

                throw new VittaException(builder.toString());
            }
        }
    }

    @Override
    public void delete(Integer id) {
        final Optional<PrescricaoEntity> entity = prescricaoRepository
                .findById(id);
        entity.ifPresent(this::doDelete);
    }

    private void doDelete(final PrescricaoEntity entity) {
        prescricaoRepository.delete(entity);
    }

}
