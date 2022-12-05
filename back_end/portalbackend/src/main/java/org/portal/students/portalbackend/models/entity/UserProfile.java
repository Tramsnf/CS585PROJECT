package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.UserProfileDTO;
import org.portal.students.portalbackend.config.security.UserDto;

import javax.persistence.Entity;
import javax.persistence.Table;



@Getter
@Setter
@Entity
@Table(name = "p_user_profile")
@NoArgsConstructor
public class UserProfile extends PO{
        private String keycloakId;
        private String email;
        private String userName;

        public UserProfileDTO toDto(){
                var userProfileDto = new UserProfileDTO();
                userProfileDto.setUserName(getUserName());
                userProfileDto.setEmail(getEmail());
                userProfileDto.setRefId(getKeycloakId());
                userProfileDto.setId(userProfileDto.getId());
                userProfileDto.setCreatedAt(getCreated());
                userProfileDto.setUpdatedAt(getUpdated());
                return userProfileDto;
        }

        public UserProfile(UserDto userDto) {
                this.keycloakId = userDto.getKeycloakId();
                this.email = userDto.getEmail();
                this.userName = userDto.getFullName();
        }
}
