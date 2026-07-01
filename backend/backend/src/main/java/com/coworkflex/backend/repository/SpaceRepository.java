package com.coworkflex.backend.repository;

import com.coworkflex.backend.model.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpaceRepository extends JpaRepository<Space, Long> {
    List<Space> findByCityIgnoreCase(String city);
    List<Space> findByCapacityGreaterThanEqual(Integer capacity);
    List<Space> findByCityIgnoreCaseAndCapacityGreaterThanEqual(String city, Integer capacity);
}