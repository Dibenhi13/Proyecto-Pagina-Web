// =========================================================
// SCENE 10 — DENY ENDING
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const denyMessage01 =
    document.querySelector(
        "#deny-message-01"
    );


const denyMessage02 =
    document.querySelector(
        "#deny-message-02"
    );


const denyMessage03 =
    document.querySelector(
        "#deny-message-03"
    );


const denyMessage04 =
    document.querySelector(
        "#deny-message-04"
    );


// =========================================================
// AUDIO — SFX
// =========================================================

const endingHum =
    document.querySelector(
        "#ending-hum"
    );


const endingStatic =
    document.querySelector(
        "#ending-static"
    );


const endingRumble =
    document.querySelector(
        "#ending-rumble"
    );


const endingSystemError =
    document.querySelector(
        "#ending-system-error"
    );


const endingGlitchMedium =
    document.querySelector(
        "#ending-glitch-medium"
    );


const endingGlitchStrong =
    document.querySelector(
        "#ending-glitch-strong"
    );


const endingElectrical =
    document.querySelector(
        "#ending-electrical"
    );


const endingLowImpact =
    document.querySelector(
        "#ending-low-impact"
    );


const endingWhiteoutRiser =
    document.querySelector(
        "#ending-whiteout-riser"
    );


// =========================================================
// STATE
// =========================================================

let currentLanguage =
    "en";


// =========================================================
// LANGUAGE
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
// TRANSLATIONS
// =========================================================

