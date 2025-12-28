package com.GymManagement.System.controller;

import com.GymManagement.System.dto.MembershipCheckoutRequestDto;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.service.StripeService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stripe")
public class StripeMembershipController {

    private final StripeService stripeService;

    public StripeMembershipController(StripeService s) {
        this.stripeService = s;
    }

    @PostMapping("/membership/checkout")
    public String membershipCheckout(@RequestBody MembershipCheckoutRequestDto req) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Get User object directly from authentication
        User user1 = (User) auth.getPrincipal();
        String username= user1.getUsername();
        return stripeService.createMembershipCheckout(req,username);
    }
}
