package com.example.demo.repository;

import com.example.demo.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {

    List<TravelPackage> findByDestinationContainingIgnoreCase(String destination);

    List<TravelPackage> findByActiveTrue();

    @Query("SELECT p FROM TravelPackage p WHERE p.price <= :maxPrice")
    List<TravelPackage> findPackagesUnderPrice(@Param("maxPrice") Double maxPrice);
}