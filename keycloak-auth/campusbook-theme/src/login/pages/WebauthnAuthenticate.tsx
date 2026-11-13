import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Fingerprint } from "lucide-react";
import { Button } from "../components/Button";

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;

    const authButtonId = "authenticateWebAuthnButton";
    useScript({ authButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            headerNode={msg("webauthn-login-title")}
            infoNode={
                <span>
                    {msg("noAccount")}{" "}
                    <a href={url.registrationUrl} className="font-medium text-primary hover:underline">
                        {msg("doRegister")}
                    </a>
                </span>
            }
        >
            <div className="space-y-4 text-center">
                <form id="webauth" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>

                <div className="flex flex-col items-center space-y-3 my-3">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary border border-primary/20 animate-pulse">
                        <Fingerprint className="h-8 w-8" />
                    </div>
                    <p className="text-xs text-muted-foreground">Use your security key, biometric passkey, or device screen lock</p>
                </div>

                <Button id={authButtonId} type="button" className="w-full" autoFocus>
                    <Fingerprint className="h-4 w-4 mr-2" />
                    {msgStr("webauthn-doAuthenticate")}
                </Button>

                {shouldDisplayAuthenticators && authenticators && (
                    <div className="mt-4 pt-3 border-t border-border/60 text-left text-xs space-y-2">
                        <span className="font-medium text-muted-foreground">Available credentials:</span>
                        {authenticators.authenticators.map(auth => (
                            <div
                                key={auth.credentialId}
                                className="p-2 rounded-lg bg-muted/40 border border-border/80 flex items-center justify-between"
                            >
                                <span className="font-medium text-foreground">{advancedMsg(auth.label)}</span>
                                <span className="text-muted-foreground text-[10px]">{auth.createdAt}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Template>
    );
}
