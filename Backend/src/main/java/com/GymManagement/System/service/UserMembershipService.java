package com.GymManagement.System.service;

import com.GymManagement.System.entity.UserMembership;
import com.GymManagement.System.repository.UserMembershipRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserMembershipService {

    private final UserMembershipRepository repo;

    public UserMembershipService(UserMembershipRepository repo) {
        this.repo = repo;
    }

    public List<UserMembership> getAllMemberships() {
        return repo.findAll();
    }
    public List<UserMembership> getMembershipsByUser(String email) {
        return repo.findByUserEmail(email);
    }

}
