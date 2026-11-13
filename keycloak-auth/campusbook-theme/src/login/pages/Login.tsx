import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { SocialProviders } from "../components/SocialProviders";
import { useScript } from "keycloakify/login/pages/Login.useScript";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";
    useScript({ webAuthnButtonId, kcContext, i18n });

    const usernameError = messagesPerField.getFirstError("username", "password");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <span>
                    {msg("noAccount")}{" "}
                    <a href={url.registrationUrl} className="font-medium text-primary hover:underline transition-colors">
                        {msg("doRegister")}
                    </a>
                </span>
            }
            socialProvidersNode={
                social?.providers && social.providers.length > 0 ? (
                    <div className="w-full">
                        <SocialProviders providers={social.providers} />
                        {realm.password && (
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border/70" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">or continue with credentials</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null
            }
        >
            {realm.password && (
                <form id="kc-form-login" onSubmit={() => setIsSubmitting(true)} action={url.loginAction} method="post" className="space-y-4">
                    {!usernameHidden && (
                        <Input
                            id="username"
                            name="username"
                            defaultValue={login.username ?? ""}
                            type="text"
                            autoFocus
                            autoComplete="username"
                            label={
                                !realm.loginWithEmailAllowed
                                    ? msgStr("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msgStr("usernameOrEmail")
                                      : msgStr("email")
                            }
                            placeholder="user@campusbook.com"
                            error={usernameError}
                        />
                    )}

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        label={msgStr("password")}
                        placeholder="••••••••"
                        showPasswordToggle
                        error={usernameHidden ? usernameError : undefined}
                    />

                    <div className="flex items-center justify-between text-xs">
                        {realm.rememberMe && !usernameHidden && (
                            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    defaultChecked={!!login.rememberMe}
                                    className="rounded border-input text-primary focus:ring-ring focus:ring-offset-0"
                                />
                                <span>{msg("rememberMe")}</span>
                            </label>
                        )}

                        {realm.resetPasswordAllowed && (
                            <a href={url.loginResetCredentialsUrl} className="font-medium text-primary hover:underline ml-auto">
                                {msg("doForgotPassword")}
                            </a>
                        )}
                    </div>

                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                    <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
                        {msgStr("doLogIn")}
                    </Button>
                </form>
            )}
        </Template>
    );
}
