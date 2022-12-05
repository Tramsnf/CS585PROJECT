package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.MeetingDTO;
import org.portal.students.portalbackend.models.dto.SpaceItem;
import org.portal.students.portalbackend.models.enums.MeetingType;
import org.portal.students.portalbackend.models.enums.SpaceItemType;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


@Getter
@Setter
@Entity
@Table(name = "d_meeting")
public class Meeting extends PO{
        private String title;
        private LocalDateTime time;
        private short notified;
        private String link;
        @Enumerated(EnumType.STRING)
        private MeetingType meetingType;
        private String description;
        @ManyToOne
        private UserProfile from;
        @ManyToOne
        private UserProfile to;
        @ManyToOne
        private Space space;


        public MeetingDTO toDto(){
                var meetingDto = new MeetingDTO();
                meetingDto.setId(getId());
                meetingDto.setTitle(getTitle());
                meetingDto.setNotified(getNotified());
                meetingDto.setTime(getTime());
                meetingDto.setLink(getLink());
                meetingDto.setMeetingType(getMeetingType());
                meetingDto.setDescription(getDescription());
                meetingDto.setSpaceRefId(getSpace().getId());
                return meetingDto;
        }

        public SpaceItem toSpaceItemDto(){
                var meetingDto = new SpaceItem();
                meetingDto.setId(getId());
                meetingDto.setType(SpaceItemType.MEETING);
                meetingDto.setTitle(getTitle());
                meetingDto.setNotified(getNotified());
                meetingDto.setTime(getTime());
                meetingDto.setMeetingType(getMeetingType());
                meetingDto.setDescription(getDescription());
                meetingDto.setSpaceRefId(getSpace().getId());
                meetingDto.setFrom(getFrom().toDto());
                meetingDto.setLink(getLink());
                meetingDto.setTo(getTo().toDto());
                meetingDto.setCreatedAt(getCreated());
                meetingDto.setTimeSent(getCreated());
                return meetingDto;
        }


        @Override
        public boolean equals(Object obj) {
                if (Objects.isNull(obj))
                        return false;
                if (obj instanceof Meeting) {
                        var o = (Meeting) obj;
                        return o.getId().equals(getId());
                }
                return false;
        }
}
