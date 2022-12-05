package org.portal.students.portalbackend.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.portal.students.portalbackend.models.enums.MeetingType;

import java.time.LocalDateTime;



@Getter
@Setter
@NoArgsConstructor
public class MeetingDTO{
        private Long id;
        private String title;
        private short notified;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
        private LocalDateTime time;
        private MeetingType meetingType;
        private String description;
        private Long spaceRefId;
        private String link;
        private UserProfileDTO from;
        private UserProfileDTO to;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
        private LocalDateTime createdAt;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
        private LocalDateTime updatedAt;
}
