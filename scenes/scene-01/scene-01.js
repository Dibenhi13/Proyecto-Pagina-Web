// =========================================================
// ESCENA 01 — LÓGICA
// Incoming Transmission
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS DEL DOM
// =========================================================

const lineIncoming =
    document.querySelector(
        "#line-incoming .typed-text"
    );

const lineVessel =
    document.querySelector(
        "#line-vessel .typed-text"
    );

const lineOrigin =
    document.querySelector(
        "#line-origin .typed-text"
    );

const lineRegistered =
    document.querySelector(
        "#line-registered .typed-text"
    );

const lineCrew =
    document.querySelector(
        "#line-crew .typed-text"
    );

const lineAwaiting =
    document.querySelector(
        "#line-awaiting .typed-text"
    );


const acceptButton =
    document.querySelector(
        "#accept-transmission"
    );


const acceptText =
    document.querySelector(
        "#accept-text"
    );


// =========================================================
// MOSTRAR TEXTO COMPLETO
// =========================================================

const showFullTextButton =
    document.querySelector(
        "#show-full-text"
    );


const showFullTextLabel =
    document.querySelector(
        "#show-full-text-label"
    );


const skipTextContainer =
    document.querySelector(
        "#skip-text-container"
    );


// =========================================================
// AUDIO
// =========================================================

const scene01Hum =
    document.querySelector(
        "#scene-01-hum"
    );


const scene01Keyboard =
    document.querySelector(
        "#scene-01-keyboard"
    );


const scene01Confirm =
    document.querySelector(
        "#scene-01-confirm"
    );


const scene01Glitch =
    document.querySelector(
        "#scene-01-glitch"
    );


// =========================================================
// ESTADO GENERAL
// =========================================================

let currentLanguage =
    "en";


let sequenceFinished =
    false;


let transitionStarted =
    false;


/*
    Se activa cuando el usuario presiona
    SHOW FULL TEXT.

    Esto permite detener tanto el typewriter
    como las pausas narrativas restantes.
*/

let skipRequested =
    false;


// =========================================================
// TEXTOS
// =========================================================

const translations = {

    en: {

        incoming:
            "Incoming transmission...",

        vessel:
            "Unidentified vessel requesting access...",

        origin:
            "Signal origin: Unknown",

        registered:
            "Last registered: 30 years ago",

        crew:
            "No record of current crew...",

        awaiting:
            "Awaiting operator response...",

        showFullText:
            "SHOW FULL TEXT",

        accept:
            "ACCEPT TRANSMISSION",

        accepted:
            "TRANSMISSION ACCEPTED"

    },


    es: {

        incoming:
            "Transmisión entrante...",

        vessel:
            "Nave no identificada solicitando acceso...",

        origin:
            "Origen de la señal: Desconocido",

        registered:
            "Último registro: hace 30 años",

        crew:
            "No existe registro de la tripulación actual...",

        awaiting:
            "Esperando respuesta del operador...",

        showFullText:
            "MOSTRAR TEXTO COMPLETO",

        accept:
            "ACEPTAR TRANSMISIÓN",

        accepted:
            "TRANSMISIÓN ACEPTADA"

    }

};


// =========================================================
// OBTENER IDIOMA DEL INDEX
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
// ACTUALIZAR BOTONES
// =========================================================

function updateButtonLanguage() {

    acceptText.textContent =
        translations[
            currentLanguage
        ].accept;


    if (
        showFullTextLabel
    ) {

        showFullTextLabel.textContent =
            translations[
                currentLanguage
            ].showFullText;

    }

}


updateButtonLanguage();


// =========================================================
// UTILIDAD — ESPERAR
// =========================================================

function wait(
    milliseconds
) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


// =========================================================
// ESPERA INTERRUMPIBLE
// =========================================================

async function waitUnlessSkipped(
    milliseconds
) {

    const step =
        40;


    let elapsed =
        0;


    while (
        elapsed <
        milliseconds
    ) {

        if (
            skipRequested
        ) {

            return false;

        }


        const remaining =
            milliseconds -
            elapsed;


        const delay =
            Math.min(
                step,
                remaining
            );


        await wait(
            delay
        );


        elapsed +=
            delay;

    }


    return true;

}


