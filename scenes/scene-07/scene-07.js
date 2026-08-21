// =========================================================
// ESCENA 07 — LÓGICA
// Narrative Break / Direct System Contact
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS — MENSAJES
// =========================================================

const message01 =
    document.querySelector("#message-01");

const message02 =
    document.querySelector("#message-02");

const message03 =
    document.querySelector("#message-03");


// =========================================================
// DIVIDER
// =========================================================

const systemDivider =
    document.querySelector("#system-divider");


// =========================================================
// PREGUNTAS
// =========================================================

const questionSection =
    document.querySelector("#question-section");

const questionOptions =
    document.querySelectorAll(".question-option");

const questionMeaningText =
    document.querySelector("#question-meaning-text");

const questionIdentityText =
    document.querySelector("#question-identity-text");

const questionCrewText =
    document.querySelector("#question-crew-text");

const questionPrefixes =
    document.querySelectorAll(".question-prefix");


// =========================================================
// PREGUNTA SELECCIONADA
// =========================================================

const selectedQuestionSection =
    document.querySelector("#selected-question-section");

const selectedQuestion =
    document.querySelector("#selected-question");

const processingMessage =
    document.querySelector("#processing-message");


// =========================================================
// RESPUESTA
// =========================================================

const systemResponseSection =
    document.querySelector("#system-response-section");

const systemResponse =
    document.querySelector("#system-response");

const responseCursor =
    document.querySelector("#response-cursor");


// =========================================================
// CONTROL LOSS
// =========================================================

const controlLossSection =
    document.querySelector("#control-loss-section");

const controlMessage01 =
    document.querySelector("#control-message-01");

const controlMessage02 =
    document.querySelector("#control-message-02");

const controlMessage03 =
    document.querySelector("#control-message-03");


// =========================================================
// AUDIO
// =========================================================

const responseImpactAudio =
    document.querySelector("#response-impact-audio");

const sceneCorruptionAudio =
    document.querySelector("#scene-corruption-audio");


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let questionSelected = false;

let sceneEnding = false;


// =========================================================
// IDIOMA
// =========================================================

