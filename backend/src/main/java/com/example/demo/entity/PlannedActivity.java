package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "planned_activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlannedActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String activityName;

    @Column(nullable = false)
    private Integer dayNumber;

    private String schedule;

    @Column(nullable = false)
    private Double costEstimate;

    @Builder.Default
    private Integer inventoryCapacity = 0;

    @Builder.Default
    private Integer inventoryUsed = 0;

    private Long parentItineraryId;
}