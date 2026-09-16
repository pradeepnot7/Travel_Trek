package com.example.demo.controller;

import com.example.demo.dto.BookingRequestDto;
import com.example.demo.dto.BookingReservationResponseDto;
import com.example.demo.service.BookingReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@Tag(name = "Booking Reservations", description = "Reserve and manage itinerary/activity bookings")
public class BookingController {

    private final BookingReservationService bookingReservationService;

    @GetMapping
    @Operation(summary = "List all booking reservations")
    public ResponseEntity<List<BookingReservationResponseDto>> getAll() {
        return ResponseEntity.ok(bookingReservationService.getAll());
    }

    @PostMapping
    @Operation(summary = "Create a booking reservation")
    public ResponseEntity<BookingReservationResponseDto> create(@Valid @RequestBody BookingRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingReservationService.create(request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancel/delete a booking reservation")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookingReservationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}