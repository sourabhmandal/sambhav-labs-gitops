import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form
                id="kc-passwd-update-form"
                action={url.loginAction}
                method="post"
                onSubmit={() => setIsSubmitting(true)}
                className="space-y-4"
            >
                <Input
                    id="password-new"
                    name="password-new"
                    type="password"
                    autoFocus
                    autoComplete="new-password"
                    label={msgStr("passwordNew")}
                    placeholder="••••••••"
                    showPasswordToggle
                    error={messagesPerField.get("password")}
                />

                <Input
                    id="password-confirm"
                    name="password-confirm"
                    type="password"
                    autoComplete="new-password"
                    label={msgStr("passwordConfirm")}
                    placeholder="••••••••"
                    showPasswordToggle
                    error={messagesPerField.get("password-confirm")}
                />

                <div className="flex items-center gap-3 pt-2">
                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        {msgStr("doSubmit")}
                    </Button>

                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            variant="outline"
                            className="w-auto"
                        >
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
