package org.portal.students.portalbackend.config.security;

public class TenantContextHolder {
    private static final ThreadLocal<String> tenantIdHolder = new ThreadLocal<>();
    public static void setTenantId(String tenantId){
        tenantIdHolder.set(tenantId);
    }
    public static String getTenantId(){
        return tenantIdHolder.get();
    }
    public static void destroy() {tenantIdHolder.remove();}
}
