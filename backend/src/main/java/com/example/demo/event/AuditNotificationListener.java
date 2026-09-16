package com.example.demo.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuditNotificationListener {

    @Async
    @EventListener
    public void onReservationPlaced(ReservationPlacedEvent event) {
        log.info("Audit: booking reservation #{} placed for itinerary #{} amount ${}",
                event.getReservation().getId(),
                event.getReservation().getItineraryId(),
                event.getReservation().getAmount());
    }
}