package org.portal.students.portalbackend.config.beans;

import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.ZonedDateTimeSerializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Objects;

@Slf4j
@Configuration
public class Beans {

        private static final String dateFormat = "yyyy-MM-dd";
        private static final String dateTimeFormat = "yyyy-MM-dd HH:mm:ss";

        @Bean
        public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
            return builder -> {
                builder.simpleDateFormat(dateTimeFormat);
                builder.serializers(new LocalDateSerializer(DateTimeFormatter.ofPattern(dateFormat)));
                builder.serializers(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(dateTimeFormat)));
                builder.serializers(new ZonedDateTimeSerializer(DateTimeFormatter.ofPattern(dateTimeFormat)));
            };
        }

        @Bean(name = "userRestTemplate")
        RestTemplate restTemplate(AuthorizedClientServiceOAuth2AuthorizedClientManager clientManager) {
            RestTemplate template = new RestTemplate();
            template.setInterceptors(Arrays.asList(interceptor(clientManager)));
            return template;
        }

        private ClientHttpRequestInterceptor interceptor(AuthorizedClientServiceOAuth2AuthorizedClientManager authorizedClientServiceAndManager) {

                OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest
                    .withClientRegistrationId("api-service-client")
                    .principal("api-service")
                    .build();

            return (httpRequest, bytes, execution) -> {
                // Perform the actual authorization request using the authorized client service and authorized client
                // manager. This is where the JWT is retrieved from the Okta servers.


                OAuth2AuthorizedClient authorizedClient = authorizedClientServiceAndManager.authorize(authorizeRequest);

                // Get the token from the authorized client object
                OAuth2AccessToken accessToken = Objects.requireNonNull(authorizedClient).getAccessToken();
    //
                log.info("Issued: " + Objects.requireNonNull(accessToken.getIssuedAt()) + ", Expires:" +
                        Objects.requireNonNull(accessToken.getExpiresAt()));
                log.info("Scopes: " + accessToken.getScopes().toString());
                log.info("Token: " + accessToken.getTokenValue());
                httpRequest.getHeaders().setBearerAuth(accessToken.getTokenValue());
                return execution.execute(httpRequest, bytes);
            };
        }


        @Bean
        public OAuth2AuthorizedClientService auth2AuthorizedClientService(ClientRegistrationRepository clientRegistrationRepository) {
            return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
        }

        // Create the authorized client manager and service manager using the
        // beans created and configured above
        @Bean
        public AuthorizedClientServiceOAuth2AuthorizedClientManager authorizedClientServiceAndManager(
                ClientRegistrationRepository clientRegistrationRepository,
                OAuth2AuthorizedClientService authorizedClientService) {

            OAuth2AuthorizedClientProvider authorizedClientProvider =
                    OAuth2AuthorizedClientProviderBuilder.builder()
                            .clientCredentials()
                            .build();

            AuthorizedClientServiceOAuth2AuthorizedClientManager authorizedClientManager =
                    new AuthorizedClientServiceOAuth2AuthorizedClientManager(
                            clientRegistrationRepository, authorizedClientService);
            authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

            return authorizedClientManager;
        }
}
