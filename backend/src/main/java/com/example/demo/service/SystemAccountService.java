package com.example.demo.service;

import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.dto.SystemAccountResponseDto;
import com.example.demo.entity.SystemAccount;
import com.example.demo.entity.SystemRole;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.SystemAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemAccountService {

    private final SystemAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public List<SystemAccountResponseDto> getAll() {
        return accountRepository.findAll().stream().map(this::toDto).toList();
    }

    public SystemAccountResponseDto create(RegisterRequestDto request) {
        if (accountRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new BusinessValidationException("An account with this email already exists.");
        }

        SystemRole role;
        try {
            role = request.getRole() != null ? SystemRole.valueOf(request.getRole()) : SystemRole.TRAVELER;
        } catch (IllegalArgumentException ex) {
            throw new BusinessValidationException("Invalid system access role.");
        }

        SystemAccount entity = SystemAccount.builder()
                .identityName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .domainRole(role)
                .status("ACTIVE")
                .build();

        return toDto(accountRepository.save(entity));
    }

    public void delete(Long id) {
        SystemAccount entity = accountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Account not found with id " + id));
        entity.setStatus("INACTIVE");
        accountRepository.save(entity);
    }

    private SystemAccountResponseDto toDto(SystemAccount entity) {
        return SystemAccountResponseDto.builder()
                .id(entity.getId())
                .identityName(entity.getIdentityName())
                .fullName(entity.getIdentityName())
                .email(entity.getEmail())
                .domainRole(entity.getDomainRole().name())
                .role(entity.getDomainRole().name())
                .status(entity.getStatus())
                .build();
    }
}