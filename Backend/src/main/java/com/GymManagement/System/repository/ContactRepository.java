package com.GymManagement.System.repository;

import com.GymManagement.System.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByStatus(String status);
}
