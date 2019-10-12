package br.com.vitta.hiring.repository;

import br.com.vitta.hiring.model.InteracaoMedicamentosaEntity;
import br.com.vitta.hiring.model.MedicoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InteracaoMedicamentosaRepository extends JpaRepository<InteracaoMedicamentosaEntity, Integer> {

    Optional<InteracaoMedicamentosaEntity> findByFarmaco1ContainingIgnoreCase(final String farmaco1);

    Optional<InteracaoMedicamentosaEntity> findByFarmaco2ContainingIgnoreCase(final String farmaco2);


}
