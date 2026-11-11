import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { KeyRound } from "lucide-react";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, messagesPerField, otpLogin } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <div className="flex flex-col items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">
                    <KeyRound className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                    Enter the code from your authenticator application
                </p>
            </div>

            <form
                id="kc-otp-login-form"
                action={url.loginAction}
                method="post"
                onSubmit={() => setIsSubmitting(true)}
                className="space-y-4"
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className="space-y-1.5 text-xs">
                        <label className="text-muted-foreground font-medium">Select Device</label>
                        <div className="space-y-2">
                            {otpLogin.userOtpCredentials.map((otpCredential, i) => (
                                <label
                                    key={otpCredential.id}
                                    className="flex items-center gap-2 p-2.5 rounded-lg border border-border/80 bg-muted/30 cursor-pointer hover:bg-muted/60 transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={i === 0}
                                        className="text-primary focus:ring-ring"
                                    />
                                    <span className="font-medium text-foreground">{otpCredential.userLabel}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <Input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    autoComplete="one-time-code"
                    label={msgStr("authenticatorCode")}
                    placeholder="123456"
                    error={messagesPerField.get("totp")}
                />

                <Button
                    type="submit"
                    className="w-full mt-2"
                    isLoading={isSubmitting}
                >
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
