package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.Lecturer;
import org.portal.students.portalbackend.models.entity.Space;
import org.portal.students.portalbackend.models.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {
    List<Space> findByLecturer_Profile_KeycloakIdOrderByUpdated(String keycloakId);

    List<Space> findByStudent_Profile_KeycloakIdOrderByUpdated(String keycloakId);

    Optional<Space> findByLecturerAndStudent(Lecturer lecturer, Student student);


}
