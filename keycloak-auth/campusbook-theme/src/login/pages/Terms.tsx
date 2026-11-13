import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { ScrollText } from "lucide-react";
import { Button } from "../components/Button";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("termsTitle")}>
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <ScrollText className="h-4 w-4 text-primary" />
                    <span>Please review and accept our Terms of Service</span>
                </div>

                <div className="max-h-60 overflow-y-auto p-4 rounded-xl border border-border/80 bg-muted/40 text-xs text-muted-foreground leading-relaxed">
                    {msg("termsText")}
                </div>

                <form action={url.loginAction} method="post" onSubmit={() => setIsSubmitting(true)} className="flex items-center gap-3 pt-2">
                    <Button type="submit" name="accept" className="w-full" isLoading={isSubmitting}>
                        {msgStr("doAccept")}
                    </Button>
                    <Button type="submit" name="cancel" variant="outline" className="w-full">
                        {msgStr("doDecline")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
