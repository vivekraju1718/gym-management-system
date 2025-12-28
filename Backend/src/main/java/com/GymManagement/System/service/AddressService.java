package com.GymManagement.System.service;

import com.GymManagement.System.entity.Address;
import com.GymManagement.System.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository repo;

    public boolean isAddressComplete(Long userId) {

        Address a = repo.findByUserId(userId).orElse(null);

        if (a == null) return false;

        return a.getDoorNo() != null && !a.getDoorNo().isBlank()
                && a.getStreet() != null && !a.getStreet().isBlank()
                && a.getCity() != null && !a.getCity().isBlank()
                && a.getState() != null && !a.getState().isBlank()
                && a.getPincode() != null && !a.getPincode().isBlank();
    }

}
