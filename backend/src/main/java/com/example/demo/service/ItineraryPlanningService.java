package com.example.demo.service;

import com.example.demo.dto.AiPromptRequestDto;
import com.example.demo.dto.TripItineraryRequestDto;
import com.example.demo.dto.TripItineraryResponseDto;
import com.example.demo.entity.ItineraryStatus;
import com.example.demo.entity.TripItinerary;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.TripItineraryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ItineraryPlanningService {

    private final TripItineraryRepository itineraryRepository;

    public List<TripItineraryResponseDto> getAll() {
        return itineraryRepository.findAll().stream().map(this::toDto).toList();
    }
    public TripItineraryResponseDto getById(Long id) {
        TripItinerary entity = itineraryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Itinerary not found with id " + id));
        return toDto(entity);
    }

    public TripItineraryResponseDto create(TripItineraryRequestDto request) {
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new BusinessValidationException("End date cannot be before start date.");
        }

        TripItinerary entity = TripItinerary.builder()
                .title(request.getTitle())
                .destination(request.getDestination())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(parseStatus(request.getStatus()))
                .budgetAllocationLimit(request.getBudgetAllocationLimit() != null ? request.getBudgetAllocationLimit() : 0.0)
                .cumulativeSpend(request.getCumulativeSpend() != null ? request.getCumulativeSpend() : 0.0)
                .build();

        return toDto(itineraryRepository.save(entity));
    }

    public TripItineraryResponseDto update(Long id, TripItineraryRequestDto request) {
        TripItinerary entity = itineraryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Itinerary not found with id " + id));

        entity.setTitle(request.getTitle());
        entity.setDestination(request.getDestination());
        entity.setStartDate(request.getStartDate());
        entity.setEndDate(request.getEndDate());
        if (request.getStatus() != null) entity.setStatus(parseStatus(request.getStatus()));
        if (request.getBudgetAllocationLimit() != null) entity.setBudgetAllocationLimit(request.getBudgetAllocationLimit());
        if (request.getCumulativeSpend() != null) entity.setCumulativeSpend(request.getCumulativeSpend());

        return toDto(itineraryRepository.save(entity));
    }

    public TripItineraryResponseDto confirm(Long id) {
        TripItinerary entity = itineraryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Itinerary not found with id " + id));
        entity.setStatus(ItineraryStatus.CONFIRMED);
        return toDto(itineraryRepository.save(entity));
    }

    public void delete(Long id) {
        if (!itineraryRepository.existsById(id)) {
            throw new EntityNotFoundException("Itinerary not found with id " + id);
        }
        itineraryRepository.deleteById(id);
    }

    public TripItineraryResponseDto generateFromPrompt(AiPromptRequestDto request) {
        String prompt = request.getPrompt();
        String destination = extractDestination(prompt);

        TripItinerary entity = TripItinerary.builder()
                .title("AI Curated Escape: " + destination)
                .destination(destination)
                .startDate(LocalDate.now().plusDays(30))
                .endDate(LocalDate.now().plusDays(37))
                .status(ItineraryStatus.DRAFT)
                .budgetAllocationLimit(1500.0)
                .cumulativeSpend(0.0)
                .build();

        return toDto(itineraryRepository.save(entity));
    }

    private String extractDestination(String prompt) {
        Pattern pattern = Pattern.compile("(?:to|in|at)\\s+([A-Z][a-zA-Z ]{2,})");
        Matcher matcher = pattern.matcher(prompt);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "Isolonia";
    }

    private ItineraryStatus parseStatus(String status) {
        if (status == null) return ItineraryStatus.DRAFT;
        try {
            return ItineraryStatus.valueOf(status);
        } catch (IllegalArgumentException ex) {
            throw new BusinessValidationException("Invalid itinerary status: " + status);
        }
    }

    private TripItineraryResponseDto toDto(TripItinerary entity) {
        return TripItineraryResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .destination(entity.getDestination())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .status(entity.getStatus().name())
                .budgetAllocationLimit(entity.getBudgetAllocationLimit())
                .cumulativeSpend(entity.getCumulativeSpend())
                .build();
    }
}