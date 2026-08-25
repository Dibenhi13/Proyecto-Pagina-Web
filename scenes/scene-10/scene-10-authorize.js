// =========================================================
// SCENE 10 — AUTHORIZE ENDING
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const authorizeMessage =
    document.querySelector(
        "#authorize-message"
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

        accessGranted:
            "ACCESS GRANTED..."

    },


    es: {

        accessGranted:
            "ACCESO CONCEDIDO..."

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
        AUTHORIZE empieza tranquilo.

        Queremos que por unos segundos
        parezca que todo salió bien.
    */

    if (endingHum) {

        endingHum.volume =
            0.025;


        endingHum
            .play()
            .catch(() => {});

    }


    /*
        Static y rumble no entran todavía.

        Los dejamos preparados para cuando
        empiece la corrupción.
    */

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


    if (
        endingStatic &&
        !endingStatic.paused
    ) {

        return;

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
// ENDING SEQUENCE
// =========================================================

async function runAuthorizeEnding() {

    // =====================================================
    // APPLY TEXT
    // =====================================================

    authorizeMessage.textContent =
        translations[
            currentLanguage
        ].accessGranted;


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
        650
    );


    // =====================================================
    // ACCESS GRANTED...
    // =====================================================

    /*
        Un golpe muy leve.

        No queremos que parezca una
        amenaza inmediatamente.
    */

    safePlayAudio(
        endingLowImpact,
        0.28
    );


    await window.Scene10Animations
        .showAuthorizeMessage();


    /*
        Todo queda calmado por un momento.

        El usuario cree que autorizar
        simplemente funcionó.
    */

    await wait(
        2200
    );


    // =====================================================
    // CORRUPTION LEVEL 1
    // =====================================================

    /*
        Primera falla casi imperceptible.
    */

    window.Scene10Animations
        .setCorruptionLevel(
            1
        );


    if (endingStatic) {

        endingStatic.volume =
            0.025;


        endingStatic
            .play()
            .catch(() => {});

    }


    if (endingRumble) {

        endingRumble.volume =
            0.02;


        endingRumble
            .play()
            .catch(() => {});

    }


    await wait(
        850
    );


    // =====================================================
    // CORRUPTION LEVEL 2
    // =====================================================

    safePlayAudio(
        endingGlitchMedium,
        0.5
    );


    window.Scene10Animations
        .setCorruptionLevel(
            2
        );


    if (endingStatic) {

        endingStatic.volume =
            0.045;

    }


    if (endingRumble) {

        endingRumble.volume =
            0.035;

    }


    await wait(
        800
    );


    // =====================================================
    // CORRUPTION LEVEL 3
    // =====================================================

    /*
        Primer colapso serio.
    */

    safePlayAudio(
        endingGlitchStrong,
        0.78
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingElectrical,
                0.3
            );

        },
        100
    );


    window.Scene10Animations
        .setCorruptionLevel(
            3
        );


    if (endingStatic) {

        endingStatic.volume =
            0.07;

    }


    if (endingRumble) {

        endingRumble.volume =
            0.055;

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
        0.45
    );


    window.Scene10Animations
        .setCorruptionLevel(
            4
        );


    if (endingStatic) {

        endingStatic.volume =
            0.1;

    }


    if (endingRumble) {

        endingRumble.volume =
            0.085;

    }


    await wait(
        700
    );


    // =====================================================
    // FINAL WHITEOUT
    // =====================================================

    /*
        El riser inicia justo antes de
        comenzar el whiteout visual.
    */

    safePlayAudio(
        endingWhiteoutRiser,
        0.85
    );


    /*
        Último glitch antes de que
        desaparezca todo.
    */

    safePlayAudio(
        endingGlitchStrong,
        0.85
    );


    fadeAudioOut(
        endingHum,
        700
    );


    fadeAudioOut(
        endingStatic,
        800
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

function initAuthorizeEnding() {

    window.Scene10Animations
        .init();


    runAuthorizeEnding();

}


// =========================================================
// START
// =========================================================

initAuthorizeEnding();