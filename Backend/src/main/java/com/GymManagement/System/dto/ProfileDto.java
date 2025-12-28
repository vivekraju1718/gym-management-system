package com.GymManagement.System.dto;

public record ProfileDto(
        String name,
        String username,
        String doorNo,
        String street,
        String city,
        String state,
        String pincode
) {}
