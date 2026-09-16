package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlannedActivityResponseDto {
    private Long id;
    private String activityName;
    private Integer dayNumber;
    private String schedule;
    private Double costEstimate;
    private Integer inventoryCapacity;
    private Integer inventoryUsed;
    private Long parentItineraryId;
}