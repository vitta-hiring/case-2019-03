package br.com.vitta.hiring.repository;

import br.com.vitta.hiring.model.PacienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<PacienteEntity, Integer> {

    Optional<PacienteEntity> findByCpf(String cpf);

}
