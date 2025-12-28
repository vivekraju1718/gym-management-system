package com.GymManagement.System.service;

import com.GymManagement.System.entity.Role;
import com.GymManagement.System.entity.User;

import com.GymManagement.System.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public User registerUser(String name, String username, String rawPassword) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("EMAIL_EXISTS");
        }
        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        Role role=new Role();
        role.setRoleName("ROLE_USER");
        role.setUser(user);
        user.setRoles(Set.of(role));

        return userRepository.save(user);
    }
}
