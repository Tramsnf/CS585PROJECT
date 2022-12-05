package org.portal.students.portalbackend.services.user;

import lombok.extern.slf4j.Slf4j;
import org.portal.students.portalbackend.models.entity.Lecturer;
import org.portal.students.portalbackend.models.entity.Student;
import org.portal.students.portalbackend.models.entity.UserProfile;
import org.portal.students.portalbackend.models.enums.Profile;
import org.portal.students.portalbackend.repositories.UserProfileRepository;
import org.portal.students.portalbackend.config.security.SessionHelper;
import org.portal.students.portalbackend.config.security.UserDto;
import org.portal.students.portalbackend.services.thirdparty.KeycloakService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@Slf4j
@Service
public class UserService {
    private final UserProfileRepository userProfileRepository;
    private final String studentId;
    private final String lecturerId;
    private final KeycloakService keycloakService;

    /**
     */
    public UserService(UserProfileRepository userProfileRepository,
                       @Value("${data.id.role.lecturer}") String lecturerId,
                       @Value("${data.id.role.student}") String studentId,
                       KeycloakService keycloakService) {
        this.userProfileRepository = userProfileRepository;
        this.lecturerId = lecturerId;
        this.studentId = studentId;
        this.keycloakService = keycloakService;
    }


    public UserProfile findUserProfileByKeycloakID() {
        var user = SessionHelper.getCurrentUser();
        Optional<UserProfile> profile = userProfileRepository.findByKeycloakId(user.getKeycloakId());
        if (profile.isEmpty()) {
            return createUserProfile(user);
        }
        return profile.get();
    }


    public Optional<UserProfile> findUserProfileByKeycloakID(String keycloakRefId) {
        Optional<UserProfile> profile = userProfileRepository.findByKeycloakId(keycloakRefId);
        return profile;
    }

    public UserProfile createUserProfile(UserDto user) {
        return userProfileRepository.save(new UserProfile(user));
    }

    public boolean setUserRole(String profile){
        var user = SessionHelper.getCurrentUser();
        var res = true;
        if(user.getRoles().contains("student")){
            log.info("User is a student");
        }
        else if(user.getRoles().contains("lecturer")){
            log.info("User is a lecturer");
        }
        else{
            if(profile.equals("student")){
                res = keycloakService.addRoleRoleToUser(profile,studentId,user);
            }else if(profile.equals("lecturer")){
                res = keycloakService.addRoleRoleToUser(profile,lecturerId,user);
            }
        }
        return res;
    }

    public Profile getUserRole(){
        var user = SessionHelper.getCurrentUser();

        if(!user.getRole().equals(Profile.UNDEFINED)){
           return user.getRole();
        }

        var res = keycloakService.getUserRoles(user);

        if(res.contains("lecturer")) {
            return Profile.LECTURER;
        }


        if(res.contains("student")) {
            return Profile.STUDENT;
        }

        return Profile.UNDEFINED;

    }

}
