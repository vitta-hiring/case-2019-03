package br.com.vitta.hiring.service;

import br.com.vitta.hiring.model.MedicoEntity;

import java.util.List;

public interface MedicoService {

    List<MedicoEntity> getAll();

    void insert(MedicoEntity medicamentoEntity);

    void delete(Integer id);

    void update(MedicoEntity medicamentoEntity);
}
