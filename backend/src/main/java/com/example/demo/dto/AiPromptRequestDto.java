package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiPromptRequestDto {

    @NotBlank(message = "Prompt text is required")
    private String prompt;
}