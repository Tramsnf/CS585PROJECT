package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.NotificationDTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;



@Getter
@Setter
@Entity
@Table(name = "d_notification")
public class Notification extends  PO{
        private String url;
        private String description;
        @Column(name="toUser")
        private String to;
        private boolean markedRead;

    public Notification(NotificationDTO notificationDTO) {
        setUrl(notificationDTO.getUrl());
        setDescription(notificationDTO.getDescription());
        setMarkedRead(false);
        setTo(notificationDTO.getTo());
        setIsActive(1);
    }

    public Notification() {

    }

    public NotificationDTO toDto(){
                var notificationDto = new NotificationDTO();
                notificationDto.setId(getId());
                notificationDto.setUrl(getUrl());
                notificationDto.setDescription(getDescription());
                notificationDto.setMarkedRead(isMarkedRead());
                notificationDto.setUpdatedAt(getUpdated());
                notificationDto.setCreatedAt(getCreated());
                return notificationDto;
        }
}
