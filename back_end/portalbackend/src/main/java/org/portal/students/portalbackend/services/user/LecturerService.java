package org.portal.students.portalbackend.services.user;

import org.portal.students.portalbackend.models.dto.ActiveProfileDTO;
import org.portal.students.portalbackend.models.entity.Lecturer;
import org.portal.students.portalbackend.repositories.LecturerRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class LecturerService {
    private final LecturerRepository lecturerRepository;
    private final UserService userService;

    /**
     */
    public LecturerService(
            LecturerRepository lecturerRepository,
            UserService userService
    ) {
        this.lecturerRepository = lecturerRepository;
        this.userService = userService;
    }


    public ActiveProfileDTO createLecturer() {
        var userProfile = userService.findUserProfileByKeycloakID();


        var lecturerOptional = lecturerRepository.findByProfile(userProfile);

        if(lecturerOptional.isPresent()){
            return lecturerOptional.map(ActiveProfileDTO::copy)
                    .orElse(null);
        }


        var lecturer = new Lecturer();

        lecturer.setProfile(userProfile);

        lecturer = lecturerRepository.save(lecturer);
        var regNo = String.format("%04d", lecturer.getId());
        lecturer.setRegistrationNumber("LCTR-" + regNo);

        lecturer = lecturerRepository.save(lecturer);

        return ActiveProfileDTO.copy(lecturer);
    }

    public Optional<Lecturer> getCurrentLecturer() {
        var userProfile = userService.findUserProfileByKeycloakID();


        return lecturerRepository.findByProfile(userProfile);
    }


    public Optional<Lecturer> getLecturerByKeycloakId(String refId) {
        return lecturerRepository.findByProfile_KeycloakId(refId);
    }

}
