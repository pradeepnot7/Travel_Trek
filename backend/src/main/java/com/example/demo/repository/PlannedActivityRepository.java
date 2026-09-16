package com.example.demo.repository;

import com.example.demo.entity.PlannedActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlannedActivityRepository extends JpaRepository<PlannedActivity, Long> {
    List<PlannedActivity> findByParentItineraryId(Long parentItineraryId);
}