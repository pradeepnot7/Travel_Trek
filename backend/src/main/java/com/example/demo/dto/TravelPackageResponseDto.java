package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackageResponseDto {
    private Long id;
    private String packageName;
    private String destination;
    private Double price;
    private String description;
    private Boolean active;
    private Integer reservedCapacity;
    private Integer totalCapacity;
}