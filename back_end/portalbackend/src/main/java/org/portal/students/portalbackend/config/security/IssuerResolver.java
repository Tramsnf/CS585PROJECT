package org.portal.students.portalbackend.config.security;


@FunctionalInterface
public interface IssuerResolver {
    String getIssuerByEnvironment(String env);
}

