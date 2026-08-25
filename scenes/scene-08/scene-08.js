// =========================================================
// ESCENA 08 — LÓGICA
// Total Uncertainty / System Collapse
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS
// =========================================================

const floatingFragments =
    document.querySelectorAll(
        ".floating-fragment"
    );

const finalFragment =
    document.querySelector(
        "#final-fragment"
    );

const finalFragmentText =
    document.querySelector(
        "#final-fragment-text"
    );


// =========================================================
// AUDIO — SFX
// =========================================================

const scene08StaticLoop =
    document.querySelector(
        "#scene-08-static-loop"
    );

const scene08GlitchMedium =
    document.querySelector(
        "#scene-08-glitch-medium"
    );

const scene08GlitchStrong =
    document.querySelector(
        "#scene-08-glitch-strong"
    );

const scene08DeepRumble =
    document.querySelector(
        "#scene-08-deep-rumble"
    );

const scene08Electrical =
    document.querySelector(
        "#scene-08-electrical"
    );

const scene08SignalLost =
    document.querySelector(
        "#scene-08-signal-lost"
    );

const scene08LowImpact =
    document.querySelector(
        "#scene-08-low-impact"
    );


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let sceneEnding = false;


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

        fragments: {

            playback:
                "Playback corrupted",

            signal:
                "Signal lost",

            outside:
                "You are not outside the system",

            hear:
                "Did you hear that?",

            identity:
                "Identity mismatch",

            access:
                "Access denied",

            inside:
                "No... that was inside.",

            audio:
                "Audio file",

            corruption:
                "Data corruption spreading",

            recovered:
                "Recovered successfully",

            move:
                "I saw it move",

            "signal-02":
                "Signal lost",

            "playback-02":
                "Playback corrupted",

            input:
                "Input detected",

            crew:
                "Where is the crew?",

            reconnect:
                "Reconnecting...",

            "broken-01":
                "Iden—",

            "broken-02":
                "Signal lo—",

            "broken-03":
                "No... that was—",

            "broken-04":
                "Audio fi—",

            "broken-05":
                "Recovered suc—"

        },

        final:
            "SYSTEM STATE UNRESOLVED"

    },


    es: {

        fragments: {

            playback:
                "Reproducción corrompida",

            signal:
                "Señal perdida",

            outside:
                "No estás fuera del sistema",

            hear:
                "¿Escuchaste eso?",

            identity:
                "Identidad no coincide",

            access:
                "Acceso denegado",

            inside:
                "No... eso estaba dentro.",

            audio:
                "Archivo de audio",

            corruption:
                "Corrupción de datos expandiéndose",

            recovered:
                "Recuperado exitosamente",

            move:
                "Lo vi moverse",

            "signal-02":
                "Señal perdida",

            "playback-02":
                "Reproducción corrompida",

            input:
                "Entrada detectada",

            crew:
                "¿Dónde está la tripulación?",

            reconnect:
                "Reconectando...",

            "broken-01":
                "Identi—",

            "broken-02":
                "Señal per—",

            "broken-03":
                "No... eso estaba—",

            "broken-04":
                "Archivo de au—",

            "broken-05":
                "Recuperado exi—"

        },

        final:
            "ESTADO DEL SISTEMA SIN RESOLVER"

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
// FADE AUDIO
// =========================================================

function fadeAmbientAudio(
    audio,
    duration = 600
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
        14;

    let currentStep =
        0;

    const interval =
        duration / steps;


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

                }

            },

            interval
        );

}


// =========================================================
// AMBIENTE INICIAL
// =========================================================

function startScene08Ambience() {

    if (scene08StaticLoop) {

        scene08StaticLoop.volume =
            0.08;


        scene08StaticLoop
            .play()
            .catch(() => {});

    }


    if (scene08DeepRumble) {

        scene08DeepRumble.volume =
            0.04;


        scene08DeepRumble
            .play()
            .catch(() => {});

    }

}


// =========================================================
// DESBLOQUEAR AMBIENTE
// =========================================================

function unlockScene08Ambience() {

    if (
        scene08StaticLoop &&
        scene08StaticLoop.paused
    ) {

        scene08StaticLoop.volume =
            0.08;


        scene08StaticLoop
            .play()
            .catch(() => {});

    }


    if (
        scene08DeepRumble &&
        scene08DeepRumble.paused
    ) {

        scene08DeepRumble.volume =
            0.04;


        scene08DeepRumble
            .play()
            .catch(() => {});

    }

}


// =========================================================
// APLICAR TEXTO
// =========================================================

function applyLanguage() {

    const text =
        translations[
            currentLanguage
        ];


    floatingFragments.forEach(
        fragment => {

            const key =
                fragment.dataset.fragment;


            if (
                text.fragments[key]
            ) {

                fragment.textContent =
                    text.fragments[key];

            }

        }
    );


    finalFragmentText.textContent =
        text.final;

}


// =========================================================
// POSICIONES INICIALES
// =========================================================

function applyInitialPositions() {

    floatingFragments.forEach(
        fragment => {

            const x =
                fragment.dataset.x ||
                50;

            const y =
                fragment.dataset.y ||
                50;


            fragment.style.setProperty(
                "--fragment-x",
                x
            );


            fragment.style.setProperty(
                "--fragment-y",
                y
            );

        }
    );

}


// =========================================================
// SECUENCIA PRINCIPAL
// =========================================================

