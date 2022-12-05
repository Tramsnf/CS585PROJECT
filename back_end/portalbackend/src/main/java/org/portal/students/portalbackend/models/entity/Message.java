package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.ActiveProfileDTO;
import org.portal.students.portalbackend.models.dto.MessageDTO;
import org.portal.students.portalbackend.models.dto.SpaceItem;
import org.portal.students.portalbackend.models.enums.SpaceItemType;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;


@Getter
@Setter
@Entity
@Table(name = "d_message")
public class Message extends PO{
       private String message;
       private short notified;
       private String topics;
       @ManyToOne
       private Space space;
       @ManyToOne
       private UserProfile from;
       @ManyToOne
       private UserProfile to;
       private LocalDateTime timeSent;
       private LocalDateTime timeRead;

       public MessageDTO toDto(){
              var messageDto = new MessageDTO();
              messageDto.setId(getId());
              messageDto.setMessage(getMessage());
              messageDto.setNotified(getNotified());
              messageDto.setTopics(getTopics());
              messageDto.setSpaceRefId(getSpace().getId());
              messageDto.setFrom(getFrom().toDto());
              messageDto.setTo(getTo().toDto());
              messageDto.setTimeRead(getTimeRead());
              setTimeSent(getTimeSent());
              messageDto.setCreatedAt(getCreated());
              messageDto.setUpdatedAt(getUpdated());
              return messageDto;
       }


       public SpaceItem toSpaceItemDto(){
              var messageDto = new SpaceItem();
              messageDto.setId(getId());
              messageDto.setType(SpaceItemType.MESSAGE);
              messageDto.setMessage(getMessage());
              messageDto.setNotified(getNotified());
              messageDto.setTopics(getTopics());
              messageDto.setSpaceRefId(getSpace().getId());
              messageDto.setFrom(getFrom().toDto());
              messageDto.setTo(getTo().toDto());
              messageDto.setTimeRead(getTimeRead());
              messageDto.setTimeSent(getTimeSent());
              messageDto.setCreatedAt(getCreated());
              messageDto.setUpdatedAt(getUpdated());
              return messageDto;
       }

       @Override
       public boolean equals(Object obj) {
              if (Objects.isNull(obj))
                     return false;
              if (obj instanceof Message) {
                     var o = (Message) obj;
                     return o.getId().equals(getId());
              }
              return false;
       }
}
