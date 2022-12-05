package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;



@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByKeycloakId(String keycloakId);
}
