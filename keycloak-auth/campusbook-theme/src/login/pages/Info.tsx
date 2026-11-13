import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Info as InfoIcon } from "lucide-react";
import { Button } from "../components/Button";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { advancedMsgStr, msgStr } = i18n;
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ? advancedMsgStr(messageHeader) : message.summary)
                    }}
                />
            }
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <InfoIcon className="h-6 w-6" />
                </div>
                <div
                    className="text-xs text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary?.trim() ?? "";
                                if (requiredActions) {
                                    html += " <b>";
                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");
                                    html += "</b>";
                                }
                                return html;
                            })()
                        )
                    }}
                />

                {!skipLink && (
                    <div className="w-full pt-2">
                        {pageRedirectUri ? (
                            <a href={pageRedirectUri} className="w-full block">
                                <Button variant="outline" className="w-full">
                                    {msgStr("backToApplication")}
                                </Button>
                            </a>
                        ) : actionUri ? (
                            <a href={actionUri} className="w-full block">
                                <Button className="w-full">{msgStr("proceedWithAction")}</Button>
                            </a>
                        ) : client.baseUrl ? (
                            <a href={client.baseUrl} className="w-full block">
                                <Button variant="outline" className="w-full">
                                    {msgStr("backToApplication")}
                                </Button>
                            </a>
                        ) : null}
                    </div>
                )}
            </div>
        </Template>
    );
}
