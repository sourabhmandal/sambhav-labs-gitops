import{u as d,r as g,b as n}from"./index-Bv7yXCEz.js";import{w as l}from"./waitForElementMountedOnDom-qpCjLZnq.js";n();n();function I(i){const{authButtonId:t,kcContext:r,i18n:s}=i,{url:o,isUserIdentified:a,challenge:u,userVerification:c,rpId:m,createTimeout:f}=r,{msgStr:p,isFetchingTranslations:e}=s,{insertScriptTags:h}=d({componentOrHookName:"WebauthnAuthenticate",scriptTags:[{type:"module",textContent:()=>`

                    import { authenticateByWebAuthn } from "${o.resourcesPath}/js/webauthnAuthenticate.js";
                    const authButton = document.getElementById('${t}');
                    authButton.addEventListener("click", function() {
                        const input = {
                            isUserIdentified : ${a},
                            challenge : ${JSON.stringify(u)},
                            userVerification : ${JSON.stringify(c)},
                            rpId : ${JSON.stringify(m)},
                            createTimeout : ${JSON.stringify(f)},
                            errmsg : ${JSON.stringify(p("webauthn-unsupported-browser-text"))}
                        };
                        authenticateByWebAuthn(input);
                    }, { once: true });
                `}]});g.useEffect(()=>{e||(async()=>(await l({elementId:t}),h()))()},[e])}export{I as u};
