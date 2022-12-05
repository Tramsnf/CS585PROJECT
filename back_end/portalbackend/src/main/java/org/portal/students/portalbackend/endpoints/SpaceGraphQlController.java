package org.portal.students.portalbackend.endpoints;

import lombok.extern.slf4j.Slf4j;
import org.portal.students.portalbackend.models.dto.MessageBody;
import org.portal.students.portalbackend.models.dto.SpaceDTO;
import org.portal.students.portalbackend.models.dto.SpaceItem;
import org.portal.students.portalbackend.models.dto.UserSpacesDto;
import org.portal.students.portalbackend.services.chat.SpaceService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;


@Slf4j
@Controller
public class SpaceGraphQlController {

    private final SpaceService spaceService;

    public SpaceGraphQlController(SpaceService spaceService) {
        this.spaceService = spaceService;
    }


    @QueryMapping
    UserSpacesDto profileHighlights(@Argument String profile){
        return spaceService.generateHighlight(profile);
    }

    @QueryMapping
    SpaceDTO getDetailedChatSpace(@Argument String profile, @Argument String refId){
        return spaceService.getUserChatSpace(profile, refId);
    }

    @MutationMapping
    SpaceDTO postMessage(@Argument MessageBody messageDto, @Argument String profileType){
        return spaceService.postMessage(messageDto, profileType);
    }

    @QueryMapping
    List<SpaceItem> getMeetings(@Argument String refId){
        return spaceService.getMeetings(refId);
    }
}
