// =========================================================
// SCENE 10 — DENY ENDING
// Forced Override / Loss of Control
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
// JUMPSCARE
// =========================================================

const jumpscareContainer =
    document.querySelector(
        "#jumpscare-container"
    );


const jumpscareVideo =
    document.querySelector(
        "#jumpscare-video"
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


let endingStarted =
    false;


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
            "ACCESS DENIED.",

        line02:
            "USER AUTHORIZATION REVOKED.",

        line03:
            "DOCKING SEQUENCE OVERRIDE ACCEPTED.",

        line04:
            "WHAT MAKES YOU THINK YOU HAVE A CHOICE?"

    },


    es: {

        line01:
            "ACCESO DENEGADO.",

        line02:
            "AUTORIZACIÓN DEL USUARIO REVOCADA.",

        line03:
            "ANULACIÓN DE SECUENCIA DE ACOPLAMIENTO ACEPTADA.",

        line04:
            "¿QUÉ TE HACE PENSAR QUE TIENES UNA ELECCIÓN?"

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
// PRELOAD JUMPSCARE
// =========================================================

function prepareJumpscare() {

    if (!jumpscareVideo) {

        return;

    }


    jumpscareVideo.src =
        "../../assets/video/final-jumpscare.mp4";


    /*
        El video va muteado porque el impacto
        sonoro lo controlamos nosotros con SFX.
        Esto también ayuda a evitar bloqueos
        de autoplay del navegador.
    */

    jumpscareVideo.muted =
        false;

    jumpscareVideo.volume =
    1;


    jumpscareVideo.load();

}


// =========================================================
// PLAY JUMPSCARE
// =========================================================

async function playJumpscare() {

    if (
        !jumpscareContainer ||
        !jumpscareVideo
    ) {

        return;

    }


    // =====================================================
    // FALSA CALMA
    // =====================================================

    await wait(
        850
    );


    // =====================================================
    // MOSTRAR CONTENEDOR
    // =====================================================

    jumpscareContainer.classList.add(
        "is-active"
    );


    jumpscareContainer.classList.add(
        "is-glitching"
    );


    jumpscareContainer.setAttribute(
        "aria-hidden",
        "false"
    );


    // =====================================================
    // REINICIAR VIDEO
    // =====================================================

    jumpscareVideo.currentTime =
        0;


    // =====================================================
    // IMPACTO SONORO
    // =====================================================

    safePlayAudio(
        endingLowImpact,
        1
    );


    safePlayAudio(
        endingGlitchStrong,
        1
    );


    // =====================================================
    // PLAY VIDEO
    // =====================================================

    jumpscareVideo
        .play()
        .catch(() => {});


    /*
        Esperamos a que termine el video.

        El timeout de respaldo evita que la
        escena se quede atorada si por algún
        motivo el evento "ended" no ocurre.
    */

    await Promise.race([

        new Promise(
            resolve => {

                jumpscareVideo.addEventListener(
                    "ended",
                    resolve,
                    {
                        once: true
                    }
                );

            }
        ),

        wait(
            4000
        )

    ]);


    // =====================================================
    // OCULTAR VIDEO
    // =====================================================

    jumpscareContainer.classList.remove(
        "is-glitching"
    );


    jumpscareContainer.classList.remove(
        "is-active"
    );


    jumpscareContainer.setAttribute(
        "aria-hidden",
        "true"
    );


    jumpscareVideo.pause();


    jumpscareVideo.currentTime =
        0;


    await wait(
        180
    );

}


// =========================================================
// ENDING SEQUENCE
// =========================================================

async function runDenyEnding() {

    if (
        endingStarted
    ) {

        return;

    }


    endingStarted =
        true;


    // =====================================================
    // APPLY TEXT
    // =====================================================

    applyText();


    // =====================================================
    // INITIAL SILENCE
    // =====================================================

    await wait(
        750
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
    // ACCESS DENIED
    // =====================================================

    safePlayAudio(
        endingLowImpact,
        0.42
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage01,
            1
        );


    /*
        Por un momento parece que
        DENY funcionó.
    */

    await wait(
        1800
    );


    // =====================================================
    // USER AUTHORIZATION REVOKED
    // =====================================================

    safePlayAudio(
        endingSystemError,
        0.58
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingElectrical,
                0.22
            );

        },
        100
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage02,
            2
        );


    await wait(
        1450
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
            0.025;


        endingStatic
            .play()
            .catch(() => {});

    }


    if (endingRumble) {

        endingRumble.volume =
            0.025;


        endingRumble
            .play()
            .catch(() => {});

    }


    // =====================================================
    // DOCKING OVERRIDE ACCEPTED
    // =====================================================

    safePlayAudio(
        endingGlitchMedium,
        0.62
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingSystemError,
                0.42
            );

        },
        80
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage03,
            3
        );


    if (endingRumble) {

        endingRumble.volume =
            0.045;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.045;

    }


    await wait(
        1650
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
            0.06;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.06;

    }


    await wait(
        700
    );


    // =====================================================
    // WHAT MAKES YOU THINK...
    // =====================================================

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
        100
    );


    await window.Scene10Animations
        .showDenyMessage(
            denyMessage04,
            4
        );


    if (endingRumble) {

        endingRumble.volume =
            0.075;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.07;

    }


    await wait(
        2100
    );


    // =====================================================
    // CORRUPTION LEVEL 3
    // =====================================================

    safePlayAudio(
        endingGlitchStrong,
        0.84
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingElectrical,
                0.38
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
            0.09;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.09;

    }


    await wait(
        900
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
            0.115;

    }


    if (endingStatic) {

        endingStatic.volume =
            0.11;

    }


    await wait(
        700
    );


    // =====================================================
    // JUMPSCARE
    // =====================================================

    /*
        Después del colapso dejamos una
        falsa pausa antes de mostrar
        la entidad.
    */

    await playJumpscare();


    // =====================================================
    // FINAL WHITEOUT
    // =====================================================

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


    prepareJumpscare();


    runDenyEnding();

}


// =========================================================
// START
// =========================================================

initDenyEnding();