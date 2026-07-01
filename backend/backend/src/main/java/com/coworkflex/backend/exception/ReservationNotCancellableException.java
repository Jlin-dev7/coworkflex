package com.coworkflex.backend.exception;

public class ReservationNotCancellableException extends RuntimeException {
    public ReservationNotCancellableException(String message) {
        super(message);
    }
}