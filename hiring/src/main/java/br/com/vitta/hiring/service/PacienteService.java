package br.com.vitta.hiring.service;

import br.com.vitta.hiring.model.PacienteEntity;

import java.util.List;

public interface PacienteService {

    List<PacienteEntity> getAll();

    void insert(PacienteEntity medicamentoEntity);

    void delete(Integer id);

    void update(PacienteEntity medicamentoEntity);
}
