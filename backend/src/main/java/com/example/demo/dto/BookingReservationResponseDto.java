package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingReservationResponseDto {
    private Long id;
    private Long itineraryId;
    private Long activityId;
    private Double amount;
    private String bookingStatus;
    private String paymentStatus;
}