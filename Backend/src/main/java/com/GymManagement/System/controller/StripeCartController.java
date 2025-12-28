package com.GymManagement.System.controller;

import com.GymManagement.System.dto.CartCheckoutRequest;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.UserRepository;
import com.GymManagement.System.service.StripeCartService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stripe/cart")
public class StripeCartController {

    private final StripeCartService stripeCartService;
    private final UserRepository userRepo;

    public StripeCartController(StripeCartService s, UserRepository u){
        this.stripeCartService = s;
        this.userRepo = u;
    }

    @PostMapping("/checkout")
    public String checkout(@RequestBody CartCheckoutRequest req) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Get User object directly from authentication
        User user = (User) auth.getPrincipal();
        String username= user.getUsername();

        return stripeCartService.checkout(req, user.getId(), user.getUsername());
    }
}
