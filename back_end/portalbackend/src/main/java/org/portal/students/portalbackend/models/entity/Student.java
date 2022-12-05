package org.portal.students.portalbackend.models.entity;

import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.models.dto.StudentDTO;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Getter
@Setter
@Entity
@Table(name = "p_student")
public class Student extends PO{
       private String registrationNumber;
       @OneToOne
       private UserProfile profile;

       public StudentDTO toDto(){
              var studentDto = new StudentDTO();
              studentDto.setId(getId());
              studentDto.setRegistrationNumber(getRegistrationNumber());
              studentDto.setProfile(getProfile().toDto());
              studentDto.setCreated(getCreated());
              studentDto.setUpdated(getUpdated());
              return studentDto;
       }
}
