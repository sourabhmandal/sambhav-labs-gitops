import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Fingerprint } from "lucide-react";
import { Button } from "../components/Button";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, isSetRetry, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";
    useScript({ authButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("webauthn-registration-title")}
        >
            <div className="space-y-4 text-center">
                <form id="register" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                </form>

                <div className="flex flex-col items-center space-y-3 my-3">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary border border-primary/20">
                        <Fingerprint className="h-8 w-8" />
                    </div>
                    <p className="text-xs text-muted-foreground">Register a passkey or biometric security key to sign in faster and more securely</p>
                </div>

                <Button id={authButtonId} type="button" className="w-full" autoFocus>
                    <Fingerprint className="h-4 w-4 mr-2" />
                    {msgStr("doRegisterSecurityKey")}
                </Button>

                {!isSetRetry && isAppInitiatedAction && (
                    <form action={url.loginAction} method="post" className="w-full">
                        <Button type="submit" name="cancel-aia" value="true" variant="ghost" className="w-full text-xs">
                            {msgStr("doCancel")}
                        </Button>
                    </form>
                )}
            </div>
        </Template>
    );
}
