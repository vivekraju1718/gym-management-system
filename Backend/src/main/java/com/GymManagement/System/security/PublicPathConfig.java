package com.GymManagement.System.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;
@Configuration
public class PublicPathConfig {

    @Bean(name = "publicPaths")
    public List<String> publicPaths() {
        return List.of(
                "/api/v1/auth/**",
               "api/v1/memberships",
                "/api/v1/products/**",
                "/error"
        );
    }
}
