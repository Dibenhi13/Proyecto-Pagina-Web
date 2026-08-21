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

const collapseAmbience =
    document.querySelector(
        "#collapse-ambience"
    );

const collapseImpact =
    document.querySelector(
        "#collapse-impact"
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
        Scene 07 acaba de romperse.

        Scene 08 entra inmediatamente,
        pero todavía con capas parciales.
    */

    await wait(
        400
    );


    // -----------------------------------------------------
    // AMBIENTE
    // -----------------------------------------------------

    if (
        collapseAmbience
    ) {

        collapseAmbience.volume =
            0.34;


        collapseAmbience
            .play()
            .catch(
                () => {}
            );

    }


    // -----------------------------------------------------
    // PRIMERA CAPA
    // -----------------------------------------------------

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

    window.Scene08Animations
        .showGhostUI();


    await wait(
        700
    );


    // -----------------------------------------------------
    // SEGUNDA CAPA
    // -----------------------------------------------------

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

    window.Scene08Animations
        .showGhostMessages();


    await wait(
        750
    );


    // -----------------------------------------------------
    // TERCERA CAPA
    // -----------------------------------------------------

    window.Scene08Animations
        .setCollapseLevel(3);


    await window.Scene08Animations
        .revealFragmentGroup(
            11,
            16
        );


    /*
        Aquí los textos ya empiezan
        a teletransportarse.
    */

    window.Scene08Animations
        .enableFragmentTeleporting();


    await wait(
        1100
    );


    // -----------------------------------------------------
    // FRAGMENTOS TRUNCADOS
    // -----------------------------------------------------

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

    window.Scene08Animations
        .setCollapseLevel(4);


    safePlayAudio(
        collapseImpact
    );


    await wait(
        1800
    );


    // -----------------------------------------------------
    // BORRADO PROGRESIVO
    // -----------------------------------------------------

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


    if (
        collapseAmbience
    ) {

        const fadeAudio =
            setInterval(
                () => {

                    collapseAmbience.volume =
                        Math.max(
                            0,
                            collapseAmbience.volume -
                            0.04
                        );


                    if (
                        collapseAmbience.volume <= 0
                    ) {

                        clearInterval(
                            fadeAudio
                        );


                        collapseAmbience.pause();

                    }

                },

                50
            );

    }


    await window.Scene08Animations
        .playScene09Transition();


    window.location.href =
        "../scene-09/scene-09.html";

}


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