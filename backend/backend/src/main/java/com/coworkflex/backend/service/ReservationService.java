package com.coworkflex.backend.service;

import com.coworkflex.backend.dto.ReservationRequestDTO;
import com.coworkflex.backend.dto.ReservationResponseDTO;
import com.coworkflex.backend.exception.ReservationConflictException;
import com.coworkflex.backend.exception.ReservationNotCancellableException;
import com.coworkflex.backend.model.Desk;
import com.coworkflex.backend.model.Reservation;
import com.coworkflex.backend.repository.DeskRepository;
import com.coworkflex.backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final DeskRepository deskRepository;

    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {
        // Vérifier date début < date fin
        if (!dto.getStartDate().isBefore(dto.getEndDate())) {
            throw new IllegalArgumentException("La date de début doit être avant la date de fin");
        }

        // Vérifier disponibilité (anti-double-réservation)
        List<Reservation> overlapping = reservationRepository.findOverlapping(
            dto.getDeskId(), dto.getStartDate(), dto.getEndDate()
        );
        if (!overlapping.isEmpty()) {
            throw new ReservationConflictException("Ce poste est déjà réservé sur ce créneau");
        }

        Desk desk = deskRepository.findById(dto.getDeskId())
            .orElseThrow(() -> new RuntimeException("Poste introuvable"));

        Reservation reservation = new Reservation();
        reservation.setUserId(dto.getUserId());
        reservation.setDesk(desk);
        reservation.setStartDate(dto.getStartDate());
        reservation.setEndDate(dto.getEndDate());

        Reservation saved = reservationRepository.save(reservation);
        return toDTO(saved);
    }

    public List<ReservationResponseDTO> getUserReservations(String userId) {
        return reservationRepository.findByUserId(userId)
            .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

        // Règle 24h
        if (reservation.getStartDate().isBefore(LocalDateTime.now().plusHours(24))) {
            throw new ReservationNotCancellableException(
                "Annulation impossible : la réservation commence dans moins de 24h"
            );
        }

        reservation.setStatus(Reservation.ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    private ReservationResponseDTO toDTO(Reservation r) {
        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setId(r.getId());
        dto.setUserId(r.getUserId());
        dto.setDeskId(r.getDesk().getId());
        dto.setDeskLabel(r.getDesk().getLabel());
        dto.setSpaceName(r.getDesk().getSpace().getName());
        dto.setSpaceCity(r.getDesk().getSpace().getCity());
        dto.setStartDate(r.getStartDate());
        dto.setEndDate(r.getEndDate());
        dto.setStatus(r.getStatus().name());
        return dto;
    }
}