// =========================================================
// AUDIO SEGURO
// =========================================================

function safePlayAudio(
    audio,
    volume = 1
) {

    if (!audio) {

        return;

    }


    audio.volume =
        volume;


    audio
        .play()
        .catch(
            () => {}
        );

}


// =========================================================
// HUM AMBIENTAL
// =========================================================

function startAmbientHum() {

    if (!scene01Hum) {

        return;

    }


    scene01Hum.volume =
        0.07;


    scene01Hum
        .play()
        .catch(
            () => {}
        );

}


// =========================================================
// DESBLOQUEAR HUM
// =========================================================

function unlockAmbientHum() {

    if (
        !scene01Hum ||
        !scene01Hum.paused
    ) {

        return;

    }


    scene01Hum.volume =
        0.07;


    scene01Hum
        .play()
        .catch(
            () => {}
        );

}


// =========================================================
// TECLADO
// =========================================================

function startKeyboardSound() {

    if (
        !scene01Keyboard ||
        skipRequested
    ) {

        return;

    }


    scene01Keyboard.currentTime =
        0;


    scene01Keyboard.volume =
        0.16;


    scene01Keyboard
        .play()
        .catch(
            () => {}
        );

}


function stopKeyboardSound() {

    if (!scene01Keyboard) {

        return;

    }


    scene01Keyboard.pause();


    scene01Keyboard.currentTime =
        0;

}


// =========================================================
// FADE DEL HUM
// =========================================================

function fadeHumOut(
    duration = 400
) {

    if (
        !scene01Hum ||
        scene01Hum.paused
    ) {

        return;

    }


    const startVolume =
        scene01Hum.volume;


    const steps =
        12;


    const interval =
        duration /
        steps;


    let currentStep =
        0;


    const fade =
        setInterval(
            () => {

                currentStep++;


                scene01Hum.volume =
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


                    scene01Hum.pause();

                }

            },

            interval
        );

}


// =========================================================
// OCULTAR TODOS LOS CURSORES
// =========================================================

function hideAllCursors() {

    document
        .querySelectorAll(
            ".terminal-cursor"
        )
        .forEach(
            cursor => {

                if (
                    window.Scene01Animations
                ) {

                    window.Scene01Animations
                        .hideCursor(
                            cursor
                        );

                } else {

                    cursor.style.opacity =
                        "0";

                }

            }
        );

}


// =========================================================
// TYPEWRITER
// =========================================================

async function typeText(
    element,
    text,
    options = {}
) {

    const {
        minSpeed = 22,
        maxSpeed = 52
    } = options;


    /*
        Si ya se pidió mostrar todo,
        no iniciamos otra animación.
    */

    if (
        skipRequested
    ) {

        element.textContent =
            text;

        return;

    }


    element.textContent =
        "";


    const line =
        element.closest(
            ".terminal-line"
        );


    const cursor =
        line.querySelector(
            ".terminal-cursor"
        );


    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .showCursor(
                cursor
            );

    }


    // -----------------------------------------------------
    // EMPIEZA EL SONIDO DE TECLADO
    // -----------------------------------------------------

    startKeyboardSound();


    // -----------------------------------------------------
    // ESCRITURA
    // -----------------------------------------------------

    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        /*
            Si el usuario presiona SHOW FULL TEXT
            durante esta misma línea, completamos
            la línea instantáneamente.
        */

        if (
            skipRequested
        ) {

            element.textContent =
                text;

            break;

        }


        element.textContent +=
            text[i];


        let delay =
            randomBetween(
                minSpeed,
                maxSpeed
            );


        if (
            text[i] === "." ||
            text[i] === ":" ||
            text[i] === ","
        ) {

            delay +=
                55;

        }


        const continued =
            await waitUnlessSkipped(
                delay
            );


        if (
            !continued
        ) {

            element.textContent =
                text;

            break;

        }

    }


    stopKeyboardSound();


    if (
        skipRequested
    ) {

        if (
            window.Scene01Animations
        ) {

            window.Scene01Animations
                .hideCursor(
                    cursor
                );

        }

        return;

    }


    await waitUnlessSkipped(
        120
    );


    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .hideCursor(
                cursor
            );

    }

}


