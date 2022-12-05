package org.portal.students.portalbackend.config.security;

import lombok.Getter;

@Getter
public enum PermissionName {

    TEST_PERMISSION("Just another test perm");



    public final String description;

    PermissionName(String descriptions) {
        this.description = descriptions;
    }
}
