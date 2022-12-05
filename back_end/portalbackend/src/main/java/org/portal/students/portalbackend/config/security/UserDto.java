package org.portal.students.portalbackend.config.security;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.portal.students.portalbackend.models.enums.Profile;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String keycloakId;
     private String UUID;
     private String gid;
     private String refId;
     private String domain;
     private String tenantId;
     private String firstName;
     private String lastName;
     private String fullName;
     private String email;
    private String locale;
    private String auth;
    private List<String> roles;
    private List<String> scopes;
    private List<String> permissions;
    private String accountCode;

    public Profile getRole(){

        if(getRoles().contains("student")){
            return Profile.STUDENT;
        }
        else if(getRoles().contains("lecturer")){
            return Profile.LECTURER;
        }

        return Profile.UNDEFINED;
    }
}
