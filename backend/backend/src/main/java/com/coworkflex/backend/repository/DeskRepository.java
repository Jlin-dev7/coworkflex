package com.coworkflex.backend.repository;

import com.coworkflex.backend.model.Desk;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeskRepository extends JpaRepository<Desk, Long> {
    List<Desk> findBySpaceId(Long spaceId);
    List<Desk> findBySpaceIdAndAvailable(Long spaceId, Boolean available);
}