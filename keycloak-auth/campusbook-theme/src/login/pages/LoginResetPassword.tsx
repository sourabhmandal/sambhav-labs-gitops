import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={msg("emailForgotTitle")}
            displayInfo={true}
            infoNode={
                <span>
                    <a href={url.loginUrl} className="font-medium text-primary hover:underline">
                        {msg("backToLogin")}
                    </a>
                </span>
            }
        >
            <form id="kc-reset-password-form" action={url.loginAction} method="post" onSubmit={() => setIsSubmitting(true)} className="space-y-4">
                <p className="text-xs text-muted-foreground">
                    {realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                </p>

                <Input
                    id="username"
                    name="username"
                    type="text"
                    autoFocus
                    defaultValue={auth?.attemptedUsername ?? ""}
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

                <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
                    {msgStr("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
