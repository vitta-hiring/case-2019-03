package br.com.vitta.hiring.repository;

import br.com.vitta.hiring.model.MedicamentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicamentoRepository extends JpaRepository<MedicamentoEntity, Integer> {

    Optional<MedicamentoEntity> findByNomeMedicamento(String nomeMedicamento);

}
