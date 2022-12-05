package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.Lecturer;
import org.portal.students.portalbackend.models.entity.UserProfile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
    Optional<Lecturer> findByProfile(UserProfile userProfile);

    Optional<Lecturer> findByProfile_KeycloakId(String keycloakId);

    List<Lecturer> findByProfile_UserNameLikeIgnoreCase(String userName, Pageable pageable);

}
