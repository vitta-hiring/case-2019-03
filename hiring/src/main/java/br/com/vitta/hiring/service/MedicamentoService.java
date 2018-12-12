package br.com.vitta.hiring.service;

import br.com.vitta.hiring.model.MedicamentoEntity;

import java.util.List;

public interface MedicamentoService {

    List<MedicamentoEntity> getAll();

    void insert(MedicamentoEntity medicamentoEntity);

    void delete (Integer id);

    void update(MedicamentoEntity medicamentoEntity);
}
