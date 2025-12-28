package com.GymManagement.System.repository;

import com.GymManagement.System.entity.UserMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserMembershipRepository extends JpaRepository<UserMembership, Long> {
    List<UserMembership> findByUserEmail(String email);
}
