package com.coworkflex.backend.repository;

import com.coworkflex.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(String userId);

    @Query("SELECT r FROM Reservation r WHERE r.desk.id = :deskId " +
           "AND r.status = 'ACTIVE' " +
           "AND r.startDate < :endDate " +
           "AND r.endDate > :startDate")
    List<Reservation> findOverlapping(@Param("deskId") Long deskId,
                                       @Param("startDate") LocalDateTime startDate,
                                       @Param("endDate") LocalDateTime endDate);
}