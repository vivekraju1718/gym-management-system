package com.GymManagement.System.repository;

import com.GymManagement.System.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByUserUsername(String username);

    Optional<Address> findByUserId(Long userId);
}
