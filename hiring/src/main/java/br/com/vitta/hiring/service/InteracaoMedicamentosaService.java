package br.com.vitta.hiring.service;

import br.com.vitta.hiring.model.InteracaoMedicamentosaEntity;

import java.util.List;

public interface InteracaoMedicamentosaService {

    List<InteracaoMedicamentosaEntity> getAll();

    void insert(InteracaoMedicamentosaEntity interacaoMedicamentosaEntity);

    void delete(Integer id);
}
