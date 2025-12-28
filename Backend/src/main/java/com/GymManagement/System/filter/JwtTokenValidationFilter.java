package com.GymManagement.System.filter;

import com.GymManagement.System.constants.ApplicationConstants;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenValidationFilter extends OncePerRequestFilter {

    private final Environment env;
    private final UserRepository userRepo;

    @Qualifier("publicPaths")
    private final List<String> publicPaths;

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String jwt = header.substring(7);

            String secret = env.getProperty(
                    ApplicationConstants.JWT_SECRET_KEY,
                    ApplicationConstants.JWT_SECRET_DEFAULT_VALUE
            );

            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(jwt)
                    .getPayload();

            // 🔑 THIS IS THE FIX
            String username = claims.getSubject();     // real username

            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new BadCredentialsException("User not found"));

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    AuthorityUtils.commaSeparatedStringToAuthorityList(
                            String.valueOf(claims.get("roles"))
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (ExpiredJwtException ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("JWT Token Expired");
            return;
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return publicPaths.stream()
                .anyMatch(publicPath -> pathMatcher.match(publicPath, path));
    }
}
