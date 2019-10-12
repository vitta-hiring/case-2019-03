package br.com.vitta.hiring.repository;

import br.com.vitta.hiring.model.MedicoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository<MedicoEntity, Integer> {

    Optional<MedicoEntity> findByCrm(String crm);

}