// =========================================================
// NÚMERO ALEATORIO
// =========================================================

function randomBetween(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (
            max -
            min +
            1
        )
    ) + min;

}


// =========================================================
// TERMINAR SECUENCIA
// =========================================================

function finishTerminalSequence() {

    if (
        sequenceFinished
    ) {

        return;

    }


    sequenceFinished =
        true;


    acceptButton.disabled =
        false;


    if (
        skipTextContainer
    ) {

        skipTextContainer
            .classList
            .add(
                "is-hidden"
            );

    }


    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .showAcceptButton();

    }

}


// =========================================================
// MOSTRAR TODO EL TEXTO
// =========================================================

function showFullTerminalText() {

    if (
        sequenceFinished ||
        transitionStarted
    ) {

        return;

    }


    // -----------------------------------------------------
    // DETENER SECUENCIA
    // -----------------------------------------------------

    skipRequested =
        true;


    stopKeyboardSound();


    // -----------------------------------------------------
    // MOSTRAR TODAS LAS LÍNEAS
    // -----------------------------------------------------

    const text =
        translations[
            currentLanguage
        ];


    lineIncoming.textContent =
        text.incoming;


    lineVessel.textContent =
        text.vessel;


    lineOrigin.textContent =
        text.origin;


    lineRegistered.textContent =
        text.registered;


    lineCrew.textContent =
        text.crew;


    lineAwaiting.textContent =
        text.awaiting;


    // -----------------------------------------------------
    // OCULTAR CURSORES
    // -----------------------------------------------------

    hideAllCursors();


    // -----------------------------------------------------
    // HABILITAR ACCEPT
    // -----------------------------------------------------

    finishTerminalSequence();

}


// =========================================================
// SECUENCIA COMPLETA DE MENSAJES
// =========================================================

async function playTerminalSequence() {

    // -----------------------------------------------------
    // PANTALLA NEGRA
    // -----------------------------------------------------

    const initialWait =
        await waitUnlessSkipped(
            700
        );


    if (
        !initialWait ||
        skipRequested
    ) {

        showFullTerminalText();

        return;

    }


    // -----------------------------------------------------
    // FRAME
    // -----------------------------------------------------

    if (
        window.Scene01Animations
    ) {

        await window.Scene01Animations
            .drawTerminalFrame();

    }


    if (
        skipRequested
    ) {

        showFullTerminalText();

        return;

    }


    const frameWait =
        await waitUnlessSkipped(
            350
        );


    if (
        !frameWait ||
        skipRequested
    ) {

        showFullTerminalText();

        return;

    }


    // -----------------------------------------------------
    // INCOMING TRANSMISSION
    // -----------------------------------------------------

    await typeText(
        lineIncoming,
        translations[
            currentLanguage
        ].incoming,
        {
            minSpeed: 28,
            maxSpeed: 60
        }
    );


    if (
        skipRequested
    ) {

        return;

    }


    if (
        !await waitUnlessSkipped(
            550
        )
    ) {

        return;

    }


    // -----------------------------------------------------
    // UNIDENTIFIED VESSEL
    // -----------------------------------------------------

    await typeText(
        lineVessel,
        translations[
            currentLanguage
        ].vessel,
        {
            minSpeed: 24,
            maxSpeed: 52
        }
    );


    if (
        skipRequested
    ) {

        return;

    }


    if (
        !await waitUnlessSkipped(
            650
        )
    ) {

        return;

    }


    // -----------------------------------------------------
    // SIGNAL ORIGIN
    // -----------------------------------------------------

    await typeText(
        lineOrigin,
        translations[
            currentLanguage
        ].origin,
        {
            minSpeed: 24,
            maxSpeed: 48
        }
    );


    if (
        skipRequested
    ) {

        return;

    }


    if (
        !await waitUnlessSkipped(
            180
        )
    ) {

        return;

    }


    // -----------------------------------------------------
    // LAST REGISTERED
    // -----------------------------------------------------

    await typeText(
        lineRegistered,
        translations[
            currentLanguage
        ].registered,
        {
            minSpeed: 27,
            maxSpeed: 55
        }
    );


    if (
        skipRequested
    ) {

        return;

    }


    /*
        Pausa narrativa importante.

        Si el usuario quiere conservar
        el ritmo, esperamos normalmente.

        Si presiona SHOW FULL TEXT,
        la espera termina inmediatamente.
    */

    if (
        !await waitUnlessSkipped(
            2300
        )
    ) {

        return;

    }


    // -----------------------------------------------------
    // NO RECORD OF CURRENT CREW
    // -----------------------------------------------------

    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .subtleSystemFlicker();

    }


    await typeText(
        lineCrew,
        translations[
            currentLanguage
        ].crew,
        {
            minSpeed: 30,
            maxSpeed: 65
        }
    );


    if (
        skipRequested
    ) {

        return;

    }


    if (
        !await waitUnlessSkipped(
            1100
        )
    ) {

        return;

    }


    // -----------------------------------------------------
    // AWAITING OPERATOR RESPONSE
    // -----------------------------------------------------

    await typeText(
        lineAwaiting,
        translations[
            currentLanguage
        ].awaiting,
        {
            minSpeed: 25,
            maxSpeed: 52
        }
    );


    if (
        skipRequested
    ) {

        return;

    }


    if (
        !await waitUnlessSkipped(
            650
        )
    ) {

        return;

    }


    // -----------------------------------------------------
    // MOSTRAR ACCEPT
    // -----------------------------------------------------

    finishTerminalSequence();

}


