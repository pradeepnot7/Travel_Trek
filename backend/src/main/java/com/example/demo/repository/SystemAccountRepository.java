package com.example.demo.repository;

import com.example.demo.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SystemAccountRepository extends JpaRepository<SystemAccount, Long> {
    Optional<SystemAccount> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);

    // Alias for compatibility with AppUserDetailsService
    default Optional<SystemAccount> findByEmail(String email) {
        return findByEmailIgnoreCase(email);
    }
}