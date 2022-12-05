package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.SpaceDTO;
import org.portal.students.portalbackend.models.dto.SpaceItem;

import javax.persistence.*;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Entity
@Getter
@Setter
@Table(name = "d_space")
public class Space extends PO{
     private   String title;
     @ManyToOne
     private   Lecturer lecturer;
     @ManyToOne
     private   Student student;

     @OneToMany(fetch = FetchType.EAGER, mappedBy = "space", cascade = {
             CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
     private Set<Message> messages = new HashSet<>();


     @OneToMany(fetch = FetchType.EAGER, mappedBy = "space", cascade = {
             CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
     private Set<Meeting> meetings = new HashSet<>();

     public void setMessages(Set<Message> lines) {
          lines.forEach(line-> {
               line.setSpace(this);
          });
          messages.addAll(lines);
     }

     public void addMessage(Message message) {
          message.setSpace(this);
          messages.add(message);
     }

     public void setMeetings(Set<Meeting> lines) {
          lines.forEach(line-> {
               line.setSpace(this);
          });
          meetings.addAll(lines);
     }

     public void addMeeting(Meeting meeting) {
          meeting.setSpace(this);
          meetings.add(meeting);
     }

     public SpaceDTO toDto(){
          var spaceDto = new SpaceDTO();
          spaceDto.setId(getId());
          spaceDto.setLecturer(getLecturer().toDto());
          spaceDto.setStudent(getStudent().toDto());
          spaceDto.setTitle(getTitle());
          spaceDto.setCreatedAt(getCreated());
          spaceDto.setUpdatedAt(getUpdated());
          return spaceDto;
     }

     public SpaceDTO toDetailedDto(){
          var spaceDto = toDto();
          spaceDto.setSpaceItems(
                  Stream.concat(getMeetings().stream().map(Meeting::toSpaceItemDto), getMessages().stream().map(Message::toSpaceItemDto))
                          .sorted(Comparator.comparing(SpaceItem::getCreatedAt))
                          .collect(Collectors.toList())
          );
          return spaceDto;
     }


}
