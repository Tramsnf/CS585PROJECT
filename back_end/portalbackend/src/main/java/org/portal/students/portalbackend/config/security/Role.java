package org.portal.students.portalbackend.config.security;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {

    private String roleName;

    private Role(){}

    public Role(String roleName){
        this.roleName = roleName;
    }

    @Override
    public String getAuthority() {
        return roleName;
    }
}
