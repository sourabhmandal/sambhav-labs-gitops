import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { AlertOctagon } from "lucide-react";
import { Button } from "../components/Button";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { message, client } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                    <AlertOctagon className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{message.summary}</p>

                {client !== undefined && client.baseUrl !== undefined && (
                    <div className="w-full pt-2">
                        <a href={client.baseUrl} className="w-full block">
                            <Button variant="outline" className="w-full">
                                {msgStr("backToApplication")}
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
}
