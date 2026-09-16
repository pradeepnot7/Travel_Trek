// package com.example.demo.entity;

// import jakarta.persistence.*;
// import lombok.*;

// import java.time.LocalDateTime;

// @Entity
// @Table(name = "travel_packages")
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class TravelPackage {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String packageName;

//     @Column(nullable = false)
//     private String destination;

//     @Column(nullable = false)
//     private Double price;

//     @Column(length = 1000)
//     private String description;

//     @Builder.Default
//     @Column(nullable = false)
//     private Boolean active = true;

//     @Builder.Default
//     private Integer reservedCapacity = 0;

//     @Builder.Default
//     private Integer totalCapacity = 50;

//     @Builder.Default
//     private LocalDateTime createdAt = LocalDateTime.now();
// }




package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "travel_package")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String packageName;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private Double price;

    @Column(length = 1000)
    private String description;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @Builder.Default
    private Integer reservedCapacity = 0;

    @Builder.Default
    private Integer totalCapacity = 50;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}