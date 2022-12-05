package org.portal.students.portalbackend.config.security;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationManagerResolver;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class MultiEnvironmentAuthenticationManagerResolver implements AuthenticationManagerResolver<HttpServletRequest> {
    private final BearerTokenResolver resolver = new DefaultBearerTokenResolver();
    private final Map<String, AuthenticationManager> authenticationManagers = new ConcurrentHashMap<>();
    private final String clientId;
    private final IssuerResolver issuerSolver;
    private final RolesConfigProperties rolesConfigProperties;

    public MultiEnvironmentAuthenticationManagerResolver(String clientId, IssuerResolver issuerSolver
            , RolesConfigProperties rolesConfigProperties) {
        this.issuerSolver = issuerSolver;
        this.clientId = clientId;
        this.rolesConfigProperties = rolesConfigProperties;
    }

    @Override
    public AuthenticationManager resolve(HttpServletRequest request) {
        String environment = toEnv(request);
        if (environment == null || environment.isBlank()) return null;
        return this.authenticationManagers.computeIfAbsent(environment, this::fromEnv);
    }

    private String toEnv(HttpServletRequest request) {
        try {
            String token = this.resolver.resolve(request);
            if(token==null) return null;

            JWT parser = JWTParser.parse(token);
            String algorithm = parser.getHeader().getAlgorithm().getName();
//            if(!algorithm.equals("RS256")){return null;}

            //RS256 - utilizing public key - currently provided by Keycloak
            JWTClaimsSet claims = parser.getJWTClaimsSet();
            String tenantId = claims.getStringClaim("tenantId");
            if (tenantId == null) {
                //We could not resolve from claims
                //resolve from issuer? http://idp:9999/auth/realms/master
                String issuer = JWTParser.parse(token).getJWTClaimsSet().getIssuer();
                if (issuer != null) {
                    String[] tokens = issuer.split("/");
                    tenantId = tokens[tokens.length - 1];
                }
            }
            return tenantId;
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }

    private AuthenticationManager fromEnv(String env) {
        return Optional.ofNullable(issuerSolver.getIssuerByEnvironment(env))
                .map(issuerUri -> NimbusJwtDecoder.withJwkSetUri(issuerUri+"/protocol/openid-connect/certs")
                        .build())
                .map(decoder -> {
                    var provider = new JwtAuthenticationProvider(decoder);
                    var converter = new JwtAuthenticationConverter();
                    if(clientId!=null)
                        converter.setJwtGrantedAuthoritiesConverter
                                (new KeycloakJwtGrantedAuthoritiesConverter(clientId,rolesConfigProperties));
                    provider.setJwtAuthenticationConverter(converter);
                    return provider;
                })
                .orElseThrow(UnknownEnvException::new)::authenticate;
    }
}
