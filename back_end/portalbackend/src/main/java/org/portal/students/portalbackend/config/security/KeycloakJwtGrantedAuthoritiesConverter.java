package org.portal.students.portalbackend.config.security;

import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

public class KeycloakJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    private static final String ROLES = "roles";
    private static final String RESOURCE_ACCESS = "realm_access";
    private final String clientId;
    private final RolesConfigProperties rolesConfigProperties;

    @SuppressWarnings("unused")
    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    public KeycloakJwtGrantedAuthoritiesConverter(String clientId, RolesConfigProperties rolesConfigProperties) {
        this.clientId = clientId;
        this.rolesConfigProperties = rolesConfigProperties;
    }

    @Override
    public Collection<GrantedAuthority> convert(Jwt theJwt) {
        JSONArray parsedRoles = ((JSONArray) theJwt.getClaimAsMap(RESOURCE_ACCESS).get(ROLES));
//        if (parsedRoles != null) {
//            JSONArray parsedRoles = (JSONArray) keycloakClientAuthorities.get(ROLES);
            if (parsedRoles != null && Objects.nonNull(rolesConfigProperties.getRolePermissionMap())) {
                Collection<GrantedAuthority> clientRoles = parsedRoles.stream()
                        .map(aRole -> new Role((String)aRole))
                        .collect(Collectors.toList());
//                Collection<GrantedAuthority> clientPermissions = clientRoles.stream()
//                        .filter(r -> Objects.nonNull(r.getAuthority()))
//                        .flatMap(r-> rolesConfigProperties.getRolePermissionMap().get(r.getAuthority()).stream())
//                        .map(p-> new Permission(p.name()))
//                        .collect(Collectors.toList());
//
//                clientRoles.addAll(clientPermissions);

//                if(theJwt.getClaimAsString("plan")!=null){
//                    clientRoles.addAll(rolesConfigProperties
//                            .getSubscriptionPermissions(theJwt.getClaimAsString("plan"))
//                            .stream()
//                            .map(p-> new Permission(p.name()))
//                            .collect(Collectors.toList()));
//                }
                return clientRoles;
            }
//        }

        return new ArrayList<>();
    }
}
