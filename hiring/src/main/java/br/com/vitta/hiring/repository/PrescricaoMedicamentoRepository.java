package br.com.vitta.hiring.repository;

import br.com.vitta.hiring.model.PrescricaoMedicamentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescricaoMedicamentoRepository extends JpaRepository<PrescricaoMedicamentoEntity, Integer> {

}
