package com.coworkflex.backend.controller;

import com.coworkflex.backend.dto.ReservationRequestDTO;
import com.coworkflex.backend.dto.ReservationResponseDTO;
import com.coworkflex.backend.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationResponseDTO> createReservation(
        @Valid @RequestBody ReservationRequestDTO dto
    ) {
        return ResponseEntity.ok(reservationService.createReservation(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationResponseDTO>> getUserReservations(
        @PathVariable String userId
    ) {
        return ResponseEntity.ok(reservationService.getUserReservations(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }
}