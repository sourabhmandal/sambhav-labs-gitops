import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { SocialProviders } from "../components/SocialProviders";
import { useScript } from "keycloakify/login/pages/LoginUsername.useScript";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { social, realm, url, login, registrationDisabled, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";
    useScript({ webAuthnButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            headerNode={msg("doLogIn")}
            infoNode={
                <span>
                    {msg("noAccount")}{" "}
                    <a href={url.registrationUrl} className="font-medium text-primary hover:underline">
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
            <form id="kc-form-login" action={url.loginAction} method="post" onSubmit={() => setIsSubmitting(true)} className="space-y-4">
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
                    error={messagesPerField.get("username")}
                />

                <div className="flex items-center justify-between text-xs">
                    {realm.resetPasswordAllowed && (
                        <a href={url.loginResetCredentialsUrl} className="font-medium text-primary hover:underline ml-auto">
                            {msg("doForgotPassword")}
                        </a>
                    )}
                </div>

                <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
