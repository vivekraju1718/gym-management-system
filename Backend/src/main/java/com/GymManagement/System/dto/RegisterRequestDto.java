package com.GymManagement.System.dto;

public record RegisterRequestDto(   String name,
                                    String username,   // email
                                    String password) {
}
