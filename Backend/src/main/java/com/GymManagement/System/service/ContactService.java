package com.GymManagement.System.service;

import com.GymManagement.System.constants.ApplicationConstants;
import com.GymManagement.System.entity.ContactMessage;
import com.GymManagement.System.repository.ContactRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repo;

    public ContactService(ContactRepository repo){
        this.repo = repo;
    }

    public void saveMessage(Long userId, String email, String subject, String msg) {

        ContactMessage c = new ContactMessage();
        c.setUserId(userId);
        c.setUserEmail(email);
        c.setSubject(subject);
        c.setMessage(msg);
        c.setStatus(ApplicationConstants.CONTACT_STATUS_SENT); // SENT by default

        repo.save(c);
    }

    public List<ContactMessage> pending(){
        return repo.findByStatus(ApplicationConstants.CONTACT_STATUS_SENT);
    }

    public void update(Long id,String status){
        ContactMessage c = repo.findById(id).orElseThrow();
        c.setStatus(status);
        repo.save(c);
    }
}