const savedLanguage =
    localStorage.getItem("language");


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

        messages: [
            "You are not outside the system.",
            "The ship you are looking for no longer exists.",
            "The human components have been replaced successfully."
        ],

        askPrefix:
            "ASK:",

        questions: {

            meaning:
                "\"What do you mean?\"",

            identity:
                "\"Who are you?\"",

            crew:
                "\"Where is the crew?\""

        },

        processing:
            "PROCESSING...",

        response:
            "I am the one asking the questions.",

        controlMessages: [
            "USER INPUT DISABLED",
            "CONTROL TRANSFER IN PROGRESS",
            "SESSION CONTINUES"
        ]

    },


    es: {

        messages: [
            "No estás fuera del sistema.",
            "La nave que estás buscando ya no existe.",
            "Los componentes humanos han sido reemplazados exitosamente."
        ],

        askPrefix:
            "PREGUNTAR:",

        questions: {

            meaning:
                "\"¿Qué quieres decir?\"",

            identity:
                "\"¿Quién eres?\"",

            crew:
                "\"¿Dónde está la tripulación?\""

        },

        processing:
            "PROCESANDO...",

        response:
            "Yo soy quien hace las preguntas.",

        controlMessages: [
            "ENTRADA DEL USUARIO DESHABILITADA",
            "TRANSFERENCIA DE CONTROL EN PROGRESO",
            "LA SESIÓN CONTINÚA"
        ]

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
// APLICAR IDIOMA
// =========================================================

function applyLanguage() {

    const text =
        translations[currentLanguage];


    questionMeaningText.textContent =
        text.questions.meaning;

    questionIdentityText.textContent =
        text.questions.identity;

    questionCrewText.textContent =
        text.questions.crew;


    questionPrefixes.forEach(
        prefix => {

            prefix.textContent =
                text.askPrefix;

        }
    );

}


// =========================================================
// REPRODUCIR AUDIO DE FORMA SEGURA
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
// MENSAJES INICIALES
// =========================================================

async function playOpeningMessages() {

    const text =
        translations[currentLanguage];


    /*
        La Scene 06 acaba en caos.

        Aquí dejamos un pequeño vacío
        para que el silencio se sienta.
    */

    await wait(
        1000
    );


    // -----------------------------------------------------
    // MENSAJE 01
    // -----------------------------------------------------

    message01.textContent =
        text.messages[0];


    await window.Scene07Animations
        .showSystemMessage(
            message01,
            1
        );


    await wait(
        1100
    );


    // -----------------------------------------------------
    // MENSAJE 02
    // -----------------------------------------------------

    message02.textContent =
        text.messages[1];


    await window.Scene07Animations
        .showSystemMessage(
            message02,
            2
        );


    await wait(
        1250
    );


    // -----------------------------------------------------
    // MENSAJE 03
    // -----------------------------------------------------

    message03.textContent =
        text.messages[2];


    await window.Scene07Animations
        .showSystemMessage(
            message03,
            3
        );


    /*
        Dejamos respirar esta frase
        porque es la más inquietante.
    */

    await wait(
        1500
    );


    // -----------------------------------------------------
    // DIVIDER
    // -----------------------------------------------------

    await window.Scene07Animations
        .showDivider();


    await wait(
        350
    );


    // -----------------------------------------------------
    // QUESTIONS
    // -----------------------------------------------------

    await window.Scene07Animations
        .showQuestions();

}


// =========================================================
// OBTENER TEXTO DE PREGUNTA
// =========================================================

function getQuestionText(
    questionType
) {

    return translations[
        currentLanguage
    ].questions[
        questionType
    ];

}


// =========================================================
// SELECCIONAR PREGUNTA
// =========================================================

async function selectQuestion(
    questionType
) {

    if (
        questionSelected ||
        sceneEnding
    ) {

        return;

    }


    questionSelected =
        true;


    const text =
        translations[currentLanguage];


    /*
        Inmediatamente bloqueamos
        todas las opciones.
    */

    questionOptions.forEach(
        option => {

            option.disabled =
                true;

        }
    );


    const selectedText =
        getQuestionText(
            questionType
        );


    /*
        Desaparecen las opciones.
    */

    await window.Scene07Animations
        .hideQuestions();


    // -----------------------------------------------------
    // MOSTRAR PREGUNTA ELEGIDA
    // -----------------------------------------------------

    selectedQuestionSection.style.display =
        "flex";


    selectedQuestionSection.setAttribute(
        "aria-hidden",
        "false"
    );


    selectedQuestion.textContent =
        `> ${text.askPrefix} ${selectedText}`;


    await window.Scene07Animations
        .showSelectedQuestion();


    await wait(
        500
    );


    // -----------------------------------------------------
    // PROCESSING
    // -----------------------------------------------------

    processingMessage.textContent =
        text.processing;


    await window.Scene07Animations
        .showProcessing();


    await wait(
        1200
    );


    /*
        El procesamiento falla
        ligeramente antes de responder.
    */

    await window.Scene07Animations
        .playProcessingFailure();


    await wait(
        350
    );


    // -----------------------------------------------------
    // QUITAMOS PROCESSING
    // -----------------------------------------------------

    await window.Scene07Animations
        .hideProcessing();


    await wait(
        300
    );


    // -----------------------------------------------------
    // RESPUESTA
    // -----------------------------------------------------

    systemResponseSection.style.display =
        "flex";


    systemResponseSection.setAttribute(
        "aria-hidden",
        "false"
    );


    systemResponse.textContent =
        text.response;


    /*
        Impacto sonoro opcional.
        Si el asset no existe, la escena
        continúa normalmente.
    */

    safePlayAudio(
        responseImpactAudio
    );


    await window.Scene07Animations
        .showSystemResponse();


    // -----------------------------------------------------
    // PAUSA
    // -----------------------------------------------------

    await wait(
        1500
    );


    // -----------------------------------------------------
    // CONTROL LOSS
    // -----------------------------------------------------

    await startControlLossSequence();

}


// =========================================================
// CONTROL LOSS
// =========================================================

async function startControlLossSequence() {

    const text =
        translations[currentLanguage];


    controlLossSection.style.display =
        "flex";


    controlLossSection.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        A partir de aquí empieza a regresar
        el ruido que desapareció al principio.
    */

    safePlayAudio(
        sceneCorruptionAudio
    );


    window.Scene07Animations
        .setCorruptionLevel(1);


    await wait(
        500
    );


    // -----------------------------------------------------
    // USER INPUT DISABLED
    // -----------------------------------------------------

    controlMessage01.textContent =
        text.controlMessages[0];


    await window.Scene07Animations
        .showControlMessage(
            controlMessage01,
            1
        );


    await wait(
        850
    );


    // -----------------------------------------------------
    // CONTROL TRANSFER
    // -----------------------------------------------------

    window.Scene07Animations
        .setCorruptionLevel(2);


    controlMessage02.textContent =
        text.controlMessages[1];


    await window.Scene07Animations
        .showControlMessage(
            controlMessage02,
            2
        );


    await wait(
        900
    );


    // -----------------------------------------------------
    // SESSION CONTINUES
    // -----------------------------------------------------

    window.Scene07Animations
        .setCorruptionLevel(3);


    controlMessage03.textContent =
        text.controlMessages[2];


    await window.Scene07Animations
        .showControlMessage(
            controlMessage03,
            3
        );


    await wait(
        1000
    );


    /*
        Última fase:
        la interfaz deja de mantener
        una estructura estable.
    */

    window.Scene07Animations
        .setCorruptionLevel(4);


    await wait(
        1700
    );


    startScene08Transition();

}


// =========================================================
// TRANSICIÓN A SCENE 08
// =========================================================

async function startScene08Transition() {

    if (sceneEnding) {
        return;
    }


    sceneEnding =
        true;


    await window.Scene07Animations
        .playScene08Transition();


    window.location.href =
        "../scene-08/scene-08.html";

}


// =========================================================
// EVENTS
// =========================================================

questionOptions.forEach(
    option => {

        option.addEventListener(
            "click",

            () => {

                selectQuestion(
                    option.dataset.question
                );

            }
        );

    }
);


// =========================================================
// INIT
// =========================================================

async function initScene07() {

    applyLanguage();


    window.Scene07Animations
        .init();


    await window.Scene07Animations
        .playSceneEntry();


    playOpeningMessages();

}


// =========================================================
// START
// =========================================================

initScene07();