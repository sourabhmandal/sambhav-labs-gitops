import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { KeyRound, Shield, Fingerprint } from "lucide-react";
import { Button } from "../components/Button";

function getIcon(helpText?: string) {
    const text = (helpText || "").toLowerCase();
    if (text.includes("webauthn") || text.includes("passkey")) {
        return <Fingerprint className="h-5 w-5 text-primary" />;
    }
    if (text.includes("totp") || text.includes("otp")) {
        return <KeyRound className="h-5 w-5 text-primary" />;
    }
    return <Shield className="h-5 w-5 text-primary" />;
}

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, auth } = kcContext;
    const { msg, advancedMsg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("loginChooseAuthenticator")}>
            <form action={url.loginAction} method="post" className="space-y-3">
                {auth.authenticationSelections.map(selection => (
                    <Button
                        key={selection.authExecId}
                        type="submit"
                        name="authenticationExecution"
                        value={selection.authExecId}
                        variant="outline"
                        className="w-full h-auto p-3.5 flex items-start gap-3 text-left justify-start hover:border-primary/50 transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">{getIcon(selection.helpText || selection.displayName)}</div>
                        <div className="space-y-0.5 min-w-0">
                            <div className="font-semibold text-foreground text-xs">{advancedMsg(selection.displayName)}</div>
                            <div className="text-[11px] text-muted-foreground leading-tight">{advancedMsg(selection.helpText)}</div>
                        </div>
                    </Button>
                ))}
            </form>
        </Template>
    );
}
