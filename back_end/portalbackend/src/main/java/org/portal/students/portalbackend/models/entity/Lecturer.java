package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.LecturerDTO;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Getter
@Setter
@Entity
@Table(name = "p_lecturer")
public class Lecturer extends  PO{

        private String registrationNumber;
        @OneToOne
        private UserProfile profile;

        public LecturerDTO toDto(){
                var lecturerDto = new LecturerDTO();
                lecturerDto.setId(getId());
                lecturerDto.setRegistrationNumber(getRegistrationNumber());
                lecturerDto.setProfile(getProfile().toDto());
                lecturerDto.setCreated(getCreated());
                lecturerDto.setUpdated(getUpdated());
                return lecturerDto;
        }

}
