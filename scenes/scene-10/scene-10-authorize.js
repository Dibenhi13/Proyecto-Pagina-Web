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


const endingHum =
    document.querySelector(
        "#ending-hum"
    );


const endingCorruption =
    document.querySelector(
        "#ending-corruption"
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
// ENDING SEQUENCE
// =========================================================

async function runAuthorizeEnding() {


    // -----------------------------------------------------
    // APPLY TEXT
    // -----------------------------------------------------

    authorizeMessage.textContent =
        translations[
            currentLanguage
        ].accessGranted;


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
        650
    );


    // -----------------------------------------------------
    // ACCESS GRANTED...
    // -----------------------------------------------------

    await window.Scene10Animations
        .showAuthorizeMessage();


    /*
        The system remains completely calm.

        This pause is intentional.
    */

    await wait(
        2200
    );


    // -----------------------------------------------------
    // FINAL CREW WARNING
    // -----------------------------------------------------

    /*
        This should sound like recovered audio
        from the crew.

        Suggested dialogue:

        "Whatever you do...
        don't let the ship reach Earth."
    */

    safePlayAudio(
        endingWarning,
        0.62
    );


    /*
        Let the warning breathe.

        The user already authorized docking,
        so the realization comes too late.
    */

    await wait(
        3000
    );


    // -----------------------------------------------------
    // FIRST FAILURE
    // -----------------------------------------------------

    window.Scene10Animations
        .setCorruptionLevel(
            1
        );


    await wait(
        850
    );


    // -----------------------------------------------------
    // SECOND FAILURE
    // -----------------------------------------------------

    window.Scene10Animations
        .setCorruptionLevel(
            2
        );


    await wait(
        800
    );


    // -----------------------------------------------------
    // CORRUPTION AUDIO
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
    // CRITICAL STATE
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

function initAuthorizeEnding() {

    window.Scene10Animations
        .init();


    runAuthorizeEnding();

}


// =========================================================
// START
// =========================================================

initAuthorizeEnding();