package com.GymManagement.System.util;

import com.GymManagement.System.constants.ApplicationConstants;
import com.GymManagement.System.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final Environment env;
    public String generateJwtToken(Authentication authentication) {

        String secret = env.getProperty(
                ApplicationConstants.JWT_SECRET_KEY,
                ApplicationConstants.JWT_SECRET_DEFAULT_VALUE
        );

        SecretKey secretKey =
                Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        User user = (User) authentication.getPrincipal();

        return Jwts.builder()
                .issuer("Gym Management System")
                .subject(user.getUsername())   // 🔥 MUST be DB username
                .claim("roles",
                        authentication.getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.joining(",")))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }}