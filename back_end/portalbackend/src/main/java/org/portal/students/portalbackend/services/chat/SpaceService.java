package org.portal.students.portalbackend.services.chat;

import org.portal.students.portalbackend.config.security.SessionHelper;
import org.portal.students.portalbackend.models.dto.*;
import org.portal.students.portalbackend.models.entity.*;
import org.portal.students.portalbackend.models.enums.Profile;
import org.portal.students.portalbackend.models.enums.SpaceItemType;
import org.portal.students.portalbackend.repositories.SpaceRepository;
import org.portal.students.portalbackend.services.notification.NotificationService;
import org.portal.students.portalbackend.services.user.LecturerService;
import org.portal.students.portalbackend.services.user.StudentService;
import org.portal.students.portalbackend.services.user.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;


@Service
public record SpaceService(
        SpaceRepository spaceRepository,
        UserService userService,
        LecturerService lecturerService,
        StudentService studentService,
        NotificationService notificationService
) {
    public List<Space> getLectureChatSpace(){
        var profile = userService.findUserProfileByKeycloakID();
        return spaceRepository.findByLecturer_Profile_KeycloakIdOrderByUpdated(profile.getKeycloakId());
    }

    public List<Space> getStudentChatSpace(){
        var profile = userService.findUserProfileByKeycloakID();
        return spaceRepository.findByStudent_Profile_KeycloakIdOrderByUpdated(profile.getKeycloakId());
    }

    public UserSpacesDto generateHighlight(String profile) {
        var user = SessionHelper.getCurrentUser();

        List<Space> spaces = new ArrayList<>();
        // all contacted
        // get spaces

        var role = user.getRole();

        if(role.equals(Profile.UNDEFINED)){
            role = userService.getUserRole();
        }

        if(role.equals(Profile.LECTURER)) {
            spaces = spaceRepository.findByLecturer_Profile_KeycloakIdOrderByUpdated(user.getKeycloakId());
        }else {
            spaces = spaceRepository.findByStudent_Profile_KeycloakIdOrderByUpdated(user.getKeycloakId());
        }

        Predicate<Space> contactedToday = space -> {
            var time = LocalDateTime.now().minusHours(24L);
            return Objects.nonNull(space.getUpdated()) && space.getUpdated().isAfter(time);
        };

        var frequentlyContacted = spaces.stream()
                .map(Space::toDto)
                .collect(Collectors.toList());

        var recentlyContacted = spaces.stream()
                .filter(contactedToday)
                .map(Space::toDto)
                .collect(Collectors.toList());


        // spring into frequently contacted
        return new UserSpacesDto(
                frequentlyContacted.isEmpty()? new ArrayList<>() : frequentlyContacted,
                recentlyContacted.isEmpty()? new ArrayList<>() : recentlyContacted
        );
    }

    public SpaceDTO getUserChatSpace(String profileType, String refId){
        var user = SessionHelper.getCurrentUser();
        if(refId.equals(user.getKeycloakId())){
            return null;
        }

        SpaceDTO spaceDTO = new SpaceDTO();

        // find space by users ref_ids
        Optional<Student> student;
        Optional<Lecturer> lecturer;
        var title = "";

        lecturer = lecturerService.getCurrentLecturer();
        student = studentService.getCurrentStudent();

        var role = userService.getUserRole();

        if(role.equals(Profile.LECTURER)){
            spaceDTO.setLecturer(lecturer.map(Lecturer::toDto).get());
            student = studentService.getStudentByKeycloakId(refId);
            if(student.isEmpty()){
                return null;
            }
            spaceDTO.setStudent(student.map(Student::toDto).get());
            title = student.get().getProfile().getUserName();
        }else if(role.equals(Profile.STUDENT)){
            spaceDTO.setStudent(student.map(Student::toDto).get());
            lecturer = lecturerService.getLecturerByKeycloakId(refId);
            if(lecturer.isEmpty()){
                return null;
            }
            spaceDTO.setLecturer(lecturer.map(Lecturer::toDto).get());

            title = lecturer.get().getProfile().getUserName();
        }

        if(student.isEmpty() || lecturer.isEmpty()){
            return null;
        }

        var space = spaceRepository.findByLecturerAndStudent(
                lecturer.get(),
                student.get()
        );

        if(space.isPresent()){
            spaceDTO = space.map(Space::toDetailedDto).get();
        }

        spaceDTO.setTitle(title);
        return spaceDTO;

    }

    Space getOrCreateChatSpaceIfNotExists(String profileType, String refId){
        var user = SessionHelper.getCurrentUser();
        if(refId.equals(user.getKeycloakId())){
            return null;
        }

        Space space = new Space();

        // find space by users ref_ids
        Optional<Student> student;
        Optional<Lecturer> lecturer;

        var role = userService.getUserRole();

        if(role.equals(Profile.LECTURER)){
            lecturer = lecturerService.getCurrentLecturer();
            space.setLecturer(lecturer.get());
            student = studentService.getStudentByKeycloakId(refId);
            space.setStudent(student.get());
        }else if(role.equals(Profile.STUDENT)){
            student = studentService.getCurrentStudent();
            space.setStudent(student.get());
            lecturer = lecturerService.getLecturerByKeycloakId(refId);
            space.setLecturer(lecturer.get());
        }
        else {
            return null;
        }

        if(student.isEmpty() || lecturer.isEmpty()){
            return null;
        }

        var spaceOptional = spaceRepository.findByLecturerAndStudent(
                lecturer.get(),
                student.get()
        );


        var title = student.get().getProfile().getUserName().concat(" ").concat(lecturer.get().getProfile().getUserName());

        if(spaceOptional.isPresent()){
            return spaceOptional.get();
        }

        space.setTitle(title);

        space = spaceRepository.save(space);

        return space;

    }

    public SpaceDTO postMessage(MessageBody messageDto, String profileType){
        var toUser = userService.findUserProfileByKeycloakID(messageDto.getTo());
        var user = SessionHelper.getCurrentUser();
        if(toUser.isEmpty()){
            return null;
        }
        var space = getOrCreateChatSpaceIfNotExists(profileType, messageDto.getTo());
        if(Objects.isNull(space)){
            return null;
        }
        if(messageDto.getSpaceItemType().equals(SpaceItemType.MESSAGE)){
            var message = new Message();
            message.setMessage(messageDto.getMessage());
            message.setFrom(userService.findUserProfileByKeycloakID());
            message.setTo(toUser.get()) ;
            message.setTimeSent(LocalDateTime.now());
            message.setNotified((short) 0);
            message.setIsActive(1);

            space.addMessage(message);
            space = spaceRepository.save(space);

            var notification = new NotificationDTO();
            notification.setTo(toUser.get().getKeycloakId());
            notification.setDescription(toUser.get().getUserName()+" message: "+shortenMessage(messageDto.getMessage()));
            notification.setUrl("/chat/"+user.getKeycloakId());

            notificationService.addNotification(notification);

        }else {
            var meeting = new Meeting();
            meeting.setFrom(userService.findUserProfileByKeycloakID());
            meeting.setDescription(messageDto.getDescription());
            meeting.setMeetingType(messageDto.getMeetingType());
            meeting.setTime(messageDto.getTime());
            meeting.setTo(toUser.get()) ;
            meeting.setTitle(messageDto.getTitle());
            meeting.setNotified((short) 0);
            meeting.setLink(messageDto.getLink());

            space.addMeeting(meeting);
            space = spaceRepository.save(space);

            var notification = new NotificationDTO();
            notification.setTo(toUser.get().getKeycloakId());
            notification.setDescription(toUser.get().getUserName()+" invited you to a meeting");
            notification.setUrl("/events/"+user.getKeycloakId());

            notificationService.addNotification(notification);
        }



        return space.toDetailedDto();

    }

    public List<SpaceItem> getMeetings(String refId){

        List<Space> spaces = new ArrayList<>();
        // all contacted
        // get spaces
        spaces.addAll(spaceRepository.findByLecturer_Profile_KeycloakIdOrderByUpdated(refId));
        spaces.addAll(spaceRepository.findByStudent_Profile_KeycloakIdOrderByUpdated(refId));

        // meetings
        var meetings = spaces.stream()
                .flatMap(space -> space.getMeetings().stream())
                .map(Meeting::toSpaceItemDto)
                .collect(Collectors.toList());

        return meetings;
    }

    private String shortenMessage(String message){
        if(message.length() > 7){
            return message.substring(7).concat("...");
        }
        return message;
    }


}
