<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm'); section>
    <#if section = "header">
        ${msg("registerTitle")}
    <#elseif section = "form">
        <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcInputWrapperClass!} input-names-register">
                    <div class="input-icon">
                        <i class="fa fa-user fa-lg icon"></i>
                        <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                               value="${(register.formData.firstName!'')}"
                               placeholder="${msg("firstName")}"
                               aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                        />
                    </div>

                    <#if messagesPerField.existsError('firstName')>
                        <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}"
                              aria-live="polite">
                            ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                        </span>
                    </#if>
                </div>
                <div class="${properties.kcInputWrapperClass!} input-names-register">
                    <div class="input-icon">
                        <i class="fa fa-user fa-lg icon"></i>
                        <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                               value="${(register.formData.lastName!'')}"
                               placeholder="${msg("lastName")}"
                               aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                        />
                    </div>

                    <#if messagesPerField.existsError('lastName')>
                        <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}"
                              aria-live="polite">
                            ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

<#--            <div class="${properties.kcFormGroupClass!}">-->
<#--                -->
<#--            </div>-->

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcInputWrapperClass!}">
                    <div class="input-icon">
                        <i class="fa fa-envelope fa-lg icon"></i>
                        <input type="text" id="email" class="${properties.kcInputClass!}" name="email"
                               value="${(register.formData.email!'')}" autocomplete="email"
                               placeholder="${msg("email")}"
                               aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                        />
                    </div>

                    <#if messagesPerField.existsError('email')>
                        <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('email'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

            <#if !realm.registrationEmailAsUsername>
                <div class="${properties.kcFormGroupClass!}">
                    <div class="${properties.kcInputWrapperClass!}">
                        <div class="input-icon">
                            <i class="fa fa-user fa-lg icon"></i>
                            <input type="text" id="username" class="${properties.kcInputClass!}" name="username"
                                   value="${(register.formData.username!'')}" autocomplete="username"
                                   placeholder="${msg("username")}"
                                   aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                            />
                        </div>

                        <#if messagesPerField.existsError('username')>
                            <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}"
                                  aria-live="polite">
                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </div>
            </#if>

            <#if passwordRequired??>
                <div class="${properties.kcFormGroupClass!}">
                    <div class="${properties.kcInputWrapperClass!}">
                        <div class="input-icon">
                            <i class="fa fa-lock fa-lg icon"></i>
                            <input type="password" id="password" class="${properties.kcInputClass!}" name="password"
                                   autocomplete="new-password"
                                   placeholder="${msg("password")}"
                                   aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                            />
                        </div>

                        <#if messagesPerField.existsError('password')>
                            <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}"
                                  aria-live="polite">
                                ${kcSanitize(messagesPerField.get('password'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </div>

                <div class="${properties.kcFormGroupClass!}">
                    <div class="${properties.kcInputWrapperClass!}">
                        <div class="input-icon">
                            <i class="fa fa-lock fa-lg icon"></i>
                            <input type="password" id="password-confirm" class="${properties.kcInputClass!}"
                                   name="password-confirm"
                                   placeholder="${msg("passwordConfirm")}"
                                   aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                            />
                        </div>

                        <#if messagesPerField.existsError('password-confirm')>
                            <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}"
                                  aria-live="polite">
                                ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </div>
            </#if>

            <#if recaptchaRequired??>
                <div class="form-group">
                    <div class="${properties.kcInputWrapperClass!}">
                        <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                    </div>
                </div>
            </#if>
            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!} forgot-password">
                        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                            <div id="kc-registration-container">
                                <div id="kc-registration">
                                    <a class="register-link" tabindex="6" href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a>
                                </div>
                            </div>
                        </#if>
                    </div>
                    <button class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                            type="submit">
                        <span class="login-msg">${msg("doRegister")}</span>
                        <i class="fa fa-chevron-right login-msg fa-lg login-msg-right"></i>
                    </button>
                </div>

            </div>

            <hr>

        </form>
    </#if>
</@layout.registrationLayout>