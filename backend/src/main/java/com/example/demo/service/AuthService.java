package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.SystemAccount;
import com.example.demo.entity.SystemRole;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.SystemAccountRepository;
import com.example.demo.security.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final SystemAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public AuthResponseDto login(AuthRequestDto request) {
        SystemAccount account = accountRepository.findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new BadCredentialsException("Invalid email or password.");
        }

        String token = jwtTokenService.generateToken(account.getEmail(), account.getDomainRole().name(), account.getId());
        return AuthResponseDto.builder()
                .token(token)
                .account(toDto(account))
                .build();
    }

    public SystemAccountResponseDto register(RegisterRequestDto request) {
        if (accountRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new BusinessValidationException("An account with this email already exists.");
        }

        SystemRole role;
        try {
            role = request.getRole() != null ? SystemRole.valueOf(request.getRole()) : SystemRole.TRAVELER;
        } catch (IllegalArgumentException ex) {
            throw new BusinessValidationException("Invalid system access role.");
        }

        SystemAccount account = SystemAccount.builder()
                .identityName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .domainRole(role)
                .status("ACTIVE")
                .build();

        return toDto(accountRepository.save(account));
    }

    private SystemAccountResponseDto toDto(SystemAccount account) {
        return SystemAccountResponseDto.builder()
                .id(account.getId())
                .identityName(account.getIdentityName())
                .fullName(account.getIdentityName())
                .email(account.getEmail())
                .domainRole(account.getDomainRole().name())
                .role(account.getDomainRole().name())
                .status(account.getStatus())
                .build();
    }
}