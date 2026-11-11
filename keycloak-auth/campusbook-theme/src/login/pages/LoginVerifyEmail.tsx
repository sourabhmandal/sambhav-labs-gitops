import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Mail } from "lucide-react";
import { Button } from "../components/Button";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { msg, msgStr } = i18n;
    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={true}
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <span>
                    {msg("emailVerifyInstruction3")}{" "}
                    <a href={url.loginAction} className="font-medium text-primary hover:underline">
                        {msg("doClickHere")}
                    </a>
                </span>
            }
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Mail className="h-7 w-7" />
                </div>
                <p className="text-sm text-foreground/90 font-medium">
                    {msg("emailVerifyInstruction1", user?.email ?? "")}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {msg("emailVerifyInstruction2")}
                </p>
                <div className="w-full pt-2">
                    <a href={url.loginAction} className="w-full block">
                        <Button variant="outline" className="w-full">
                            {msgStr("emailVerifyInstruction3")}
                        </Button>
                    </a>
                </div>
            </div>
        </Template>
    );
}
