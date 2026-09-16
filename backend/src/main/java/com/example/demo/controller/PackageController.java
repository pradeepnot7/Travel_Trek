package com.example.demo.controller;

import com.example.demo.dto.TravelPackageRequestDto;
import com.example.demo.dto.TravelPackageResponseDto;
import com.example.demo.service.PackageCurationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packages")
@RequiredArgsConstructor
@Tag(name = "Travel Packages", description = "Manage curated travel packages")
public class PackageController {

    private final PackageCurationService packageCurationService;

    @GetMapping
    @Operation(summary = "List all travel packages")
    public ResponseEntity<List<TravelPackageResponseDto>> getAll() {
        return ResponseEntity.ok(packageCurationService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a travel package by id")
    public ResponseEntity<TravelPackageResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(packageCurationService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('AGENCY_MANAGER', 'TRAVEL_AGENT')")
    @Operation(summary = "Create a travel package")
    public ResponseEntity<TravelPackageResponseDto> create(@Valid @RequestBody TravelPackageRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(packageCurationService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('AGENCY_MANAGER', 'TRAVEL_AGENT')")
    @Operation(summary = "Update a travel package")
    public ResponseEntity<TravelPackageResponseDto> update(@PathVariable Long id,
                                                             @Valid @RequestBody TravelPackageRequestDto request) {
        return ResponseEntity.ok(packageCurationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('AGENCY_MANAGER', 'TRAVEL_AGENT')")
    @Operation(summary = "Delete a travel package")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        packageCurationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}