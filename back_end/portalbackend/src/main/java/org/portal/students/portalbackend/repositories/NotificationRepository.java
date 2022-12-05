package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByTo(String to);

    List<Notification> findByToAndMarkedRead(String to, boolean markedRead);


}
