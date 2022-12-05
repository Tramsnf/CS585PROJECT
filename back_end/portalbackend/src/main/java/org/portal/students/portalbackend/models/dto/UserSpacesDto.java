package org.portal.students.portalbackend.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author Kely
 * on 14, November 2022
 * http://stackoverflow.com/u/14795945
 */

@Getter
@Setter
@AllArgsConstructor
public class UserSpacesDto {
    List<SpaceDTO> recentlyContacted;
    List<SpaceDTO> frequentlyContacted;
}
