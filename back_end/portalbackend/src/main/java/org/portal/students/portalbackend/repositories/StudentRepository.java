package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.Student;
import org.portal.students.portalbackend.models.entity.UserProfile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByProfile(UserProfile userProfile);
    Optional<Student> findByProfile_KeycloakId(String keycloakId);
    List<Student> findByProfile_UserNameLikeIgnoreCase(String userName, Pageable pageable);
}
