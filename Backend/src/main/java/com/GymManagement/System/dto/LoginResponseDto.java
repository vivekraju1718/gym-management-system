package com.GymManagement.System.dto;

import java.util.List;
import java.util.Set;

public record LoginResponseDto(String token,
                               String name,
                               Set<String> roles) {
}
