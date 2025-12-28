package com.GymManagement.System.controller;

import com.GymManagement.System.dto.ProfileDto;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.AddressRepository;
import com.GymManagement.System.service.AddressService;
import com.GymManagement.System.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService service;
  private final AddressService addressService;
    @GetMapping
    public ProfileDto getProfile() {

        return service.getProfile();
    }

    @PutMapping
    public void updateProfile(@RequestBody ProfileDto dto) {

        service.updateProfile(dto);
    }
    @GetMapping("/address-complete")
    public ResponseEntity<Boolean> isAddressComplete(Authentication auth) {
        User user = (User) auth.getPrincipal();
        boolean result = addressService.isAddressComplete(user.getId());
        return ResponseEntity.ok(result);
    }


}
