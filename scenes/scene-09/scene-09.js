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


// =========================================================
// SFX
// =========================================================

const scene09Hum =
    document.querySelector(
        "#scene-09-hum"
    );


const scene09UIClick =
    document.querySelector(
        "#scene-09-ui-click"
    );


const scene09Confirm =
    document.querySelector(
        "#scene-09-confirm"
    );


const scene09GlitchSoft =
    document.querySelector(
        "#scene-09-glitch-soft"
    );


const scene09GlitchMedium =
    document.querySelector(
        "#scene-09-glitch-medium"
    );


// =========================================================
// ESTADO
// =========================================================

let currentLanguage =
    "en";


let decisionMade =
    false;


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
    audio,
    volume = 1,
    restart = true
) {

    if (!audio) {
        return;
    }


    if (restart) {

        audio.currentTime =
            0;

    }


    audio.volume =
        volume;


    audio
        .play()
        .catch(() => {});

}


// =========================================================
// AMBIENTE
// =========================================================

function startScene09Ambience() {

    /*
        Scene 09 debe sentirse casi vacía
        después del caos de Scene 08.
    */

    if (scene09Hum) {

        scene09Hum.volume =
            0.02;


        scene09Hum
            .play()
            .catch(() => {});

    }

}


// =========================================================
// DESBLOQUEAR AMBIENTE
// =========================================================

function unlockScene09Ambience() {

    if (
        scene09Hum &&
        scene09Hum.paused
    ) {

        scene09Hum.volume =
            0.02;


        scene09Hum
            .play()
            .catch(() => {});

    }

}


// =========================================================
// FADE AUDIO
// =========================================================

function fadeAmbientAudio(
    audio,
    duration = 500
) {

    if (
        !audio ||
        audio.paused
    ) {

        return;

    }


    const startVolume =
        audio.volume;


    const steps =
        12;


    let step =
        0;


    const interval =
        duration /
        steps;


    const fade =
        setInterval(

            () => {

                step++;


                audio.volume =
                    Math.max(
                        0,
                        startVolume *
                        (
                            1 -
                            step /
                            steps
                        )
                    );


                if (
                    step >=
                    steps
                ) {

                    clearInterval(
                        fade
                    );


                    audio.pause();

                }

            },

            interval

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
        IMPORTANTE:

        No reproducimos ningún SFX
        durante hover.

        Las dos decisiones deben sentirse
        neutrales y tener exactamente
        el mismo peso.
    */

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


    unlockScene09Ambience();


    decisionMade =
        true;


    /*
        Bloqueamos ambas opciones
        inmediatamente.
    */

    decisionButtons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    /*
        Ambos botones reciben exactamente
        el mismo sonido de click.
    */

    safePlayAudio(
        scene09UIClick,
        0.32
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


    /*
        Confirmación del sistema.

        Misma para AUTHORIZE y DENY.
    */

    safePlayAudio(
        scene09Confirm,
        0.55
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


        /*
            No usamos un SFX exclusivo.

            La elección todavía debe sentirse
            neutral.
        */

        await window.Scene09Animations
            .showDecisionResult(
                "authorize"
            );


        await wait(
            1300
        );


        /*
            La transición authorize es bastante
            limpia, así que usamos solo un
            glitch suave.
        */

        safePlayAudio(
            scene09GlitchSoft,
            0.55
        );


        fadeAmbientAudio(
            scene09Hum,
            450
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


    /*
        Tampoco usamos system-error aquí.

        DENY debe seguir pareciendo una
        decisión perfectamente válida.
    */

    await window.Scene09Animations
        .showDecisionResult(
            "deny"
        );


    await wait(
        1300
    );


    /*
        La animación de DENY sí contiene
        un pequeño glitch visual.

        Por eso usamos glitch-medium,
        pero sin convertirlo en un error.
    */

    safePlayAudio(
        scene09GlitchMedium,
        0.62
    );


    fadeAmbientAudio(
        scene09Hum,
        400
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
// PRIMERA INTERACCIÓN
// =========================================================

document.addEventListener(
    "pointerdown",

    unlockScene09Ambience,

    {
        once: true
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
        Hum extremadamente bajo.
    */

    startScene09Ambience();


    /*
        Venimos del caos de Scene 08.

        Dejamos negro un momento para
        marcar el contraste.
    */

    await window.Scene09Animations
        .playSceneEntry();


    await wait(
        450
    );


    // =====================================================
    // AUTHORIZATION REQUIRED
    // =====================================================

    await window.Scene09Animations
        .showAuthorizationTitle();


    /*
        Sin SFX.

        Queremos que el silencio haga
        el trabajo aquí.
    */

    await wait(
        1100
    );


    // =====================================================
    // AUTHORIZE / DENY
    // =====================================================

    await window.Scene09Animations
        .showDecisionOptions();

}


// =========================================================
// START
// =========================================================

initScene09();