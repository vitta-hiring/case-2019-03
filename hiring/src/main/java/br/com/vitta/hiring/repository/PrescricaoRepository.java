package br.com.vitta.hiring.repository;

import br.com.vitta.hiring.model.PrescricaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescricaoRepository extends JpaRepository<PrescricaoEntity, Integer> {

    @Override
    @Query("select p from PrescricaoEntity p inner join fetch p.prescricaoMedicamentoEntity ps left join fetch ps.medicamento m ")
    List<PrescricaoEntity> findAll();
}
