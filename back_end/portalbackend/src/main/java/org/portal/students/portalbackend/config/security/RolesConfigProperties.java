package org.portal.students.portalbackend.config.security;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.portal.students.portalbackend.config.security.util.YamlPropertySourceFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Configuration
@ConfigurationProperties(prefix = "permission-mapping")
@PropertySource(value = "classpath:roles.yaml", factory = YamlPropertySourceFactory.class)
@Data
@NoArgsConstructor
@Slf4j
public class RolesConfigProperties {
    private List<RoleGrantedAuthority> roles;
    private List<SubscriptionGrantedAuthority> subscriptions;


    public Map<String, List<PermissionName>> getRolePermissionMap(){
        return roles.stream().collect(Collectors.toMap(RoleGrantedAuthority::getName, role -> {
            List<PermissionName> permissions = new ArrayList<>();
            List<String> addedRoles = new ArrayList<>();
            addedRoles.add(role.getName());
            extractPermissions(role, addedRoles, permissions);
            return permissions;
        }));
    }

    //This may generate a circular loop should an embedded role refer to its parent
    private List<PermissionName> extractPermissions(RoleGrantedAuthority role, List<String> rolesAdded,
                                                            List<PermissionName> permissions) {
        if(role.getPermissions()!=null){
            permissions.addAll(role.getPermissions());
        }

        if(role.getRoles()!=null){
            roles.stream()
                    .filter(r-> r.getName()!=null && role.getRoles().contains(r.getName()))
                    .forEach(embeddedRole -> {
                        if(!rolesAdded.contains(embeddedRole.getName())){
                            log.trace("Extracting embedded role: "+embeddedRole.getName());
                            rolesAdded.add(embeddedRole.getName());//This is to manage circular references
                            extractPermissions(embeddedRole,rolesAdded, permissions);
                        }
                    });
        }
        return permissions;
    }

    public List<PermissionName> getSubscriptionPermissions(String subscriptionPackage){

        SubscriptionGrantedAuthority subscription = subscriptions.stream()
                .filter(s-> subscriptionPackage.equals(s.getName()))
                .findFirst().orElse(null);
        if(subscription==null){
            return new ArrayList<>();
        }

        List<PermissionName> permissionList = new ArrayList<>();
        List<String> packagesAdded = new ArrayList<>();
        packagesAdded.add(subscriptionPackage);
        extractPermissions(subscription, packagesAdded, permissionList);
        return permissionList;
    }

    private void extractPermissions(SubscriptionGrantedAuthority subscription,
                                            List<String> packagesAdded,
                                            List<PermissionName> permissionList) {
        if(subscription.getPermissions()!=null){
            permissionList.addAll(subscription.getPermissions());
        }

        if(subscription.getSubscriptions()!=null){
            subscriptions.stream().filter(s-> s.getName()!=null
                            && subscription.getSubscriptions().contains(s.getName())
                            && !packagesAdded.contains(s.getName()))
                            .forEach(s-> {
                                packagesAdded.add(s.getName());
                                extractPermissions(s, packagesAdded, permissionList);
                            });
        }
    }
}
