package org.portal.students.portalbackend.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class SpaceDTO{
    private Long id;
    private String title;
    private LecturerDTO lecturer;
    private StudentDTO student;
    private List<SpaceItem> spaceItems;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    private LocalDateTime createdAt;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Africa/Nairobi")
    private LocalDateTime updatedAt;
}
