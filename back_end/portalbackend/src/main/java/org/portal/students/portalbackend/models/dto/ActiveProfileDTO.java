package org.portal.students.portalbackend.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.entity.Lecturer;
import org.portal.students.portalbackend.models.entity.Student;

import java.time.LocalDateTime;
import java.util.Objects;


@Getter
@Setter
public class ActiveProfileDTO {
    Long id;
    String registrationNumber;
    String type;
    UserProfileDTO profile;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    LocalDateTime created;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    LocalDateTime updated;

    public static ActiveProfileDTO copy(Lecturer lecturer) {
        var profile = new ActiveProfileDTO();
        profile.id = lecturer.getProfile().getId();
        profile.registrationNumber = lecturer.getRegistrationNumber();
        profile.type = "lecturer";
        profile.profile = lecturer.getProfile().toDto();
        profile.created = lecturer.getCreated();
        profile.updated = lecturer.getUpdated();
        return profile;
    }


    public static ActiveProfileDTO copy(Student student) {
        var profile = new ActiveProfileDTO();
        profile.id = student.getProfile().getId();
        profile.registrationNumber = student.getRegistrationNumber();
        profile.type = "student";
        profile.profile = student.getProfile().toDto();
        profile.created = student.getCreated();
        profile.updated = student.getUpdated();
        return profile;
    }


    @Override
    public boolean equals(Object obj) {
        if (Objects.isNull(obj))
            return false;
        if (obj instanceof ActiveProfileDTO) {
            var o = (ActiveProfileDTO) obj;
            return o.getProfile().getRefId().equals(getProfile().getRefId());
        }
        return false;
    }
}

