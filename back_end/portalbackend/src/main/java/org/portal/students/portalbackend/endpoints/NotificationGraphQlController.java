package org.portal.students.portalbackend.endpoints;

import lombok.extern.slf4j.Slf4j;
import org.portal.students.portalbackend.models.dto.NotificationDTO;
import org.portal.students.portalbackend.models.dto.UserSpacesDto;
import org.portal.students.portalbackend.services.notification.NotificationService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;


@Slf4j
@Controller
public class NotificationGraphQlController {

    private final NotificationService notificationService;

    public NotificationGraphQlController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @QueryMapping
    List<NotificationDTO> getNotifications(){
        return notificationService.getNotifications();
    }


    @MutationMapping
    List<NotificationDTO> markNotificationRead(@Argument Long id){
        return notificationService.markNotificationRead(id);
    }

}
