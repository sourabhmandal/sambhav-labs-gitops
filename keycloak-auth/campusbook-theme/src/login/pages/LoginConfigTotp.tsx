import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ShieldCheck, Copy, Check } from "lucide-react";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, totp, messagesPerField, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (totp.totpSecretEncoded) {
            navigator.clipboard.writeText(totp.totpSecretEncoded);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
        >
            <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Scan this QR code with your authenticator app</span>
                </div>

                {totp.totpSecretQrCode && (
                    <div className="flex justify-center p-3 bg-white rounded-xl border border-border inline-block mx-auto shadow-xs">
                        <img
                            src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                            alt="TOTP QR Code"
                            className="h-44 w-44"
                        />
                    </div>
                )}

                {totp.totpSecretEncoded && (
                    <div className="p-2.5 rounded-lg bg-muted/60 border border-border/80 flex items-center justify-between text-xs font-mono">
                        <span className="truncate select-all pr-2">{totp.totpSecretEncoded}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-7 px-2 text-xs"
                        >
                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                    </div>
                )}

                <form
                    action={url.loginAction}
                    method="post"
                    onSubmit={() => setIsSubmitting(true)}
                    className="space-y-3 pt-2 text-left"
                >
                    <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />

                    <Input
                        id="userLabel"
                        name="userLabel"
                        type="text"
                        label={msgStr("loginTotpDeviceName")}
                        placeholder="My Mobile Authenticator"
                        error={messagesPerField.get("userLabel")}
                    />

                    <Input
                        id="totp"
                        name="totp"
                        type="text"
                        inputMode="numeric"
                        autoFocus
                        autoComplete="one-time-code"
                        label={msgStr("authenticatorCode")}
                        placeholder="123456"
                        error={messagesPerField.get("totp")}
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
            </div>
        </Template>
    );
}
