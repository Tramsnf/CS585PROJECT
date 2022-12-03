package org.portal.students.studentsportal.configs;


import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "keycloak.server")
public class KeycloakServerProperties {
    String contextPath = "/auth";
    String realmImportFile = "students_portal_realm.json";
    AdminUser adminUser = new AdminUser();

    public String getContextPath() {
        return contextPath;
    }

    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }

    public String getRealmImportFile() {
        return realmImportFile;
    }

    public void setRealmImportFile(String realmImportFile) {
        this.realmImportFile = realmImportFile;
    }

    public AdminUser getAdminUser() {
        return adminUser;
    }

    public void setAdminUser(AdminUser adminUser) {
        this.adminUser = adminUser;
    }

    public static class AdminUser {
        String username = "admin";
        String password = "admin";

        public String getUsername() {
            return username;
        }


        public String getPassword() {
            return password;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}