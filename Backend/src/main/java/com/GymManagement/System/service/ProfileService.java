package com.GymManagement.System.service;

import com.GymManagement.System.dto.ProfileDto;
import com.GymManagement.System.entity.Address;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.AddressRepository;
import com.GymManagement.System.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepo;
    private final AddressRepository addressRepo;

    public ProfileDto getProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Get User object directly from authentication
        User user1 = (User) auth.getPrincipal();
        String username= user1.getUsername();
        User user = userRepo.findByUsername(username).orElseThrow();

        Address addr = addressRepo.findByUserUsername(username);

        return new ProfileDto(
                user.getName(),
                user.getUsername(),
                addr != null ? addr.getDoorNo() : "",
                addr != null ? addr.getStreet() : "",
                addr != null ? addr.getCity() : "",
                addr != null ? addr.getState() : "",
                addr != null ? addr.getPincode() : ""
        );
    }

    public void updateProfile(ProfileDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Get User object directly from authentication
        User user1 = (User) auth.getPrincipal();
        String username= user1.getUsername();
        User user = userRepo.findByUsername(username).orElseThrow();

        user.setName(dto.name());
        userRepo.save(user);

        Address address = addressRepo.findByUserUsername(username);
        if (address == null) {
            address = new Address();
            address.setUser(user);        // ← THIS MUST BE BEFORE SAVE
            user.setAddress(address);
        }
        address.setDoorNo(dto.doorNo());
        address.setStreet(dto.street());
        address.setCity(dto.city());
        address.setState(dto.state());
        address.setPincode(dto.pincode());
        address.setUser(user);

        addressRepo.save(address);
    }
}
