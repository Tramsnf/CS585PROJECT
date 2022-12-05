package org.portal.students.portalbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Kely
 * on 02, December 2022
 * http://stackoverflow.com/u/14795945
 */

@ToString
@Setter
@Getter
@NoArgsConstructor
public class RoleDto {
    private String id;
    private String name;
    private String description;
    private Boolean composite;
    private Boolean clientRole;
    private String containerId;
}
