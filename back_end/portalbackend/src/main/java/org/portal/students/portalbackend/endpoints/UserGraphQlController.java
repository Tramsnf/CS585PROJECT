package org.portal.students.portalbackend.endpoints;

import lombok.extern.slf4j.Slf4j;
import org.portal.students.portalbackend.config.security.SessionHelper;
import org.portal.students.portalbackend.models.dto.ActiveProfileDTO;
import org.portal.students.portalbackend.models.dto.LecturerDTO;
import org.portal.students.portalbackend.models.dto.StudentDTO;
import org.portal.students.portalbackend.models.entity.Lecturer;
import org.portal.students.portalbackend.models.entity.Student;
import org.portal.students.portalbackend.repositories.LecturerRepository;
import org.portal.students.portalbackend.repositories.StudentRepository;
import org.portal.students.portalbackend.services.user.LecturerService;
import org.portal.students.portalbackend.services.user.StudentService;
import org.portal.students.portalbackend.services.user.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Slf4j
@Controller
public class UserGraphQlController {

    private final StudentRepository studentRepository;
    private final LecturerService lecturerService;
    private final LecturerRepository lecturerRepository;
    private final StudentService studentService;
    private final UserService userService;

    public UserGraphQlController(StudentRepository studentRepository, LecturerService lecturerService, LecturerRepository lecturerRepository, StudentService studentService, UserService userService) {
        this.studentRepository = studentRepository;
        this.lecturerService = lecturerService;
        this.lecturerRepository = lecturerRepository;
        this.studentService = studentService;
        this.userService = userService;
    }

    @Transactional
    @QueryMapping
    List<StudentDTO> students() {
        log.info("getting students");
        return studentRepository.findAll()
                .stream()
                .map(Student::toDto)
                .collect(Collectors.toList());
    }


    @QueryMapping
    List<LecturerDTO> lecturers() {
        log.info("getting lecturers");
        return lecturerRepository.findAll()
                .stream()
                .map(Lecturer::toDto)
                .collect(Collectors.toList());
    }

    @QueryMapping
    List<LecturerDTO> searchLecturers(String name) {
        log.info("getting lecturers where name like "+name);
        return lecturerRepository.findByProfile_UserNameLikeIgnoreCase(
                        name,
                        PageRequest.of(1, 10, Sort.by("id"))
                ).stream()
                .map(Lecturer::toDto)
                .collect(Collectors.toList());
    }

    @QueryMapping
    Set<ActiveProfileDTO> searchProfiles(@Argument String profile, @Argument String name) {

        var students = studentRepository.findByProfile_UserNameLikeIgnoreCase(
                        "%"+name+"%",
                        PageRequest.of(0, 10, Sort.by("id"))
                ).stream()
                .map(ActiveProfileDTO::copy)
                .collect(Collectors.toList());

        var lecturers = lecturerRepository.findByProfile_UserNameLikeIgnoreCase(
                        "%"+name+"%",
                        PageRequest.of(0, 10, Sort.by("id"))
                ).stream()
                .map(ActiveProfileDTO::copy)
                .collect(Collectors.toList());

        log.info("getting students where name like "+name);
        return Stream.concat(lecturers.stream(),students.stream())
                .filter(activeProfileDTO -> !activeProfileDTO.getType().equals(profile))
                .collect(Collectors.toSet());
    }

    @QueryMapping
    ActiveProfileDTO getActiveProfile(String type) {
        var user = SessionHelper.getCurrentUser();
        if(type.equals("lecturer")) {
            log.info("getting lecturers");


            return lecturerRepository.findByProfile_KeycloakId(user.getKeycloakId())
                    .map(ActiveProfileDTO::copy)
                    .orElse(null);
        }else{
            log.info("getting students");
            return studentRepository.findByProfile_KeycloakId(user.getKeycloakId())
                    .map(ActiveProfileDTO::copy)
                    .orElse(null);
        }
    }


    @QueryMapping
    ActiveProfileDTO getProfileByRefId(@Argument String refId) {
            log.info("getting lecturers");
            var lecturer = lecturerRepository.findByProfile_KeycloakId(refId)
                    .map(ActiveProfileDTO::copy)
                    .orElse(null);
            if(Objects.nonNull(lecturer)){
                return lecturer;
            }
            var student =  studentRepository.findByProfile_KeycloakId(refId)
                    .map(ActiveProfileDTO::copy)
                    .orElse(null);
            if(Objects.nonNull(student)){
                return student;
            }
            throw new NoSuchElementException("Profile not found");
    }

    @MutationMapping
    public ActiveProfileDTO createProfile(@Argument String profile) {


        // service to call keycloak and set lecturer role
        userService.setUserRole(profile);

        profile = profile+"";
        if(profile.equals("student")) {
            log.info("create student");
            return (studentService.createStudent());
        }
        else if(profile.equals("lecturer")){
            log.info("create lecturer");
            return (lecturerService.createLecturer());
        }

        return null;
    }

}
