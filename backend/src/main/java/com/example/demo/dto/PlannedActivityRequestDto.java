package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlannedActivityRequestDto {

    @NotBlank(message = "Activity name is required")
    private String activityName;

    @NotNull(message = "Day number is required")
    private Integer dayNumber;

    private String schedule;

    @NotNull(message = "Cost estimate is required")
    private Double costEstimate;

    private Integer inventoryCapacity;

    private Integer inventoryUsed;

    private Long parentItineraryId;
}