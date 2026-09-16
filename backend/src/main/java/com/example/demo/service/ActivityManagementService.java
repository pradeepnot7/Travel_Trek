package com.example.demo.service;

import com.example.demo.dto.PlannedActivityRequestDto;
import com.example.demo.dto.PlannedActivityResponseDto;
import com.example.demo.entity.PlannedActivity;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.PlannedActivityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityManagementService {

    private final PlannedActivityRepository activityRepository;

    public List<PlannedActivityResponseDto> getAll() {
        return activityRepository.findAll().stream().map(this::toDto).toList();
    }

    public PlannedActivityResponseDto create(PlannedActivityRequestDto request) {
        int capacity = request.getInventoryCapacity() != null ? request.getInventoryCapacity() : 0;
        int used = request.getInventoryUsed() != null ? request.getInventoryUsed() : 0;

        if (used > capacity) {
            throw new BusinessValidationException("Inventory used cannot exceed inventory capacity.");
        }

        PlannedActivity entity = PlannedActivity.builder()
                .activityName(request.getActivityName())
                .dayNumber(request.getDayNumber())
                .schedule(request.getSchedule())
                .costEstimate(request.getCostEstimate())
                .inventoryCapacity(capacity)
                .inventoryUsed(used)
                .parentItineraryId(request.getParentItineraryId())
                .build();

        return toDto(activityRepository.save(entity));
    }

    public void delete(Long id) {
        if (!activityRepository.existsById(id)) {
            throw new EntityNotFoundException("Planned activity not found with id " + id);
        }
        activityRepository.deleteById(id);
    }

    private PlannedActivityResponseDto toDto(PlannedActivity entity) {
        return PlannedActivityResponseDto.builder()
                .id(entity.getId())
                .activityName(entity.getActivityName())
                .dayNumber(entity.getDayNumber())
                .schedule(entity.getSchedule())
                .costEstimate(entity.getCostEstimate())
                .inventoryCapacity(entity.getInventoryCapacity())
                .inventoryUsed(entity.getInventoryUsed())
                .parentItineraryId(entity.getParentItineraryId())
                .build();
    }
}