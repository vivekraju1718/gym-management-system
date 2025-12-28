package com.GymManagement.System.controller;

import com.GymManagement.System.entity.Membership;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.entity.UserMembership;
import com.GymManagement.System.service.MembershipService;
import com.GymManagement.System.service.UserMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/memberships")
@RequiredArgsConstructor
public class MembershipController {
    private final UserMembershipService userMembershipService;
    private final MembershipService service;

    @PostMapping
    public Membership create(@RequestBody Membership m) {
        return service.createPlan(m);
    }

    @GetMapping
    public List<Membership> getAll() {
        return service.getActivePlans();
    }

    @PutMapping("/{id}")
    public Membership update(@PathVariable Long id, @RequestBody Membership m) {
        return service.updatePlan(id, m);
    }

    @DeleteMapping("/{id}")
    public void disable(@PathVariable Long id, @RequestParam String updatedBy) {
        service.disablePlan(id, updatedBy);
    }

    @GetMapping("/my")
    public List<UserMembership> getMyMemberships() {
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        User user=(User) auth.getPrincipal();
        String useremail=user.getUsername();
        return userMembershipService.getMembershipsByUser(useremail);
    }
}
