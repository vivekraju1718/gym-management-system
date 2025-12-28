package com.GymManagement.System.service;

import com.GymManagement.System.entity.Membership;
import com.GymManagement.System.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository repo;

    public Membership createPlan(Membership m) {
        return repo.save(m);
    }

    public List<Membership> getActivePlans() {
        return repo.findByActiveTrueOrderByMonthsAsc();
    }

    public Membership updatePlan(Long id, Membership m) {
        Membership db = repo.findById(id).orElseThrow();
        db.setPlanName(m.getPlanName());
        db.setMonths(m.getMonths());
        db.setPrice(m.getPrice());
        db.setDiscount(m.getDiscount());
        db.setDescription(m.getDescription());
        db.setUpdatedBy(m.getUpdatedBy());
        return repo.save(db);
    }

    public void disablePlan(Long id, String updatedBy) {
        Membership db = repo.findById(id).orElseThrow();
        db.setActive(false);
        db.setUpdatedBy(updatedBy);
        repo.save(db);
    }
}
