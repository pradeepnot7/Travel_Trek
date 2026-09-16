package com.example.demo.repository;

import com.example.demo.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingReservationRepository extends JpaRepository<BookingReservation, Long> {
    List<BookingReservation> findByItineraryId(Long itineraryId);
}