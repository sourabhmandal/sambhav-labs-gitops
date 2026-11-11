import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { LogOut } from "lucide-react";
import { Button } from "../components/Button";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, client } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("logoutConfirmTitle")}
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                    <LogOut className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {msg("logoutConfirmHeader")}
                </p>

                <form
                    action={url.logoutConfirmAction}
                    method="post"
                    onSubmit={() => setIsSubmitting(true)}
                    className="w-full space-y-3 pt-2"
                >
                    <Button
                        type="submit"
                        name="confirmLogout"
                        variant="destructive"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        {msgStr("doLogout")}
                    </Button>

                    {client.baseUrl && (
                        <a href={client.baseUrl} className="w-full block">
                            <Button type="button" variant="ghost" className="w-full">
                                {msgStr("doCancel")}
                            </Button>
                        </a>
                    )}
                </form>
            </div>
        </Template>
    );
}
