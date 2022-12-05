package org.portal.students.portalbackend.config.security;

public class JWTTokenContextHolder {
    private static final ThreadLocal<String> jwtTokenHolder = new ThreadLocal<>();

    public static void setJWTToken(String jwtToken) {
        jwtTokenHolder.set(jwtToken);
    }
    public static String getJWTToken() {
        return jwtTokenHolder.get();
    }
    public static void destroy() {
        jwtTokenHolder.remove();
    }
}
