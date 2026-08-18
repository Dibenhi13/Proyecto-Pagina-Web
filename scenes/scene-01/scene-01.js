// =========================================================
// ESCENA 01 — LÓGICA
// Incoming Transmission
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS DEL DOM
// =========================================================

const lineIncoming =
    document.querySelector("#line-incoming .typed-text");

const lineVessel =
    document.querySelector("#line-vessel .typed-text");

const lineOrigin =
    document.querySelector("#line-origin .typed-text");

const lineRegistered =
    document.querySelector("#line-registered .typed-text");

const lineCrew =
    document.querySelector("#line-crew .typed-text");

const lineAwaiting =
    document.querySelector("#line-awaiting .typed-text");


const acceptButton =
    document.querySelector("#accept-transmission");

const acceptText =
    document.querySelector("#accept-text");


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
    localStorage.getItem("language");


if (
    savedLanguage === "en" ||
    savedLanguage === "es"
) {

    currentLanguage = savedLanguage;

}


// Actualizar atributo lang

document.documentElement.lang =
    currentLanguage;


// =========================================================
// ACTUALIZAR BOTÓN
// =========================================================

function updateButtonLanguage() {

    acceptText.textContent =
        translations[currentLanguage].accept;

}


updateButtonLanguage();


// =========================================================
// UTILIDAD — ESPERAR
// =========================================================

function wait(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
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


    element.textContent = "";


    /*
        El cursor pertenece al <p>
        que contiene este .typed-text.
    */

    const line =
        element.closest(".terminal-line");


    const cursor =
        line.querySelector(".terminal-cursor");


    if (window.Scene01Animations) {

        window.Scene01Animations.showCursor(
            cursor
        );

    }


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
            Pequeña pausa adicional
            después de signos de puntuación.
        */

        if (
            text[i] === "." ||
            text[i] === ":" ||
            text[i] === ","
        ) {

            delay += 55;

        }


        await wait(delay);

    }


    await wait(120);


    if (window.Scene01Animations) {

        window.Scene01Animations.hideCursor(
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
        (max - min + 1)
    ) + min;

}


// =========================================================
// SECUENCIA COMPLETA DE MENSAJES
// =========================================================

async function playTerminalSequence() {

    /*
        Primero dejamos respirar la pantalla negra.
    */

    await wait(700);


    /*
        El frame aparece antes del texto.
    */

    if (window.Scene01Animations) {

        await window.Scene01Animations
            .drawTerminalFrame();

    }


    await wait(350);


    // -----------------------------------------
    // Incoming transmission...
    // -----------------------------------------

    await typeText(
        lineIncoming,
        translations[currentLanguage].incoming,
        {
            minSpeed: 28,
            maxSpeed: 60
        }
    );


    await wait(550);


    // -----------------------------------------
    // Unidentified vessel...
    // -----------------------------------------

    await typeText(
        lineVessel,
        translations[currentLanguage].vessel,
        {
            minSpeed: 24,
            maxSpeed: 52
        }
    );


    await wait(650);


    // -----------------------------------------
    // Signal origin...
    // -----------------------------------------

    await typeText(
        lineOrigin,
        translations[currentLanguage].origin,
        {
            minSpeed: 24,
            maxSpeed: 48
        }
    );


    await wait(180);


    // -----------------------------------------
    // Last registered...
    // -----------------------------------------

    await typeText(
        lineRegistered,
        translations[currentLanguage].registered,
        {
            minSpeed: 27,
            maxSpeed: 55
        }
    );


    /*
        Pausa narrativa importante.

        Aquí queremos que el usuario tenga
        tiempo de procesar "30 years ago".
    */

    await wait(2300);


    // -----------------------------------------
    // No record of current crew...
    // -----------------------------------------

    if (window.Scene01Animations) {

        window.Scene01Animations
            .subtleSystemFlicker();

    }


    await typeText(
        lineCrew,
        translations[currentLanguage].crew,
        {
            minSpeed: 30,
            maxSpeed: 65
        }
    );


    await wait(1100);


    // -----------------------------------------
    // Awaiting operator response...
    // -----------------------------------------

    await typeText(
        lineAwaiting,
        translations[currentLanguage].awaiting,
        {
            minSpeed: 25,
            maxSpeed: 52
        }
    );


    await wait(650);


    // -----------------------------------------
    // Mostrar botón
    // -----------------------------------------

    sequenceFinished = true;


    acceptButton.disabled = false;


    if (window.Scene01Animations) {

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


    transitionStarted = true;


    acceptButton.disabled = true;


    /*
        Cambiamos inmediatamente el texto.
    */

    acceptText.textContent =
        translations[currentLanguage].accepted;


    if (window.Scene01Animations) {

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
// SIGUIENTE ESCENA
// =========================================================

function goToNextScene() {

    window.location.href =
    "../scene-02/scene-02.html";

    console.log(
        "Transmission accepted. Ready for Scene 02."
    );

}


// =========================================================
// INICIAR ESCENA
// =========================================================

function initScene01() {

    if (window.Scene01Animations) {

        window.Scene01Animations.init();

    }


    playTerminalSequence();

}


initScene01();