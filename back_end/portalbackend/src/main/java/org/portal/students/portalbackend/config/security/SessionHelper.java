package org.portal.students.portalbackend.config.security;

import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Component
public class SessionHelper {


    public static UserDto getCurrentUser() {
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof JwtAuthenticationToken)) {
            return null;
        } else {
            JwtAuthenticationToken authentication = (JwtAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
            if (!authentication.isAuthenticated()) {
                return null;
            } else {
                Jwt jwt = (Jwt)authentication.getToken();
                String token = jwt.getTokenValue();
                String tokenId = jwt.getId();
                UserDto userDto = new UserDto();

                try {
                    JWTClaimsSet claims = JWTParser.parse(token).getJWTClaimsSet();
                    String domain = null;
                    String issuer = claims.getIssuer();
                    String uuid;
                    if (issuer != null) {
                        uuid = URI.create(issuer).getHost();
                        int idx = uuid.indexOf(".");
                        domain = uuid.substring(idx + 1);
                    }

                    uuid = claims.getSubject();
                    String gid = claims.getStringClaim("gid");
                    String firstName = claims.getStringClaim("given_name");
                    String lastName = claims.getStringClaim("family_name");
                    String email = claims.getStringClaim("email");
                    String refId = jwt.getClaimAsString("refId");
                    String locale = jwt.getClaimAsString("locale");
                    String tenantId = claims.getStringClaim("tenantId");
                    String keycloakId = claims.getStringClaim("sub");
                    String fullname = claims.getStringClaim("name");
                    if (Objects.nonNull(keycloakId)) {
                        userDto.setKeycloakId(keycloakId);
                    }

                    String scopeString = (String)claims.getClaim("scope");
                    if (Objects.nonNull(scopeString)) {
                        userDto.setScopes(Arrays.asList(scopeString.split(" ")));
                    }

                    userDto.setUUID(uuid);
                    userDto.setGid(gid);
                    userDto.setRefId(refId);
                    userDto.setDomain(domain);
                    userDto.setAccountCode(tenantId);
                    userDto.setFirstName(firstName);
                    userDto.setLastName(lastName);
                    userDto.setEmail(email);
//                    String fullName = null;
//                    if (firstName != null) {
//                        fullName = firstName;
//                    }
//
//                    if (lastName != null && fullName != null) {
//                        fullName = fullName + " " + lastName;
//                    }

                    userDto.setFullName(fullname);
                    userDto.setLocale(locale);
                    userDto.setAuth("iam");

                } catch (Exception var24) {
                    throw new RuntimeException(var24);
                }

                Collection<GrantedAuthority> authorities = authentication.getAuthorities();
                List<String> permissions = (List)authorities.stream().filter((grantedAuthority) -> {
                    return grantedAuthority instanceof Permission;
                }).map(GrantedAuthority::getAuthority).collect(Collectors.toList());
                userDto.setPermissions(permissions);
                List<String> roles = (List)authorities.stream().filter((grantedAuthority) -> {
                    return grantedAuthority instanceof Role;
                }).map(GrantedAuthority::getAuthority).collect(Collectors.toList());
                userDto.setRoles(roles);
                return userDto;
            }
        }
    }
}
