package org.portal.students.portalbackend.utils;

import lombok.SneakyThrows;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collection;


public class AppUtils {

    public static class Objects{
        public static boolean isEmpty(Collection<?> c) {
            return c == null || c.isEmpty();
        }

        public static boolean isEmpty(String s) {
            return s == null || s.trim().isEmpty();
        }

        public static boolean isPresent(Collection<?> c) {
            return !isEmpty(c);
        }
        public static boolean hasValue(String s) {
            return !isEmpty(s);
        }
    }

    public static class StringUtils {
        public static boolean isNullOrEmpty(String string){
            if (java.util.Objects.isNull(string)) return true;
            return string.equals("");
        }

    }

    public static class FileUtils{

        @SneakyThrows
        public static String getResourceString(String name){
            Resource resource = new ClassPathResource(name);
            InputStream inputStream = resource.getInputStream();
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        }
    }
}
