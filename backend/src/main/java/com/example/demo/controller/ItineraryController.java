package com.example.demo.controller;

import com.example.demo.dto.AiPromptRequestDto;
import com.example.demo.dto.TripItineraryRequestDto;
import com.example.demo.dto.TripItineraryResponseDto;
import com.example.demo.service.ItineraryPlanningService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itineraries")
@RequiredArgsConstructor
@Tag(name = "Trip Itineraries", description = "Plan, confirm and manage trip itineraries")
public class ItineraryController {

    private final ItineraryPlanningService itineraryPlanningService;

    @GetMapping
    @Operation(summary = "List all trip itineraries")
    public ResponseEntity<List<TripItineraryResponseDto>> getAll() {
        return ResponseEntity.ok(itineraryPlanningService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a trip itinerary by id")
    public ResponseEntity<TripItineraryResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(itineraryPlanningService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Create a trip itinerary")
    public ResponseEntity<TripItineraryResponseDto> create(@Valid @RequestBody TripItineraryRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itineraryPlanningService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a trip itinerary")
    public ResponseEntity<TripItineraryResponseDto> update(@PathVariable Long id,
                                                             @Valid @RequestBody TripItineraryRequestDto request) {
        return ResponseEntity.ok(itineraryPlanningService.update(id, request));
    }

    @PutMapping("/{id}/confirm")
    @Operation(summary = "Confirm a draft itinerary")
    public ResponseEntity<TripItineraryResponseDto> confirm(@PathVariable Long id) {
        return ResponseEntity.ok(itineraryPlanningService.confirm(id));
    }

    @PostMapping("/ai-generate")
    @Operation(summary = "Generate a draft itinerary from a natural-language prompt")
    public ResponseEntity<TripItineraryResponseDto> generate(@Valid @RequestBody AiPromptRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itineraryPlanningService.generateFromPrompt(request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a trip itinerary")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itineraryPlanningService.delete(id);
        return ResponseEntity.noContent().build();
    }
}