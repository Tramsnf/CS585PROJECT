package org.portal.students.portalbackend.services.notification;

import org.portal.students.portalbackend.config.security.SessionHelper;
import org.portal.students.portalbackend.models.dto.NotificationDTO;
import org.portal.students.portalbackend.models.entity.Notification;
import org.portal.students.portalbackend.repositories.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Kely
 * on 02, December 2022
 * http://stackoverflow.com/u/14795945
 */
@Service
public record NotificationService(
        NotificationRepository notificationRepository
) {

    public void addNotification(NotificationDTO notificationDTO){
        var notification = new Notification(notificationDTO);
        notificationRepository.save(notification);
    }

    public List<NotificationDTO> getNotifications(){
        var user = SessionHelper.getCurrentUser();
        var notifications = notificationRepository
                .findByToAndMarkedRead(user.getKeycloakId(), false);
        return notifications.stream().map(Notification::toDto)
                .collect(Collectors.toList());
    }


    public List<NotificationDTO> getAllNotifications(){
        var user = SessionHelper.getCurrentUser();
        var notifications = notificationRepository
                .findByTo(user.getKeycloakId());
        if(notifications.isEmpty()){
            return Collections.emptyList();
        }
        return notifications.stream().map(Notification::toDto)
                .collect(Collectors.toList());
    }


    public List<NotificationDTO> markNotificationRead(Long id) {

        var notificationOpt = notificationRepository.findById(id);

        if(notificationOpt.isPresent()){
            var notification = notificationOpt.get();
            notification.setMarkedRead(true);
            notificationRepository.save(notification);
        }

        return getNotifications();
    }
}