const translations = {

    en: {

        line01:
            "What makes you think you have a choice?",

        line02:
            "Access granted...",

        line03:
            "Integration complete",

        line04:
            "Welcome back."

    },


    es: {

        line01:
            "¿Qué te hace pensar que tienes una elección?",

        line02:
            "Acceso concedido...",

        line03:
            "Integración completa",

        line04:
            "Bienvenido de vuelta."

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
// SAFE AUDIO
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
// START AMBIENCE
// =========================================================

function startEndingAmbience() {

    /*
        Al inicio todavía existe la
        ilusión de que DENY funcionó.
    */

    if (endingHum) {

        endingHum.volume =
            0.025;


        endingHum
            .play()
            .catch(() => {});

    }

}


// =========================================================
// UNLOCK AMBIENCE
// =========================================================

function unlockEndingAmbience() {

    if (
        endingHum &&
        endingHum.paused
    ) {

        endingHum.volume =
            0.025;


        endingHum
            .play()
            .catch(() => {});

    }

}


// =========================================================
// FADE AUDIO OUT
// =========================================================

function fadeAudioOut(
    audio,
    duration = 1000
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
        20;


    const interval =
        duration /
        steps;


    let currentStep =
        0;


    const fade =
        setInterval(

            () => {

                currentStep++;


                audio.volume =
                    Math.max(
                        0,
                        startVolume *
                        (
                            1 -
                            currentStep /
                            steps
                        )
                    );


                if (
                    currentStep >=
                    steps
                ) {

                    clearInterval(
                        fade
                    );


                    audio.pause();

                    audio.currentTime =
                        0;

                }

            },

            interval
        );

}


// =========================================================
// APPLY TEXT
// =========================================================

function applyText() {

    const text =
        translations[
            currentLanguage
        ];


    denyMessage01.textContent =
        text.line01;


    denyMessage02.textContent =
        text.line02;


    denyMessage03.textContent =
        text.line03;


    denyMessage04.textContent =
        text.line04;

}


// =========================================================
// ENDING SEQUENCE
// =========================================================

async function runDenyEnding() {

    // =====================================================
    // APPLY TEXT
    // =====================================================

    applyText();


    // =====================================================
    // INITIAL SILENCE
    // =====================================================

    await wait(
        600
    );


    // =====================================================
    // LOW HUM
    // =====================================================

    startEndingAmbience();


    // =====================================================
    // FRAME APPEARS
    // =====================================================

    await window.Scene10Animations
        .playSceneEntry();


    await wait(
        700
    );


    // =====================================================
    // WHAT MAKES YOU THINK...
    // =====================================================

    /*
        Primera revelación.

        Golpe grave, pero sin glitch todavía.
    */

    safePlayAudio(
        endingLowImpact,
        0.58
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage01,
            1
        );


    /*
        Dejamos respirar la frase.
    */

    await wait(
        1800
    );


    // =====================================================
    // ACCESS GRANTED...
    // =====================================================

    /*
        Aquí confirmamos que el botón DENY
        fue ignorado.

        Por primera vez usamos system-error.
    */

    safePlayAudio(
        endingSystemError,
        0.55
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingGlitchMedium,
                0.55
            );

        },
        90
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage02,
            2
        );


    await wait(
        1350
    );


    // =====================================================
    // INTEGRATION COMPLETE
    // =====================================================

    /*
        La integración empieza.

        El ambiente corrupto entra aquí.
    */

    safePlayAudio(
        endingElectrical,
        0.35
    );


    safePlayAudio(
        endingGlitchMedium,
        0.62
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage03,
            3
        );


    // =====================================================
    // CORRUPTION LEVEL 1
    // =====================================================

    window.Scene10Animations
        .setCorruptionLevel(
            1
        );


    if (endingStatic) {

        endingStatic.volume =
            0.035;


        endingStatic
            .play()
            .catch(() => {});

    }


    if (endingRumble) {

        endingRumble.volume =
            0.035;


        endingRumble
            .play()
            .catch(() => {});

    }


    await wait(
        1400
    );


    // =====================================================
    // WELCOME BACK.
    // =====================================================

    /*
        Momento más pesado del final DENY.
    */

    safePlayAudio(
        endingLowImpact,
        0.82
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingGlitchStrong,
                0.72
            );

        },
        90
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage04,
            4
        );


    /*
        El rumble se vuelve claramente
        perceptible después de la frase.
    */

    if (endingRumble) {

        endingRumble.volume =
            0.06;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.055;

    }


    await wait(
        1800
    );


    // =====================================================
    // CORRUPTION LEVEL 2
    // =====================================================

    safePlayAudio(
        endingGlitchMedium,
        0.68
    );


    window.Scene10Animations
        .setCorruptionLevel(
            2
        );


    if (endingRumble) {

        endingRumble.volume =
            0.07;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.07;

    }


    await wait(
        800
    );


    // =====================================================
    // CORRUPTION LEVEL 3
    // =====================================================

    safePlayAudio(
        endingGlitchStrong,
        0.85
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingElectrical,
                0.4
            );

        },
        100
    );


    window.Scene10Animations
        .setCorruptionLevel(
            3
        );


    if (endingRumble) {

        endingRumble.volume =
            0.085;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.085;

    }


    await wait(
        850
    );


    // =====================================================
    // CORRUPTION LEVEL 4
    // =====================================================

    safePlayAudio(
        endingGlitchStrong,
        1
    );


    safePlayAudio(
        endingElectrical,
        0.48
    );


    window.Scene10Animations
        .setCorruptionLevel(
            4
        );


    if (endingRumble) {

        endingRumble.volume =
            0.11;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.11;

    }


    await wait(
        700
    );


    // =====================================================
    // FINAL WHITEOUT
    // =====================================================

    /*
        Riser sincronizado con
        playFinalWhiteout().
    */

    safePlayAudio(
        endingWhiteoutRiser,
        0.9
    );


    safePlayAudio(
        endingGlitchStrong,
        0.9
    );


    fadeAudioOut(
        endingHum,
        700
    );


    fadeAudioOut(
        endingStatic,
        850
    );


    fadeAudioOut(
        endingRumble,
        1000
    );


    await window.Scene10Animations
        .playFinalWhiteout();


    // =====================================================
    // HOLD ON WHITE
    // =====================================================

    await wait(
        2500
    );


    // =====================================================
    // RETURN TO START
    // =====================================================

    window.location.href =
        "../../index.html";

}


// =========================================================
// FIRST INTERACTION
// =========================================================

document.addEventListener(
    "pointerdown",

    unlockEndingAmbience,

    {
        once: true
    }
);


// =========================================================
// INIT
// =========================================================

function initDenyEnding() {

    window.Scene10Animations
        .init();


    runDenyEnding();

}


// =========================================================
// START
// =========================================================

initDenyEnding();