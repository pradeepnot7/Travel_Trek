package com.example.demo.config;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final SystemAccountRepository accountRepository;
    private final TravelPackageRepository packageRepository;
    private final TripItineraryRepository itineraryRepository;
    private final PlannedActivityRepository activityRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (accountRepository.count() == 0) {
            accountRepository.save(SystemAccount.builder()
                    .identityName("Platform Supervision Administrator")
                    .email("admin@traveltrek.com")
                    .password(passwordEncoder.encode("password123"))
                    .domainRole(SystemRole.AGENCY_MANAGER)
                    .status("ACTIVE")
                    .build());

            accountRepository.save(SystemAccount.builder()
                    .identityName("Senior Package Curation Specialist")
                    .email("agent@traveltrek.com")
                    .password(passwordEncoder.encode("password123"))
                    .domainRole(SystemRole.TOUR_AGENT)
                    .status("ACTIVE")
                    .build());

            accountRepository.save(SystemAccount.builder()
                    .identityName("Premium Itinerary Explorer Customer")
                    .email("traveler@gmail.com")
                    .password(passwordEncoder.encode("password123"))
                    .domainRole(SystemRole.TRAVELER)
                    .status("ACTIVE")
                    .build());
        }

        if (packageRepository.count() == 0) {
            packageRepository.save(TravelPackage.builder()
                    .packageName("Alpine Lakes & Summit Railway Escape")
                    .destination("Swiss Alps, Switzerland")
                    .price(1450.0)
                    .description("10 Days duration")
                    .active(true)
                    .reservedCapacity(8)
                    .totalCapacity(50)
                    .build());

            packageRepository.save(TravelPackage.builder()
                    .packageName("Mediterranean Coastal Sunset Cruise Tour")
                    .destination("Amalfi Coast, Italy")
                    .price(1980.0)
                    .description("10 Days duration")
                    .active(true)
                    .reservedCapacity(12)
                    .totalCapacity(50)
                    .build());
        }

        if (itineraryRepository.count() == 0) {
            TripItinerary kyoto = itineraryRepository.save(TripItinerary.builder()
                    .title("Kyoto Serene Gardens Exploration Route")
                    .destination("Kyoto, Japan")
                    .startDate(LocalDate.of(2026, 6, 12))
                    .endDate(LocalDate.of(2026, 6, 19))
                    .status(ItineraryStatus.CONFIRMED)
                    .budgetAllocationLimit(3200.0)
                    .cumulativeSpend(0.0)
                    .build());

            itineraryRepository.save(TripItinerary.builder()
                    .title("summer holiday")
                    .destination("goa")
                    .startDate(LocalDate.of(2026, 5, 12))
                    .endDate(LocalDate.of(2026, 5, 18))
                    .status(ItineraryStatus.CONFIRMED)
                    .budgetAllocationLimit(1200.0)
                    .cumulativeSpend(0.0)
                    .build());

            if (activityRepository.count() == 0) {
                activityRepository.save(PlannedActivity.builder()
                        .activityName("Morning Architecture Tour")
                        .dayNumber(1)
                        .schedule("9:00 AM")
                        .costEstimate(45.0)
                        .inventoryCapacity(50)
                        .inventoryUsed(27)
                        .parentItineraryId(kyoto.getId())
                        .build());

                activityRepository.save(PlannedActivity.builder()
                        .activityName("Gourmet Cultural Tasting")
                        .dayNumber(1)
                        .schedule("1:00 PM")
                        .costEstimate(120.0)
                        .inventoryCapacity(30)
                        .inventoryUsed(4)
                        .parentItineraryId(kyoto.getId())
                        .build());

                activityRepository.save(PlannedActivity.builder()
                        .activityName("Sunset Mountain Railway")
                        .dayNumber(2)
                        .schedule("6:00 PM")
                        .costEstimate(85.0)
                        .inventoryCapacity(40)
                        .inventoryUsed(9)
                        .parentItineraryId(kyoto.getId())
                        .build());
            }
        }
    }
}