// =========================================================
// CLICK — SHOW FULL TEXT
// =========================================================

if (
    showFullTextButton
) {

    showFullTextButton.addEventListener(
        "click",
        showFullTerminalText
    );

}


// =========================================================
// CLICK EN ACCEPT TRANSMISSION
// =========================================================

function acceptTransmission() {

    if (
        !sequenceFinished ||
        transitionStarted
    ) {

        return;

    }


    transitionStarted =
        true;


    acceptButton.disabled =
        true;


    // -----------------------------------------------------
    // CONFIRMACIÓN
    // -----------------------------------------------------

    if (
        scene01Confirm
    ) {

        scene01Confirm.currentTime =
            0;

    }


    safePlayAudio(
        scene01Confirm,
        0.55
    );


    // -----------------------------------------------------
    // GLITCH
    // -----------------------------------------------------

    if (
        scene01Glitch
    ) {

        scene01Glitch.currentTime =
            0;

    }


    safePlayAudio(
        scene01Glitch,
        1
    );


    // -----------------------------------------------------
    // BAJAR HUM
    // -----------------------------------------------------

    fadeHumOut(
        450
    );


    // -----------------------------------------------------
    // CAMBIO DE TEXTO
    // -----------------------------------------------------

    acceptText.textContent =
        translations[
            currentLanguage
        ].accepted;


    // -----------------------------------------------------
    // TRANSICIÓN
    // -----------------------------------------------------

    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .playAcceptedTransition(
                goToNextScene
            );

    }

}


// =========================================================
// EVENTO DEL BOTÓN
// =========================================================

acceptButton.addEventListener(
    "click",
    acceptTransmission
);


// =========================================================
// PRIMERA INTERACCIÓN
// =========================================================

document.addEventListener(
    "pointerdown",
    unlockAmbientHum,
    {
        once: true
    }
);


// =========================================================
// SIGUIENTE ESCENA
// =========================================================

function goToNextScene() {

    window.location.href =
        "../scene-02/scene-02.html";

}


// =========================================================
// INICIAR ESCENA
// =========================================================

function initScene01() {

    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .init();

    }


    // Ambiente

    startAmbientHum();


    // Secuencia narrativa

    playTerminalSequence();

}


// =========================================================
// START
// =========================================================

initScene01();