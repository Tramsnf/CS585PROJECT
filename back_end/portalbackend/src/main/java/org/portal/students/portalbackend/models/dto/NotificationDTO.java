package org.portal.students.portalbackend.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;



@Getter
@Setter
public class NotificationDTO{
    private Long id;
    private String url;
    private String description;
    private String to;
    private boolean markedRead;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    private LocalDateTime createdAt;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    private LocalDateTime updatedAt;

}
