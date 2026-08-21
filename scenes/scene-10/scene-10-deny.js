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


const endingHum =
    document.querySelector(
        "#ending-hum"
    );


const endingCorruption =
    document.querySelector(
        "#ending-corruption"
    );


const welcomeImpact =
    document.querySelector(
        "#welcome-impact"
    );


const endingWarning =
    document.querySelector(
        "#ending-warning"
    );


// =========================================================
// STATE
// =========================================================

let currentLanguage = "en";


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
    volume = 1
) {

    if (!audio) {
        return;
    }


    audio.currentTime =
        0;


    audio.volume =
        volume;


    audio
        .play()
        .catch(
            () => {}
        );

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


    // -----------------------------------------------------
    // APPLY TEXT
    // -----------------------------------------------------

    applyText();


    // -----------------------------------------------------
    // INITIAL SILENCE
    // -----------------------------------------------------

    await wait(
        600
    );


    // -----------------------------------------------------
    // LOW HUM
    // -----------------------------------------------------

    if (
        endingHum
    ) {

        endingHum.volume =
            0.1;


        endingHum
            .play()
            .catch(
                () => {}
            );

    }


    // -----------------------------------------------------
    // FRAME APPEARS
    // -----------------------------------------------------

    await window.Scene10Animations
        .playSceneEntry();


    await wait(
        700
    );


    // -----------------------------------------------------
    // WHAT MAKES YOU THINK...
    // -----------------------------------------------------

    await window.Scene10Animations
        .showDenyMessage(
            denyMessage01,
            1
        );


    await wait(
        1600
    );


    // -----------------------------------------------------
    // CREW WARNING / AUDIO TEST
    // -----------------------------------------------------

    safePlayAudio(
        endingWarning,
        0.62
    );


    /*
        Same timing and playback logic
        as the Authorize ending.
    */

    await wait(
        3000
    );


    // -----------------------------------------------------
    // ACCESS GRANTED...
    // -----------------------------------------------------

    await window.Scene10Animations
        .showDenyMessage(
            denyMessage02,
            2
        );


    await wait(
        1350
    );


    // -----------------------------------------------------
    // INTEGRATION COMPLETE
    // -----------------------------------------------------

    await window.Scene10Animations
        .showDenyMessage(
            denyMessage03,
            3
        );


    // -----------------------------------------------------
    // FIRST CORRUPTION
    // -----------------------------------------------------

    window.Scene10Animations
        .setCorruptionLevel(
            1
        );


    await wait(
        1400
    );


    // -----------------------------------------------------
    // WELCOME BACK.
    // -----------------------------------------------------

    safePlayAudio(
        welcomeImpact,
        0.45
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage04,
            4
        );


    await wait(
        1800
    );


    // -----------------------------------------------------
    // CORRUPTION LEVEL 2
    // -----------------------------------------------------

    window.Scene10Animations
        .setCorruptionLevel(
            2
        );


    await wait(
        800
    );


    // -----------------------------------------------------
    // CORRUPTION LEVEL 3
    // -----------------------------------------------------

    safePlayAudio(
        endingCorruption,
        0.3
    );


    window.Scene10Animations
        .setCorruptionLevel(
            3
        );


    await wait(
        850
    );


    // -----------------------------------------------------
    // CORRUPTION LEVEL 4
    // -----------------------------------------------------

    window.Scene10Animations
        .setCorruptionLevel(
            4
        );


    await wait(
        700
    );


    // -----------------------------------------------------
    // FADE AUDIO
    // -----------------------------------------------------

    fadeAudioOut(
        endingHum,
        900
    );


    fadeAudioOut(
        endingCorruption,
        800
    );


    fadeAudioOut(
        endingWarning,
        500
    );


    fadeAudioOut(
        welcomeImpact,
        500
    );


    // -----------------------------------------------------
    // FINAL WHITEOUT
    // -----------------------------------------------------

    await window.Scene10Animations
        .playFinalWhiteout();


    // -----------------------------------------------------
    // HOLD ON WHITE
    // -----------------------------------------------------

    await wait(
        2500
    );


    // -----------------------------------------------------
    // RETURN TO START
    // -----------------------------------------------------

    window.location.href =
        "../../index.html";

}


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