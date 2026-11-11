import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Header } from "./components/Header";
import { Alert } from "./components/Alert";
import { Footer } from "./components/Footer";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        doUseDefaultCss = false,
        children
    } = props;

    const { msgStr, currentLanguage, enabledLanguages } = i18n;
    const { realm, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, [documentTitle, msgStr, realm.displayName, realm.name]);

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    const showMessage = displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction);

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 bg-background selection:bg-primary/20 selection:text-primary relative overflow-hidden">
            {/* Subtle aesthetic backdrop blur spots */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
                <Header
                    realmName={realm.displayName || realm.name}
                    title={headerNode}
                />

                {showMessage && (
                    <Alert
                        type={message.type}
                        message={message.summary}
                    />
                )}

                {socialProvidersNode}

                <div className="w-full">
                    {children}
                </div>

                {displayInfo && infoNode && (
                    <div className="mt-6 pt-4 border-t border-border/50 text-center text-xs text-muted-foreground">
                        {infoNode}
                    </div>
                )}

                <Footer
                    enabledLanguages={enabledLanguages}
                    currentLanguage={currentLanguage}
                />
            </div>
        </div>
    );
}
