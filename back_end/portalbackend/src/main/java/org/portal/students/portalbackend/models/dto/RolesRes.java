package org.portal.students.portalbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Kely
 * on 02, December 2022
 * http://stackoverflow.com/u/14795945
 */

@Setter
@Getter
public class RolesRes {
    List<RoleDto> roles;

    public RolesRes() {
        roles = new ArrayList<>();
    }
}
