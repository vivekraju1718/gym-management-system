package com.GymManagement.System.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MembershipCheckoutRequestDto {
    private Long membershipId;
    private Integer userPaidPrice;
}
