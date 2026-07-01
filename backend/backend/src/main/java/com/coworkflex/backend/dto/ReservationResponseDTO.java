package com.coworkflex.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservationResponseDTO {
    private Long id;
    private String userId;
    private Long deskId;
    private String deskLabel;
    private String spaceName;
    private String spaceCity;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}