package com.GymManagement.System.repository;

import com.GymManagement.System.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByActiveTrueOrderByMonthsAsc();
}
