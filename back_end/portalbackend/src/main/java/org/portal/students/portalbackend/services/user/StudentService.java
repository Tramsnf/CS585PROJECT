package org.portal.students.portalbackend.services.user;

import org.portal.students.portalbackend.models.dto.ActiveProfileDTO;
import org.portal.students.portalbackend.models.entity.Student;
import org.portal.students.portalbackend.repositories.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final UserService userService;

    /**
     */
    public StudentService(
            StudentRepository studentRepository,
            UserService userService
    ) {
        this.studentRepository = studentRepository;
        this.userService = userService;
    }


    @Transactional
    public ActiveProfileDTO createStudent() {
        var userProfile = userService.findUserProfileByKeycloakID();

        var studentOptional = studentRepository.findByProfile(userProfile);

        if(studentOptional.isPresent()){
            return studentOptional.map(ActiveProfileDTO::copy)
                    .orElse(null);
        }

        var student = new Student();

        student.setProfile(userProfile);

        student = studentRepository.save(student);
        var regNo = String.format("%04d", student.getId());
        student.setRegistrationNumber("STDR-" + regNo);

        student = studentRepository.save(student);

        return ActiveProfileDTO.copy(student);
    }


    public Optional<Student> getCurrentStudent() {
        var userProfile = userService.findUserProfileByKeycloakID();
        return studentRepository.findByProfile(userProfile);
    }


    public Optional<Student> getStudentByKeycloakId(String refId) {
        return studentRepository.findByProfile_KeycloakId(refId);
    }
}
