package org.portal.students.portalbackend.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.enums.MeetingType;
import org.portal.students.portalbackend.models.enums.SpaceItemType;

import java.time.LocalDateTime;

/**
 * @author Kely
 * on 14, November 2022
 * http://stackoverflow.com/u/14795945
 */

@Getter
@Setter
public class MessageBody {
    private SpaceItemType spaceItemType;
    private String message;
    private String to;
    private String title;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    private LocalDateTime time;
    private MeetingType meetingType;
    private String description;
    private String link;
}
