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
    const [actionClicked, setActionClicked] = useState<string | null>(null);

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("confirmLinkIdpTitle")}>
            <div className="flex flex-col items-center text-center space-y-4 my-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Link2 className="h-6 w-6" />
                </div>
                <form action={url.loginAction} method="post" className="w-full space-y-3 pt-2">
                    <Button
                        type="submit"
                        name="submitAction"
                        value="linkAccount"
                        className="w-full"
                        onClick={() => setActionClicked("linkAccount")}
                        isLoading={actionClicked === "linkAccount"}
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                    <Button
                        type="submit"
                        name="submitAction"
                        value="updateProfile"
                        variant="outline"
                        className="w-full"
                        onClick={() => setActionClicked("updateProfile")}
                        isLoading={actionClicked === "updateProfile"}
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
