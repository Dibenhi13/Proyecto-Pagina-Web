// =========================================================
// ESCENA 09 — LÓGICA
// Final Decision / Authorization Required
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS
// =========================================================

const authorizationTitle =
    document.querySelector(
        "#authorization-title"
    );


const decisionOptions =
    document.querySelector(
        "#decision-options"
    );


const decisionButtons =
    document.querySelectorAll(
        ".decision-button"
    );


const authorizeButton =
    document.querySelector(
        "#authorize-button"
    );


const denyButton =
    document.querySelector(
        "#deny-button"
    );


const authorizeText =
    document.querySelector(
        "#authorize-text"
    );


const denyText =
    document.querySelector(
        "#deny-text"
    );


const resultSection =
    document.querySelector(
        "#result-section"
    );


const resultTitle =
    document.querySelector(
        "#result-title"
    );


const resultSubtitle =
    document.querySelector(
        "#result-subtitle"
    );


const hoverAudio =
    document.querySelector(
        "#hover-audio"
    );


const confirmAudio =
    document.querySelector(
        "#confirm-audio"
    );


const authorizeAudio =
    document.querySelector(
        "#authorize-audio"
    );


const denyAudio =
    document.querySelector(
        "#deny-audio"
    );


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let decisionMade = false;


// =========================================================
// IDIOMA
// =========================================================

const savedLanguage =
    localStorage.getItem(
        "language"
    );


if (
    savedLanguage === "en" ||
    savedLanguage === "es"
) {

    currentLanguage =
        savedLanguage;

}


document.documentElement.lang =
    currentLanguage;


// =========================================================
// TRADUCCIONES
// =========================================================

const translations = {

    en: {

        authorization:
            "AUTHORIZATION REQUIRED",

        authorize:
            "AUTHORIZE DOCKING",

        deny:
            "DENY ACCESS",

        authorizeResult:
            "DOCKING AUTHORIZED",

        authorizeSubtitle:
            "> INITIATING DOCKING SEQUENCE...",

        denyResult:
            "DOCKING REQUEST REJECTED",

        denySubtitle:
            "> TERMINATING CONNECTION..."

    },


    es: {

        authorization:
            "AUTORIZACIÓN REQUERIDA",

        authorize:
            "AUTORIZAR ACOPLAMIENTO",

        deny:
            "DENEGAR ACCESO",

        authorizeResult:
            "ACOPLAMIENTO AUTORIZADO",

        authorizeSubtitle:
            "> INICIANDO SECUENCIA DE ACOPLAMIENTO...",

        denyResult:
            "SOLICITUD DE ACOPLAMIENTO RECHAZADA",

        denySubtitle:
            "> TERMINANDO CONEXIÓN..."

    }

};


// =========================================================
// WAIT
// =========================================================

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


// =========================================================
// AUDIO SEGURO
// =========================================================

function safePlayAudio(
    audio
) {

    if (!audio) {
        return;
    }


    audio.currentTime =
        0;


    audio
        .play()
        .catch(
            () => {}
        );

}


// =========================================================
// APLICAR IDIOMA
// =========================================================

function applyLanguage() {

    const text =
        translations[
            currentLanguage
        ];


    authorizationTitle.textContent =
        text.authorization;


    authorizeText.textContent =
        text.authorize;


    denyText.textContent =
        text.deny;

}


// =========================================================
// HOVER
// =========================================================

function handleDecisionHover(
    button
) {

    if (
        decisionMade
    ) {

        return;

    }


    /*
        Sonido opcional.
    */

    if (
        hoverAudio
    ) {

        hoverAudio.currentTime =
            0;


        hoverAudio.volume =
            0.22;


        hoverAudio
            .play()
            .catch(
                () => {}
            );

    }


    window.Scene09Animations
        .playDecisionHover(
            button
        );

}


// =========================================================
// DECISION
// =========================================================

async function handleDecision(
    decision
) {

    if (
        decisionMade
    ) {

        return;

    }


    decisionMade =
        true;


    /*
        Inmediatamente bloqueamos ambas
        opciones para evitar doble click.
    */

    decisionButtons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    safePlayAudio(
        confirmAudio
    );


    const selectedButton =
        decision === "authorize"
            ? authorizeButton
            : denyButton;


    // =====================================================
    // SELECCIÓN
    // =====================================================

    await window.Scene09Animations
        .playDecisionSelection(
            selectedButton
        );


    // =====================================================
    // OCULTAR OPCIONES
    // =====================================================

    await window.Scene09Animations
        .hideDecisionOptions(
            selectedButton
        );


    // =====================================================
    // PREPARAR RESULTADO
    // =====================================================

    resultSection.style.display =
        "flex";


    resultSection.setAttribute(
        "aria-hidden",
        "false"
    );


    const text =
        translations[
            currentLanguage
        ];


    // =====================================================
    // AUTHORIZE
    // =====================================================

    if (
        decision === "authorize"
    ) {

        resultTitle.textContent =
            text.authorizeResult;


        resultSubtitle.textContent =
            text.authorizeSubtitle;


        safePlayAudio(
            authorizeAudio
        );


        await window.Scene09Animations
            .showDecisionResult(
                "authorize"
            );


        await wait(
            1300
        );


        await window.Scene09Animations
            .playAuthorizeTransition();


        window.location.href =
            "../scene-10/scene-10-authorize.html";


        return;

    }


    // =====================================================
    // DENY
    // =====================================================

    resultTitle.textContent =
        text.denyResult;


    resultSubtitle.textContent =
        text.denySubtitle;


    safePlayAudio(
        denyAudio
    );


    await window.Scene09Animations
        .showDecisionResult(
            "deny"
        );


    await wait(
        1300
    );


    await window.Scene09Animations
        .playDenyTransition();


    window.location.href =
        "../scene-10/scene-10-deny.html";

}


// =========================================================
// CLICK EVENTS
// =========================================================

decisionButtons.forEach(
    button => {

        button.addEventListener(
            "click",

            () => {

                handleDecision(
                    button.dataset.decision
                );

            }
        );


        button.addEventListener(
            "mouseenter",

            () => {

                handleDecisionHover(
                    button
                );

            }
        );

    }
);


// =========================================================
// INIT
// =========================================================

async function initScene09() {

    applyLanguage();


    window.Scene09Animations
        .init();


    /*
        Venimos del caos de Scene 08.

        Dejamos negro un momento para que
        el contraste sea fuerte.
    */

    await window.Scene09Animations
        .playSceneEntry();


    await wait(
        450
    );


    /*
        AUTHORIZATION REQUIRED
    */

    await window.Scene09Animations
        .showAuthorizationTitle();


    /*
        Pequeña pausa antes de revelar
        que ahora sí existe una decisión.
    */

    await wait(
        1100
    );


    /*
        AUTHORIZE / DENY
    */

    await window.Scene09Animations
        .showDecisionOptions();

}


// =========================================================
// START
// =========================================================

initScene09();