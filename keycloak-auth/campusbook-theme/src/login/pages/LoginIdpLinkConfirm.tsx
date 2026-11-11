import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "../components/Button";
import { Link2 } from "lucide-react";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes } = props;
    const { url, idpAlias } = kcContext;
    const { msg } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("confirmLinkIdpTitle")}
        >
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Link2 className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {msg("confirmLinkIdpReviewProfile")}
                </p>

                <form
                    action={url.loginAction}
                    method="post"
                    onSubmit={() => setIsSubmitting(true)}
                    className="w-full space-y-3 pt-2"
                >
                    <Button
                        type="submit"
                        name="submitAction"
                        value="updateProfile"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        name="submitAction"
                        value="linkAccount"
                        variant="outline"
                        className="w-full"
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
