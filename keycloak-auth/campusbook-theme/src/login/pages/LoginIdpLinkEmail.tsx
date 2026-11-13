import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Mail } from "lucide-react";
import { Button } from "../components/Button";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, realm, brokerContext, idpAlias } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Mail className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-foreground">
                    {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName || realm.name)}
                </p>
                <p className="text-xs text-muted-foreground">{msg("emailLinkIdp2")}</p>

                <div className="w-full pt-2">
                    <a href={url.loginAction} className="w-full block">
                        <Button variant="outline" className="w-full">
                            {msgStr("emailLinkIdp3")}
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
}
