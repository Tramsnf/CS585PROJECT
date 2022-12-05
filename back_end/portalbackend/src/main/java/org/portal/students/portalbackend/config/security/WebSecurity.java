package org.portal.students.portalbackend.config.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.util.StringUtils;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Slf4j
@Configuration
@EnableWebSecurity
public class WebSecurity{

    private final DelegatingAuthenticationManagerResolver authenticationManagerResolver;

    public WebSecurity(DelegatingAuthenticationManagerResolver authenticationManagerResolver) {
        this.authenticationManagerResolver = authenticationManagerResolver;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .cors().disable()
                .authorizeHttpRequests()
                .anyRequest().authenticated()
                .and()
                .oauth2ResourceServer(rs -> rs.authenticationManagerResolver(authenticationManagerResolver))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return httpSecurity.build();
    }

    @Bean
    @Order(-100)
    public FilterRegistrationBean<Filter> envContextHolderFilter(){
        FilterRegistrationBean<Filter> tenantContextHolderFilterBean = new FilterRegistrationBean<>();

        tenantContextHolderFilterBean.setFilter(((servletRequest, servletResponse, filterChain) -> {
            String env = null;
            String jwtToken=null;
            var authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication instanceof AbstractOAuth2TokenAuthenticationToken) {
                //noinspection rawtypes
                AbstractOAuth2TokenAuthenticationToken bearer =
                        (AbstractOAuth2TokenAuthenticationToken) authentication;
                env = (String) bearer.getTokenAttributes().get("env");
                jwtToken=bearer.getToken().getTokenValue();
            }

            if (!StringUtils.hasText(env)) {
                HttpServletRequest httpServletRequest=(HttpServletRequest) servletRequest;
                env=httpServletRequest.getHeader("env");
                if (Objects.isNull(env)) env = httpServletRequest.getParameter("env");
            }

            JWTTokenContextHolder.setJWTToken(jwtToken);
            TenantContextHolder.setTenantId(env);
            filterChain.doFilter(servletRequest, servletResponse);

            TenantContextHolder.destroy();
            JWTTokenContextHolder.destroy();
        }));

        return tenantContextHolderFilterBean;
    }

}
