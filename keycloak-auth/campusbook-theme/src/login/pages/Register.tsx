import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "../components/Button";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss = false, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            displayInfo={true}
            infoNode={
                <span>
                    {msg("backToLogin")}{" "}
                    <a href={url.loginUrl} className="font-medium text-primary hover:underline">
                        {msg("doLogIn")}
                    </a>
                </span>
            }
        >
            <form id="kc-register-form" action={url.registrationAction} method="post" className="space-y-4">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={() => ""}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={!isFormSubmittable}
                >
                    {msgStr("doRegister")}
                </Button>
            </form>
        </Template>
    );
}
