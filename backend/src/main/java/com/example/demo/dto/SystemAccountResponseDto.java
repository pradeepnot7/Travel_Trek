package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemAccountResponseDto {
    private Long id;
    private String identityName;
    private String fullName; // alias used by frontend Navbar
    private String email;
    private String domainRole;
    private String role;     // alias used by frontend auth.account.role
    private String status;
}