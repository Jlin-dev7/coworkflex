package com.coworkflex.backend.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservationRequestDTO {
    @NotNull(message = "L'ID du poste est obligatoire")
    private Long deskId;

    @NotNull(message = "L'ID utilisateur est obligatoire")
    private String userId;

    @NotNull(message = "La date de début est obligatoire")
    @Future(message = "La date de début doit être dans le futur")
    private LocalDateTime startDate;

    @NotNull(message = "La date de fin est obligatoire")
    @Future(message = "La date de fin doit être dans le futur")
    private LocalDateTime endDate;
}