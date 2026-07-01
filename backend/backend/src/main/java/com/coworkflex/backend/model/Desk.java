package com.coworkflex.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "desks")
public class Desk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;

    @Enumerated(EnumType.STRING)
    private DeskType type;

    private Boolean available = true;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    public enum DeskType {
        OPEN_SPACE, MEETING_ROOM, PRIVATE_OFFICE
    }
}