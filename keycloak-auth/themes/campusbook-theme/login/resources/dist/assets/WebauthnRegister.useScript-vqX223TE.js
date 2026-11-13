import{u as J,r as b,b as n}from"./index-CcVYcz2N.js";import{w}from"./waitForElementMountedOnDom-qpCjLZnq.js";n();n();function x(r){const{authButtonId:e,kcContext:s,i18n:a}=r,{url:o,challenge:u,userid:c,username:g,signatureAlgorithms:m,rpEntityName:y,rpId:f,attestationConveyancePreference:d,authenticatorAttachment:l,requireResidentKey:p,residentKey:S,userVerificationRequirement:N,createTimeout:h,excludeCredentialIds:O}=s,{msgStr:t,isFetchingTranslations:i}=a,{insertScriptTags:$}=J({componentOrHookName:"LoginRecoveryAuthnCodeConfig",scriptTags:[{type:"module",textContent:()=>`
                    import { registerByWebAuthn } from "${o.resourcesPath}/js/webauthnRegister.js";
                    const registerButton = document.getElementById('${e}');
                    registerButton.addEventListener("click", function() {
                        const input = {
                            challenge : ${JSON.stringify(u)},
                            userid : ${JSON.stringify(c)},
                            username : ${JSON.stringify(g)},
                            signatureAlgorithms : ${JSON.stringify(m)},
                            rpEntityName : ${JSON.stringify(y)},
                            rpId : ${JSON.stringify(f)},
                            attestationConveyancePreference : ${JSON.stringify(d)},
                            authenticatorAttachment : ${JSON.stringify(l)},
                            requireResidentKey : ${JSON.stringify(p)},
                            residentKey : ${JSON.stringify(S)},
                            userVerificationRequirement : ${JSON.stringify(N)},
                            createTimeout : ${JSON.stringify(h)},
                            excludeCredentialIds : ${JSON.stringify(O)},
                            initLabel : ${JSON.stringify(t("webauthn-registration-init-label"))},
                            initLabelPrompt : ${JSON.stringify(t("webauthn-registration-init-label-prompt"))},
                            errmsg : ${JSON.stringify(t("webauthn-unsupported-browser-text"))}
                        };
                        registerByWebAuthn(input);
                    }, { once: true });
                `}]});b.useEffect(()=>{i||(async()=>(await w({elementId:e}),$()))()},[i])}export{x as u};
