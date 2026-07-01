package com.coworkflex.backend;

import com.coworkflex.backend.dto.ReservationRequestDTO;
import com.coworkflex.backend.exception.ReservationConflictException;
import com.coworkflex.backend.exception.ReservationNotCancellableException;
import com.coworkflex.backend.model.Desk;
import com.coworkflex.backend.model.Reservation;
import com.coworkflex.backend.model.Space;
import com.coworkflex.backend.repository.DeskRepository;
import com.coworkflex.backend.repository.ReservationRepository;
import com.coworkflex.backend.service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BackendApplicationTests {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private DeskRepository deskRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Desk desk;
    private Space space;

    @BeforeEach
    void setUp() {
        space = new Space();
        space.setId(1L);
        space.setName("WeWork Nation");
        space.setCity("Paris");

        desk = new Desk();
        desk.setId(1L);
        desk.setLabel("Bureau A1");
        desk.setType(Desk.DeskType.OPEN_SPACE);
        desk.setAvailable(true);
        desk.setSpace(space);
    }

    // Test 1 : Création réservation réussie
    @Test
    void testCreateReservation_Success() {
        ReservationRequestDTO dto = new ReservationRequestDTO();
        dto.setDeskId(1L);
        dto.setUserId("user-001");
        dto.setStartDate(LocalDateTime.now().plusDays(1));
        dto.setEndDate(LocalDateTime.now().plusDays(2));

        when(reservationRepository.findOverlapping(any(), any(), any()))
            .thenReturn(List.of());
        when(deskRepository.findById(1L)).thenReturn(Optional.of(desk));
        when(reservationRepository.save(any())).thenAnswer(i -> {
            Reservation r = i.getArgument(0);
            r.setId(1L);
            return r;
        });

        var result = reservationService.createReservation(dto);

        assertNotNull(result);
        assertEquals("user-001", result.getUserId());
        assertEquals("Bureau A1", result.getDeskLabel());
    }

    // Test 2 : Double réservation refusée
    @Test
    void testCreateReservation_Conflict() {
        ReservationRequestDTO dto = new ReservationRequestDTO();
        dto.setDeskId(1L);
        dto.setUserId("user-001");
        dto.setStartDate(LocalDateTime.now().plusDays(1));
        dto.setEndDate(LocalDateTime.now().plusDays(2));

        Reservation existing = new Reservation();
        when(reservationRepository.findOverlapping(any(), any(), any()))
            .thenReturn(List.of(existing));

        assertThrows(ReservationConflictException.class, () ->
            reservationService.createReservation(dto)
        );
    }

    // Test 3 : Annulation refusée si moins de 24h
    @Test
    void testCancelReservation_TooLate() {
        Reservation reservation = new Reservation();
        reservation.setId(1L);
        reservation.setUserId("user-001");
        reservation.setDesk(desk);
        reservation.setStartDate(LocalDateTime.now().plusHours(10));
        reservation.setEndDate(LocalDateTime.now().plusHours(12));
        reservation.setStatus(Reservation.ReservationStatus.ACTIVE);

        when(reservationRepository.findById(1L))
            .thenReturn(Optional.of(reservation));

        assertThrows(ReservationNotCancellableException.class, () ->
            reservationService.cancelReservation(1L)
        );
    }
}