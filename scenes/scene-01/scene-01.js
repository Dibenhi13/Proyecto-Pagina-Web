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

let currentLanguage = "en";

let sequenceFinished = false;

let transitionStarted = false;


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
// ACTUALIZAR BOTÓN
// =========================================================

function updateButtonLanguage() {

    acceptText.textContent =
        translations[
            currentLanguage
        ].accept;

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


    /*
        Lo mantenemos muy bajo.

        No debe competir con el teclado
        ni con la información de pantalla.
    */

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

    if (!scene01Keyboard) {
        return;
    }


    /*
        Reiniciamos el loop para que cada
        línea tenga un inicio ligeramente
        definido.
    */

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


    element.textContent =
        "";


    /*
        El cursor pertenece al <p>
        que contiene este .typed-text.
    */

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

        element.textContent +=
            text[i];


        /*
            Velocidad irregular para evitar
            un typewriter demasiado mecánico.
        */

        let delay =
            randomBetween(
                minSpeed,
                maxSpeed
            );


        /*
            Pequeña pausa adicional después
            de signos de puntuación.
        */

        if (
            text[i] === "." ||
            text[i] === ":" ||
            text[i] === ","
        ) {

            delay +=
                55;

        }


        await wait(
            delay
        );

    }


    // -----------------------------------------------------
    // TERMINA TECLADO
    // -----------------------------------------------------

    stopKeyboardSound();


    await wait(
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
// SECUENCIA COMPLETA DE MENSAJES
// =========================================================

async function playTerminalSequence() {

    /*
        Primero dejamos respirar
        la pantalla negra.
    */

    await wait(
        700
    );


    /*
        El frame aparece antes
        del texto.
    */

    if (
        window.Scene01Animations
    ) {

        await window.Scene01Animations
            .drawTerminalFrame();

    }


    await wait(
        350
    );


    // -----------------------------------------
    // Incoming transmission...
    // -----------------------------------------

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


    await wait(
        550
    );


    // -----------------------------------------
    // Unidentified vessel...
    // -----------------------------------------

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


    await wait(
        650
    );


    // -----------------------------------------
    // Signal origin...
    // -----------------------------------------

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


    await wait(
        180
    );


    // -----------------------------------------
    // Last registered...
    // -----------------------------------------

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


    /*
        Pausa narrativa importante.

        Dejamos que el usuario procese:
        "30 years ago".
    */

    await wait(
        2300
    );


    // -----------------------------------------
    // No record of current crew...
    // -----------------------------------------

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


    await wait(
        1100
    );


    // -----------------------------------------
    // Awaiting operator response...
    // -----------------------------------------

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


    await wait(
        650
    );


    // -----------------------------------------
    // MOSTRAR BOTÓN
    // -----------------------------------------

    sequenceFinished =
        true;


    acceptButton.disabled =
        false;


    if (
        window.Scene01Animations
    ) {

        window.Scene01Animations
            .showAcceptButton();

    }

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

    scene01Confirm.currentTime =
        0;


    safePlayAudio(
        scene01Confirm,
        0.55
    );


    // -----------------------------------------------------
    // GLITCH
    // -----------------------------------------------------

    scene01Glitch.currentTime =
        0;


    /*
        Lo dejamos bastante alto porque
        este glitch acompaña directamente
        el cambio de escena.
    */

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

/*
    Si el navegador no permitió el hum
    al cargar Scene 01, cualquier primera
    interacción puede desbloquearlo.
*/

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