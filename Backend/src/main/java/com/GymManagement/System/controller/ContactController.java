package com.GymManagement.System.controller;

import com.GymManagement.System.entity.User;
import com.GymManagement.System.service.ContactService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public void send(@RequestBody Map<String, String> req, Authentication auth) {

        User user = (User) auth.getPrincipal();

        service.saveMessage(
                user.getId(),
                req.get("email"),
                req.get("subject"),
                req.get("message")
        );
    }
}
