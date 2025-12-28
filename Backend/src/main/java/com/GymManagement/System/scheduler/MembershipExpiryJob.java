package com.GymManagement.System.scheduler;

import com.GymManagement.System.repository.UserMembershipRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class MembershipExpiryJob {

    private final UserMembershipRepository repo;

    public MembershipExpiryJob(UserMembershipRepository r) {
        this.repo = r;
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void expireMemberships() {
        repo.findAll().forEach(m -> {
            if (m.getEndDate().isBefore(LocalDate.now()) && m.getStatus().equals("ACTIVE")) {
                m.setStatus("EXPIRED");
                repo.save(m);
            }
        });
    }
}
