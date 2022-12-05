package org.portal.students.portalbackend.services.thirdparty;

import lombok.extern.slf4j.Slf4j;
import org.portal.students.portalbackend.config.security.UserDto;
import org.portal.students.portalbackend.models.dto.RoleDto;
import org.portal.students.portalbackend.models.dto.RolesRes;
import org.portal.students.portalbackend.repositories.UserProfileRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Slf4j
@Service
public class KeycloakService {

    private final RestTemplate userRestTemplate;
    private final String kcURL;
    private final String clientId = "fbae79a4-d56c-4f5c-a732-b4ff41f4ef02";
    private final String realm = "students_portal";

    /**
     */
    public KeycloakService(
                       @Qualifier("userRestTemplate") RestTemplate userRestTemplate,
                       @Value("${uris.root.iam}") String iamAuthUri,
                       @Value("${util.jwt.secretKey}") String secretKey
    ) {
        this.userRestTemplate = userRestTemplate;
        this.kcURL = iamAuthUri;
    }

    public boolean addRoleRoleToUser(String profile, String roleId, UserDto userDto){

        // POST- http://localhost:8080/auth/admin/realms/{realmName}/users/{userId}/role-mappings/clients/{clientId}
        var url = kcURL.concat("/admin/realms/").concat(realm).concat("/users/").concat(userDto.getKeycloakId()).concat("/role-mappings/realm");
        log.info(url);

        // {
        //   "roles": [
        //       {
        //           "id": "0830ff39-43ea-48bb-af8f-696bc420c1ce",
        //           "name": "confirm-kilid-user",
        //           "description": "${role_uma_authorization}",
        //           "composite": false,
        //           "clientRole": true,
        //           "containerId": "344e7c81-e7a2-4a43-b013-57d7ed198eee"
        //       }
        //   ]
        //}

        Map<String, String> data = new HashMap<>();

        data.put("id", roleId);
        data.put("name", profile);
        data.put("containerId", realm);
        data.put("composite", "true");
        data.put("clientRole", "false");

        List<Map<String, String>> datas = new ArrayList<>();
         datas.add(data);

        log.info("data {}",datas);
        try{
            HttpEntity<List<Map<String, String>>> entity = new HttpEntity<>(datas);
            var response = userRestTemplate
                    .exchange(url, HttpMethod.POST,entity, String.class);
            var status = response.getStatusCode();
            if(status.is2xxSuccessful()){
                var res = response.getBody();
                log.info("response body from posting "+res);
                return true;
            }else{
                log.info("request did not go through");
                return false;
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }


    public List<String> getUserRoles(UserDto userDto){

        // FET- http://localhost:8080/auth/admin/realms/{realm}/users/{user-uuid}/role-mappings/realm
        var url = kcURL.concat("/admin/realms/").concat(realm).concat("/users/").concat(userDto.getKeycloakId()).concat("/role-mappings/realm");
        log.info(url);

        try{
            var response = userRestTemplate
                    .exchange(url, HttpMethod.GET,null, RoleDto[].class);
            var status = response.getStatusCode();
            if(status.is2xxSuccessful()){
                var res = response.getBody();
                log.info("response body from posting "+res);
                return Arrays.asList(response.getBody()).stream()
                        .map(RoleDto::getName)
                        .collect(Collectors.toList());
            }else{
                log.info("request did not go through");
                return new ArrayList<>();
            }
        }catch (Exception e){
            e.printStackTrace();
            return  new ArrayList<>();
        }

    }

}
