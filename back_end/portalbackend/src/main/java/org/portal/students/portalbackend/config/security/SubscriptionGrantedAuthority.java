package org.portal.students.portalbackend.config.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionGrantedAuthority {
    private String name;
    private String description;
    private List<PermissionName> permissions;
    private List<String> subscriptions;//subscriptions
}
