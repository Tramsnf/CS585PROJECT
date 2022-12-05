package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}
