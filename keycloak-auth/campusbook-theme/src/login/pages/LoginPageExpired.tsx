import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Clock, RotateCcw } from "lucide-react";
import { Button } from "../components/Button";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("pageExpiredTitle")}>
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    <Clock className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {msg("pageExpiredMsg1")} {msg("pageExpiredMsg2")}
                </p>

                <div className="w-full pt-2">
                    <a href={url.loginRestartFlowUrl} className="w-full block">
                        <Button className="w-full">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            {msgStr("doClickHere")}
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
}
