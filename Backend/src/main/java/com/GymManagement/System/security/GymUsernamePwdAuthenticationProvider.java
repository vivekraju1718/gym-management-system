package com.GymManagement.System.security;

import com.GymManagement.System.entity.User;
import com.GymManagement.System.entity.Role;
import com.GymManagement.System.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
@Component
@RequiredArgsConstructor
public class GymUsernamePwdAuthenticationProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    @Lazy
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) {

        String username = authentication.getName();
        String rawPassword = authentication.getCredentials().toString();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword()))
            throw new BadCredentialsException("Invalid password");

        var authorities = user.getRoles().stream()
                .map(r -> new SimpleGrantedAuthority(r.getRoleName()))
                .toList();

        return new UsernamePasswordAuthenticationToken(user, null, authorities);
    }

    @Override
    public boolean supports(Class<?> auth) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(auth);
    }
}