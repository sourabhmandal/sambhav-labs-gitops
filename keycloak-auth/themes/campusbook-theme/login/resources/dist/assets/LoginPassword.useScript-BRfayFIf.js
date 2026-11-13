import{u as y,r as l,b as s}from"./index-DFjwwdOX.js";import{w as S}from"./waitForElementMountedOnDom-qpCjLZnq.js";s();s();function A(o){const{webAuthnButtonId:t,kcContext:e,i18n:a}=o,{url:n,isUserIdentified:u,challenge:c,userVerification:m,rpId:h,createTimeout:p,mediation:d,authenticatorAttachment:f}=e,{msgStr:i,isFetchingTranslations:r}=a,{insertScriptTags:g}=y({componentOrHookName:"LoginPassword",scriptTags:[{type:"module",textContent:()=>`

                    import { authenticateByWebAuthn } from "${n.resourcesPath}/js/webauthnAuthenticate.js";
                    import { initAuthenticate } from "${n.resourcesPath}/js/passkeysConditionalAuth.js";
                    const authButton = document.getElementById('${t}');
                    const input = {
                        isUserIdentified : ${u},
                        challenge : ${JSON.stringify(c)},
                        userVerification : ${JSON.stringify(m)},
                        rpId : ${JSON.stringify(h)},
                        createTimeout : ${JSON.stringify(p)},
                        mediation : ${JSON.stringify(d)},
                        authenticatorAttachment : ${JSON.stringify(f)}
                    };
                    authButton.addEventListener("click", () => {
                        authenticateByWebAuthn({
                            ...input,
                            errmsg : ${JSON.stringify(i("webauthn-unsupported-browser-text"))}
                        });
                    }, { once: true });

                    initAuthenticate({
                        ...input,
                        errmsg : ${JSON.stringify(i("passkey-unsupported-browser-text"))}
                    });
                `}]});l.useEffect(()=>{r||e.enableWebAuthnConditionalUI!==!0||(async()=>(await S({elementId:t}),g()))()},[r])}export{A as u};
