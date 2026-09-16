package com.example.demo.controller;

import com.example.demo.dto.PlannedActivityRequestDto;
import com.example.demo.dto.PlannedActivityResponseDto;
import com.example.demo.service.ActivityManagementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activities")
@RequiredArgsConstructor
@Tag(name = "Planned Activities", description = "Manage day-by-day planned activities")
public class ActivityController {

    private final ActivityManagementService activityManagementService;

    @GetMapping
    @Operation(summary = "List all planned activities")
    public ResponseEntity<List<PlannedActivityResponseDto>> getAll() {
        return ResponseEntity.ok(activityManagementService.getAll());
    }

    @PostMapping
    @Operation(summary = "Create a planned activity")
    public ResponseEntity<PlannedActivityResponseDto> create(@Valid @RequestBody PlannedActivityRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(activityManagementService.create(request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a planned activity")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityManagementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}