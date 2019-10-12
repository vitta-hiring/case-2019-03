package br.com.vitta.hiring.service;

import br.com.vitta.hiring.model.PrescricaoEntity;
import br.com.vitta.hiring.request.PrescricaoRequest;

import java.util.List;

public interface PrescricaoMedicaService {

    List<PrescricaoEntity> getAll();

    void insert(PrescricaoRequest request);

    void delete(Integer id);
}
