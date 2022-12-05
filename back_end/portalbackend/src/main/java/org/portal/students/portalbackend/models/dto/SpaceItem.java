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
public class SpaceItem {
   private SpaceItemType type;
   private Long id;
   private String message;
   private short notified;
   private String topics;
   private UserProfileDTO profile;
   @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
   private LocalDateTime timeSent;
   @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
   private LocalDateTime timeRead;
   private Long spaceRefId;
   private UserProfileDTO from;
   private UserProfileDTO to;
   private String title;
   private String link;
   @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
   private LocalDateTime time;
   private MeetingType meetingType;
   private String description;
   @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
   private LocalDateTime createdAt;
   @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
   private LocalDateTime updatedAt;
}
