package com.example.demo.controller;

import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.dto.SystemAccountResponseDto;
import com.example.demo.service.SystemAccountService;
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
@RequestMapping("/accounts")
@RequiredArgsConstructor
@Tag(name = "System Accounts", description = "Agency-manager-only account administration")
public class SystemAccountController {

    private final SystemAccountService systemAccountService;

    @GetMapping
    @Operation(summary = "List all system accounts")
    @PreAuthorize("hasRole('AGENCY_MANAGER')")
    public ResponseEntity<List<SystemAccountResponseDto>> getAll() {
        return ResponseEntity.ok(systemAccountService.getAll());
    }

    @PostMapping
    @Operation(summary = "Create a system account")
    @PreAuthorize("hasRole('AGENCY_MANAGER')")
    public ResponseEntity<SystemAccountResponseDto> create(@Valid @RequestBody RegisterRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(systemAccountService.create(request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deactivate a system account")
    @PreAuthorize("hasRole('AGENCY_MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        systemAccountService.delete(id);
        return ResponseEntity.noContent().build();
    }
}