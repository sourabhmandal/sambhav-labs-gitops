import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useScript } from "keycloakify/login/pages/LoginPassword.useScript";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { realm, url, messagesPerField } = kcContext;
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
            displayMessage={!messagesPerField.existsError("password")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-form-login" action={url.loginAction} method="post" onSubmit={() => setIsSubmitting(true)} className="space-y-4">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoFocus
                    autoComplete="current-password"
                    label={msgStr("password")}
                    placeholder="••••••••"
                    showPasswordToggle
                    error={messagesPerField.get("password")}
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
