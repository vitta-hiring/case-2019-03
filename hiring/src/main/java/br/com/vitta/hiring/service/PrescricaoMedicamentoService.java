package br.com.vitta.hiring.service;

import br.com.vitta.hiring.exception.VittaException;
import br.com.vitta.hiring.model.PrescricaoMedicamentoEntity;

import java.util.List;

public interface PrescricaoMedicamentoService {

    List<PrescricaoMedicamentoEntity> getAll();

    void insert(PrescricaoMedicamentoEntity medicamentoEntity) throws VittaException;

    void delete(Integer id);
}
