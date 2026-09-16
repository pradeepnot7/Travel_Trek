package com.example.demo.repository;

import com.example.demo.entity.TripItinerary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripItineraryRepository extends JpaRepository<TripItinerary, Long> {
}