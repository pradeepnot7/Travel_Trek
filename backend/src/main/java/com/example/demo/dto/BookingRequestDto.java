package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingRequestDto {

    @NotNull(message = "Itinerary id is required")
    private Long itineraryId;

    private Long activityId;

    @NotNull(message = "Amount is required")
    private Double amount;

    private String bookingStatus;

    private String paymentStatus;
}