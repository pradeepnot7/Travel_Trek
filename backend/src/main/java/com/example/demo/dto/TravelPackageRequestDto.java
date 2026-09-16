package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TravelPackageRequestDto {

    @NotBlank(message = "Package name is required")
    private String packageName;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    private Double price;

    private String description;

    private Boolean active;

    private Integer reservedCapacity;

    private Integer totalCapacity;
}