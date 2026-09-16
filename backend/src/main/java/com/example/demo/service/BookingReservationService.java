package com.example.demo.service;

import com.example.demo.dto.BookingRequestDto;
import com.example.demo.dto.BookingReservationResponseDto;
import com.example.demo.entity.BookingReservation;
import com.example.demo.entity.BookingStatus;
import com.example.demo.entity.PaymentStatus;
import com.example.demo.event.ReservationPlacedEvent;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.BookingReservationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingReservationService {

    private final BookingReservationRepository bookingRepository;
    private final ApplicationEventPublisher eventPublisher;

    public List<BookingReservationResponseDto> getAll() {
        return bookingRepository.findAll().stream().map(this::toDto).toList();
    }

    public BookingReservationResponseDto create(BookingRequestDto request) {
        BookingReservation entity = BookingReservation.builder()
                .itineraryId(request.getItineraryId())
                .activityId(request.getActivityId())
                .amount(request.getAmount())
                .bookingStatus(parseBookingStatus(request.getBookingStatus()))
                .paymentStatus(parsePaymentStatus(request.getPaymentStatus()))
                .build();

        BookingReservation saved = bookingRepository.save(entity);
        eventPublisher.publishEvent(new ReservationPlacedEvent(this, saved));
        return toDto(saved);
    }

    public void delete(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new EntityNotFoundException("Booking reservation not found with id " + id);
        }
        bookingRepository.deleteById(id);
    }

    private BookingStatus parseBookingStatus(String status) {
        if (status == null) return BookingStatus.PENDING;
        try {
            return BookingStatus.valueOf(status);
        } catch (IllegalArgumentException ex) {
            throw new BusinessValidationException("Invalid booking status: " + status);
        }
    }

    private PaymentStatus parsePaymentStatus(String status) {
        if (status == null) return PaymentStatus.PENDING;
        try {
            return PaymentStatus.valueOf(status);
        } catch (IllegalArgumentException ex) {
            throw new BusinessValidationException("Invalid payment status: " + status);
        }
    }

    private BookingReservationResponseDto toDto(BookingReservation entity) {
        return BookingReservationResponseDto.builder()
                .id(entity.getId())
                .itineraryId(entity.getItineraryId())
                .activityId(entity.getActivityId())
                .amount(entity.getAmount())
                .bookingStatus(entity.getBookingStatus().name())
                .paymentStatus(entity.getPaymentStatus().name())
                .build();
    }
}