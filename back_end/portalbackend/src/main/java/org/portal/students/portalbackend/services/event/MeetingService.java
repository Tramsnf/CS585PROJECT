package org.portal.students.portalbackend.services.event;

import org.portal.students.portalbackend.models.dto.MeetingDTO;
import org.portal.students.portalbackend.models.reqbody.EventBody;
import org.portal.students.portalbackend.repositories.MeetingRepository;
import org.springframework.stereotype.Service;

 

@Service
public record MeetingService(
        MeetingRepository meetingRepository

)
{
//    public MeetingDTO addMeeting(EventBody eventBody){
//
//    }
}
