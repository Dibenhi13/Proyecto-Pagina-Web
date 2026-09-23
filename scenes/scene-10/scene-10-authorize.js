// =========================================================
// SCENE 10 — AUTHORIZE ENDING
// Connection / Transfer
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

        dockingAuthorized:
            "DOCKING AUTHORIZED.",

        connectionEstablished:
            "CONNECTION ESTABLISHED.",

        crewCount:
            "CREW COUNT: 0",

        externalHost:
            "EXTERNAL HOST DETECTED: 1",

        transferComplete:
            "TRANSFER COMPLETE.",

        finalMessage:
            "YOU WERE NEVER OBSERVING THE SHIP."

    },


    es: {

        dockingAuthorized:
            "ACOPLAMIENTO AUTORIZADO.",

        connectionEstablished:
            "CONEXIÓN ESTABLECIDA.",

        crewCount:
            "TRIPULACIÓN ACTIVA: 0",

        externalHost:
            "HOST EXTERNO DETECTADO: 1",

        transferComplete:
            "TRANSFERENCIA COMPLETA.",

        finalMessage:
            "NUNCA ESTUVISTE OBSERVANDO LA NAVE."

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

        El usuario permitió la conexión,
        así que todo debe parecer estable
        durante los primeros segundos.
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
// CHANGE AUTHORIZE MESSAGE
// =========================================================

async function showAuthorizeText(
    text,
    hold = 1200,
    glitch = false
) {

    await gsap.to(
        authorizeMessage,
        {
            opacity: 0,
            y: -4,
            filter: glitch
                ? "blur(2px)"
                : "blur(0px)",
            duration: 0.18,
            ease: "power1.out"
        }
    );


    authorizeMessage.textContent =
        text;


    await gsap.fromTo(
        authorizeMessage,

        {
            opacity: 0,
            y: 5,
            filter: glitch
                ? "blur(2px)"
                : "blur(0px)"
        },

        {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power1.out"
        }
    );


    await wait(
        hold
    );

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
        Usamos el video muteado y dejamos
        el impacto sonoro en manos de los SFX.
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

    /*
        AUTHORIZE debe sentirse un poco
        más tranquilo antes del susto.

        La transferencia ya terminó y
        parece que todo se estabilizó.
    */

    await wait(
        1100
    );


    // =====================================================
    // MOSTRAR VIDEO
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
    // PLAY
    // =====================================================

    jumpscareVideo
        .play()
        .catch(() => {});


    /*
        Esperamos al final real del video.

        El timeout evita que la escena
        se quede detenida si falla "ended".
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

async function runAuthorizeEnding() {

    if (
        endingStarted
    ) {

        return;

    }


    endingStarted =
        true;


    const text =
        translations[
            currentLanguage
        ];


    // =====================================================
    // INITIAL SILENCE
    // =====================================================

    await wait(
        700
    );


    // =====================================================
    // AMBIENCE
    // =====================================================

    startEndingAmbience();


    // =====================================================
    // FRAME APPEARS
    // =====================================================

    await window.Scene10Animations
        .playSceneEntry();


    await wait(
        600
    );


    // =====================================================
    // DOCKING AUTHORIZED
    // =====================================================

    authorizeMessage.textContent =
        text.dockingAuthorized;


    safePlayAudio(
        endingLowImpact,
        0.28
    );


    await window.Scene10Animations
        .showAuthorizeMessage();


    await wait(
        1700
    );


    // =====================================================
    // CONNECTION ESTABLISHED
    // =====================================================

    await showAuthorizeText(
        text.connectionEstablished,
        1400
    );


    // =====================================================
    // CREW COUNT: 0
    // =====================================================

    safePlayAudio(
        endingGlitchMedium,
        0.25
    );


    await showAuthorizeText(
        text.crewCount,
        1500,
        true
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
            0.02;


        endingStatic
            .play()
            .catch(() => {});

    }


    if (endingRumble) {

        endingRumble.volume =
            0.018;


        endingRumble
            .play()
            .catch(() => {});

    }


    await wait(
        500
    );


    // =====================================================
    // EXTERNAL HOST DETECTED
    // =====================================================

    safePlayAudio(
        endingElectrical,
        0.25
    );


    await showAuthorizeText(
        text.externalHost,
        1700,
        true
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
            0.04;

    }


    await wait(
        550
    );


    // =====================================================
    // TRANSFER COMPLETE
    // =====================================================

    safePlayAudio(
        endingLowImpact,
        0.58
    );


    await showAuthorizeText(
        text.transferComplete,
        1600,
        true
    );


    // =====================================================
    // CORRUPTION LEVEL 3
    // =====================================================

    safePlayAudio(
        endingGlitchStrong,
        0.72
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingElectrical,
                0.3
            );

        },
        90
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
            0.065;

    }


    await wait(
        700
    );


    // =====================================================
    // FINAL MESSAGE
    // =====================================================

    safePlayAudio(
        endingLowImpact,
        0.82
    );


    setTimeout(
        () => {

            safePlayAudio(
                endingGlitchStrong,
                0.65
            );

        },
        110
    );


    await showAuthorizeText(
        text.finalMessage,
        2300,
        true
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
            0.1;

    }


    await wait(
        700
    );


    // =====================================================
    // JUMPSCARE
    // =====================================================

    /*
        El usuario ya aceptó la conexión.

        La transferencia termina, parece
        que todo se estabiliza y después
        aparece la entidad.
    */

    await playJumpscare();


    // =====================================================
    // FINAL WHITEOUT
    // =====================================================

    safePlayAudio(
        endingWhiteoutRiser,
        0.85
    );


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


    prepareJumpscare();


    runAuthorizeEnding();

}


// =========================================================
// START
// =========================================================

initAuthorizeEnding();