async function runCollapseSequence() {

    /*
        Scene 07 colapsó y entramos
        todavía con residuos del glitch.
    */

    await wait(
        400
    );


    // -----------------------------------------------------
    // AMBIENTE BASE
    // -----------------------------------------------------

    startScene08Ambience();


    // -----------------------------------------------------
    // PRIMERA CAPA
    // -----------------------------------------------------

    /*
        Primer nivel de contaminación.
        SFX sincronizado con setCollapseLevel(1).
    */

    safePlayAudio(
        scene08GlitchMedium,
        0.45
    );


    window.Scene08Animations
        .setCollapseLevel(1);


    await window.Scene08Animations
        .revealFragmentGroup(
            0,
            5
        );


    await wait(
        900
    );


    // -----------------------------------------------------
    // GHOST UI
    // -----------------------------------------------------

    safePlayAudio(
        scene08Electrical,
        0.2
    );


    window.Scene08Animations
        .showGhostUI();


    await wait(
        700
    );


    // -----------------------------------------------------
    // SEGUNDA CAPA
    // -----------------------------------------------------

    /*
        Subimos static y rumble.
    */

    if (scene08StaticLoop) {

        scene08StaticLoop.volume =
            0.1;

    }


    if (scene08DeepRumble) {

        scene08DeepRumble.volume =
            0.05;

    }


    safePlayAudio(
        scene08GlitchMedium,
        0.62
    );


    window.Scene08Animations
        .setCollapseLevel(2);


    await window.Scene08Animations
        .revealFragmentGroup(
            5,
            11
        );


    await wait(
        900
    );


    // -----------------------------------------------------
    // FRASES GRANDES RESIDUALES
    // -----------------------------------------------------

    safePlayAudio(
        scene08LowImpact,
        0.35
    );


    window.Scene08Animations
        .showGhostMessages();


    await wait(
        750
    );


    // -----------------------------------------------------
    // TERCERA CAPA
    // -----------------------------------------------------

    if (scene08StaticLoop) {

        scene08StaticLoop.volume =
            0.11;

    }


    if (scene08DeepRumble) {

        scene08DeepRumble.volume =
            0.06;

    }


    /*
        Aquí ya se siente el sistema
        verdaderamente contaminado.
    */

    safePlayAudio(
        scene08GlitchStrong,
        0.72
    );


    window.Scene08Animations
        .setCollapseLevel(3);


    await window.Scene08Animations
        .revealFragmentGroup(
            11,
            16
        );


    /*
        Desde aquí empiezan a saltar
        los fragmentos por la pantalla.
    */

    window.Scene08Animations
        .enableFragmentTeleporting();


    setTimeout(
        () => {

            safePlayAudio(
                scene08Electrical,
                0.26
            );

        },
        160
    );


    await wait(
        1100
    );


    // -----------------------------------------------------
    // FRAGMENTOS TRUNCADOS
    // -----------------------------------------------------

    safePlayAudio(
        scene08SignalLost,
        0.28
    );


    await window.Scene08Animations
        .revealFragmentGroup(
            16,
            floatingFragments.length
        );


    await wait(
        800
    );


    // -----------------------------------------------------
    // COLAPSO FUERTE
    // -----------------------------------------------------

    /*
        Pico de contaminación visual.
    */

    if (scene08StaticLoop) {

        scene08StaticLoop.volume =
            0.14;

    }


    if (scene08DeepRumble) {

        scene08DeepRumble.volume =
            0.08;

    }


    safePlayAudio(
        scene08LowImpact,
        0.65
    );


    safePlayAudio(
        scene08GlitchStrong,
        1
    );


    setTimeout(
        () => {

            safePlayAudio(
                scene08Electrical,
                0.42
            );

        },
        100
    );


    window.Scene08Animations
        .setCollapseLevel(4);


    await wait(
        1800
    );


    // -----------------------------------------------------
    // BORRADO PROGRESIVO
    // -----------------------------------------------------

    safePlayAudio(
        scene08SignalLost,
        0.42
    );


    await window.Scene08Animations
        .beginFragmentDecay();


    await wait(
        650
    );


    // -----------------------------------------------------
    // FRAGMENTO FINAL
    // -----------------------------------------------------

    finalFragment.setAttribute(
        "aria-hidden",
        "false"
    );


    if (scene08StaticLoop) {

        scene08StaticLoop.volume =
            0.16;

    }


    if (scene08DeepRumble) {

        scene08DeepRumble.volume =
            0.1;

    }


    safePlayAudio(
        scene08LowImpact,
        0.8
    );


    safePlayAudio(
        scene08GlitchStrong,
        0.9
    );


    await window.Scene08Animations
        .showFinalFragment();


    await wait(
        1250
    );


    // -----------------------------------------------------
    // SCENE 09
    // -----------------------------------------------------

    startScene09Transition();

}


// =========================================================
// TRANSICIÓN
// =========================================================

async function startScene09Transition() {

    if (
        sceneEnding
    ) {

        return;

    }


    sceneEnding =
        true;


    /*
        Último corte antes de la escena limpia.
    */

    safePlayAudio(
        scene08SignalLost,
        0.75
    );


    setTimeout(
        () => {

            safePlayAudio(
                scene08GlitchStrong,
                1
            );

        },
        70
    );


    setTimeout(
        () => {

            safePlayAudio(
                scene08Electrical,
                0.5
            );

        },
        120
    );


    fadeAmbientAudio(
        scene08StaticLoop,
        450
    );


    fadeAmbientAudio(
        scene08DeepRumble,
        500
    );


    await window.Scene08Animations
        .playScene09Transition();


    window.location.href =
        "../scene-09/scene-09.html";

}


// =========================================================
// PRIMERA INTERACCIÓN
// =========================================================

document.addEventListener(
    "pointerdown",

    unlockScene08Ambience,

    {
        once: true
    }
);


// =========================================================
// INIT
// =========================================================

async function initScene08() {

    applyLanguage();

    applyInitialPositions();


    window.Scene08Animations
        .init();


    await window.Scene08Animations
        .playSceneEntry();


    runCollapseSequence();

}


// =========================================================
// START
// =========================================================

initScene08();