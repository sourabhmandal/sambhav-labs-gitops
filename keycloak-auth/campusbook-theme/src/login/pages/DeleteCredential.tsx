import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Trash2 } from "lucide-react";
import { Button } from "../components/Button";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, credentialLabel } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                    <Trash2 className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {msg("deleteCredentialMessage", credentialLabel)}
                </p>

                <form
                    action={url.loginAction}
                    method="post"
                    onSubmit={() => setIsSubmitting(true)}
                    className="w-full flex items-center gap-3 pt-2"
                >
                    <Button
                        type="submit"
                        name="accept"
                        variant="destructive"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        {msgStr("doAccept")}
                    </Button>
                    <Button
                        type="submit"
                        name="cancel"
                        variant="outline"
                        className="w-full"
                    >
                        {msgStr("doDecline")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
