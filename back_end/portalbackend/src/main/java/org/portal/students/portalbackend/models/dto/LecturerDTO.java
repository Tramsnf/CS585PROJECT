package org.portal.students.portalbackend.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;



@Getter
@Setter
public class LecturerDTO{
        Long id;
        String registrationNumber;
        UserProfileDTO profile;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
        LocalDateTime created;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
        LocalDateTime updated;
}
