package com.example.demo.service;

import com.example.demo.dto.TravelPackageRequestDto;
import com.example.demo.dto.TravelPackageResponseDto;
import com.example.demo.entity.TravelPackage;
import com.example.demo.repository.TravelPackageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageCurationService {

    private final TravelPackageRepository packageRepository;

    public List<TravelPackageResponseDto> getAll() {
        return packageRepository.findAll().stream().map(this::toDto).toList();
    }

    public TravelPackageResponseDto getById(Long id) {
        TravelPackage entity = packageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Travel package not found with id " + id));
        return toDto(entity);
    }

    public TravelPackageResponseDto create(TravelPackageRequestDto request) {
        TravelPackage entity = TravelPackage.builder()
                .packageName(request.getPackageName())
                .destination(request.getDestination())
                .price(request.getPrice())
                .description(request.getDescription())
                .active(request.getActive() != null ? request.getActive() : true)
                .reservedCapacity(request.getReservedCapacity() != null ? request.getReservedCapacity() : 0)
                .totalCapacity(request.getTotalCapacity() != null ? request.getTotalCapacity() : 50)
                .build();
        return toDto(packageRepository.save(entity));
    }

    public TravelPackageResponseDto update(Long id, TravelPackageRequestDto request) {
        TravelPackage entity = packageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Travel package not found with id " + id));

        entity.setPackageName(request.getPackageName());
        entity.setDestination(request.getDestination());
        entity.setPrice(request.getPrice());
        entity.setDescription(request.getDescription());
        if (request.getActive() != null) entity.setActive(request.getActive());
        if (request.getReservedCapacity() != null) entity.setReservedCapacity(request.getReservedCapacity());
        if (request.getTotalCapacity() != null) entity.setTotalCapacity(request.getTotalCapacity());

        return toDto(packageRepository.save(entity));
    }

    public void delete(Long id) {
        if (!packageRepository.existsById(id)) {
            throw new EntityNotFoundException("Travel package not found with id " + id);
        }
        packageRepository.deleteById(id);
    }

    private TravelPackageResponseDto toDto(TravelPackage entity) {
        return TravelPackageResponseDto.builder()
                .id(entity.getId())
                .packageName(entity.getPackageName())
                .destination(entity.getDestination())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .active(entity.getActive())
                .reservedCapacity(entity.getReservedCapacity())
                .totalCapacity(entity.getTotalCapacity())
                .build();
    }
}