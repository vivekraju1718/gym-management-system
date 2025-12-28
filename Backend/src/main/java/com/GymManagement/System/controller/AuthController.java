package com.GymManagement.System.controller;

import com.GymManagement.System.dto.LoginRequestDto;
import com.GymManagement.System.dto.LoginResponseDto;

import com.GymManagement.System.dto.RegisterRequestDto;
import com.GymManagement.System.entity.Role;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.UserRepository;
import com.GymManagement.System.service.AuthService;
import com.GymManagement.System.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto req) {
        try {
            authService.registerUser(req.name(), req.username(), req.password());
            return ResponseEntity.ok("REGISTER_SUCCESS");
        } catch (RuntimeException ex) {
            if (ex.getMessage().equals("EMAIL_EXISTS")) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            throw ex;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto req) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(), req.getPassword()
                )
        );

        User user = (User) auth.getPrincipal();
        String token = jwtUtil.generateJwtToken(auth);

        Set<String> roles = user.getRoles()
                .stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());

        return ResponseEntity.ok(new LoginResponseDto(token, user.getName(), roles));
    }
}