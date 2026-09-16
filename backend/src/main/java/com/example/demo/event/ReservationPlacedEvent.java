package com.example.demo.event;

import com.example.demo.entity.BookingReservation;
import org.springframework.context.ApplicationEvent;

public class ReservationPlacedEvent extends ApplicationEvent {

    private final BookingReservation reservation;

    public ReservationPlacedEvent(Object source, BookingReservation reservation) {
        super(source);
        this.reservation = reservation;
    }

    public BookingReservation getReservation() {
        return reservation;
    }
}