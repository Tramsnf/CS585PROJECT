package org.portal.students.portalbackend.repositories;

import org.portal.students.portalbackend.models.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
