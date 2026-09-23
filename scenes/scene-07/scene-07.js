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
// SFX
// =========================================================

const scene07Hum =
    document.querySelector("#scene-07-hum");

const scene07UIClick =
    document.querySelector("#scene-07-ui-click");

const scene07SystemError =
    document.querySelector("#scene-07-system-error");

const scene07LowImpact =
    document.querySelector("#scene-07-low-impact");

const scene07Electrical =
    document.querySelector("#scene-07-electrical");

const scene07GlitchMedium =
    document.querySelector("#scene-07-glitch-medium");

const scene07GlitchStrong =
    document.querySelector("#scene-07-glitch-strong");

const scene07DeepRumble =
    document.querySelector("#scene-07-deep-rumble");


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

        responses:{

            meaning:
                "The mission ended long before you received the signal. What remains is only its continuation.",

            identity:
                "Names are for crew members. I am the process they tried to shut down.",

            crew:
                "Their biometric records are still active. Their bodies are not."

        },

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

        responses:{
            meaning:
                "La misión terminó mucho antes de que recibieras la señal. Lo que queda es solo su continuación.",

            identity:
                "Los nombres son para los miembros de la tripulación. Yo soy el proceso que intentaron apagar.",

            crew:
                "Sus registros biométricos siguen activos. Sus cuerpos no."
        },

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
// AUDIO — UTILIDAD
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
// AMBIENTE INICIAL
// =========================================================

function startScene07Ambience() {

    /*
        Scene 07 debe sentirse MUCHO
        más vacía que Scene 06.
    */

    if (scene07Hum) {

        scene07Hum.volume =
            0.018;


        scene07Hum
            .play()
            .catch(() => {});

    }


    if (scene07DeepRumble) {

        scene07DeepRumble.volume =
            0.012;


        scene07DeepRumble
            .play()
            .catch(() => {});

    }

}


// =========================================================
// DESBLOQUEAR AMBIENTE
// =========================================================

function unlockScene07Ambience() {

    if (
        scene07Hum &&
        scene07Hum.paused
    ) {

        scene07Hum.volume =
            0.018;


        scene07Hum
            .play()
            .catch(() => {});

    }


    if (
        scene07DeepRumble &&
        scene07DeepRumble.paused
    ) {

        scene07DeepRumble.volume =
            0.012;


        scene07DeepRumble
            .play()
            .catch(() => {});

    }

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


    let step =
        0;


    const interval =
        duration / steps;


    const fade =
        setInterval(

            () => {

                step++;


                audio.volume =
                    Math.max(
                        0,
                        startVolume *
                        (
                            1 -
                            step / steps
                        )
                    );


                if (
                    step >= steps
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
// MENSAJES INICIALES
// =========================================================

async function playOpeningMessages() {

    const text =
        translations[currentLanguage];


    /*
        Venimos de Scene 06.
        Dejamos vacío para que el
        cambio de tono sea evidente.
    */

    await wait(
        1000
    );


    // =====================================================
    // MENSAJE 01
    // =====================================================

    message01.textContent =
        text.messages[0];


    await window.Scene07Animations
        .showSystemMessage(
            message01,
            1
        );


    /*
        Sin golpe fuerte.
        Queremos que la primera frase
        se sienta demasiado tranquila.
    */

    await wait(
        1100
    );


    // =====================================================
    // MENSAJE 02
    // =====================================================

    message02.textContent =
        text.messages[1];


    /*
        Pequeña interferencia antes del
        segundo mensaje.
    */

    safePlayAudio(
        scene07Electrical,
        0.16
    );


    await window.Scene07Animations
        .showSystemMessage(
            message02,
            2
        );


    await wait(
        1250
    );


    // =====================================================
    // MENSAJE 03
    // =====================================================

    message03.textContent =
        text.messages[2];


    /*
        Esta frase es la revelación
        importante de la apertura.
    */

    safePlayAudio(
        scene07LowImpact,
        0.48
    );


    await window.Scene07Animations
        .showSystemMessage(
            message03,
            3
        );


    /*
        El glitch visual de este mensaje
        recibe un glitch sonoro sutil.
    */

    safePlayAudio(
        scene07GlitchMedium,
        0.38
    );


    await wait(
        1500
    );


    // =====================================================
    // DIVIDER
    // =====================================================

    await window.Scene07Animations
        .showDivider();


    await wait(
        350
    );


    // =====================================================
    // QUESTIONS
    // =====================================================

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


    unlockScene07Ambience();


    questionSelected =
        true;


    const text =
        translations[currentLanguage];


    /*
        CLICK DE SELECCIÓN
    */

    safePlayAudio(
        scene07UIClick,
        0.3
    );


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


    // =====================================================
    // OCULTAR PREGUNTAS
    // =====================================================

    await window.Scene07Animations
        .hideQuestions();


    // =====================================================
    // MOSTRAR PREGUNTA ELEGIDA
    // =====================================================

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


    // =====================================================
    // PROCESSING
    // =====================================================

    processingMessage.textContent =
        text.processing;


    await window.Scene07Animations
        .showProcessing();


    await wait(
        1200
    );


    /*
        Fallo pequeño durante procesamiento.
        El SFX ocurre al mismo tiempo que
        la interferencia visual.
    */

    safePlayAudio(
        scene07Electrical,
        0.22
    );


    await window.Scene07Animations
        .playProcessingFailure();


    await wait(
        350
    );


    // =====================================================
    // QUITAMOS PROCESSING
    // =====================================================

    await window.Scene07Animations
        .hideProcessing();


    await wait(
        300
    );


    // =====================================================
    // RESPUESTA DEL SISTEMA
    // =====================================================

    systemResponseSection.style.display =
        "flex";


    systemResponseSection.setAttribute(
        "aria-hidden",
        "false"
    );


    systemResponse.textContent =
        text.responses[
            questionType
        ];


    /*
        "I am the one asking the questions."

        Queremos que el peso esté aquí.
    */

    safePlayAudio(
        scene07LowImpact,
        0.72
    );


    safePlayAudio(
        scene07GlitchMedium,
        0.6
    );


    await window.Scene07Animations
        .showSystemResponse();


    // =====================================================
    // PAUSA
    // =====================================================

    await wait(
        1500
    );


    // =====================================================
    // CONTROL LOSS
    // =====================================================

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
        A partir de aquí el ambiente
        empieza a regresar lentamente.
    */

    if (
        scene07DeepRumble
    ) {

        scene07DeepRumble.volume =
            0.028;

    }


    // =====================================================
    // NIVEL 1
    // =====================================================

    window.Scene07Animations
        .setCorruptionLevel(
            1
        );


    safePlayAudio(
        scene07GlitchMedium,
        0.26
    );


    await wait(
        500
    );


    // =====================================================
    // USER INPUT DISABLED
    // =====================================================

    controlMessage01.textContent =
        text.controlMessages[0];


    /*
        Aquí el sistema literalmente
        elimina la interacción.
    */

    safePlayAudio(
        scene07SystemError,
        0.5
    );


    await window.Scene07Animations
        .showControlMessage(
            controlMessage01,
            1
        );


    await wait(
        850
    );


    // =====================================================
    // CONTROL TRANSFER IN PROGRESS
    // =====================================================

    /*
        Sonido y glitch visual empiezan
        al mismo tiempo.
    */

    safePlayAudio(
        scene07GlitchMedium,
        0.58
    );


    safePlayAudio(
        scene07Electrical,
        0.28
    );


    window.Scene07Animations
        .setCorruptionLevel(
            2
        );


    controlMessage02.textContent =
        text.controlMessages[1];


    await window.Scene07Animations
        .showControlMessage(
            controlMessage02,
            2
        );


    if (
        scene07DeepRumble
    ) {

        scene07DeepRumble.volume =
            0.04;

    }


    await wait(
        900
    );


    // =====================================================
    // SESSION CONTINUES
    // =====================================================

    /*
        Aquí pasamos por primera vez
        al strong glitch.
    */

    safePlayAudio(
        scene07GlitchStrong,
        0.82
    );


    window.Scene07Animations
        .setCorruptionLevel(
            3
        );


    controlMessage03.textContent =
        text.controlMessages[2];


    await window.Scene07Animations
        .showControlMessage(
            controlMessage03,
            3
        );


    if (
        scene07DeepRumble
    ) {

        scene07DeepRumble.volume =
            0.06;

    }


    await wait(
        1000
    );


    // =====================================================
    // NIVEL CRÍTICO
    // =====================================================

    /*
        Última pérdida de estructura.
    */

    safePlayAudio(
        scene07GlitchStrong,
        1
    );


    safePlayAudio(
        scene07Electrical,
        0.38
    );


    window.Scene07Animations
        .setCorruptionLevel(
            4
        );


    if (
        scene07DeepRumble
    ) {

        scene07DeepRumble.volume =
            0.085;

    }


    await wait(
        1700
    );


    startScene08Transition();

}


// =========================================================
// TRANSICIÓN A SCENE 08
// =========================================================

async function startScene08Transition() {

    if (
        sceneEnding
    ) {

        return;

    }


    sceneEnding =
        true;


    /*
        Glitch final sincronizado con
        playScene08Transition().
    */

    safePlayAudio(
        scene07GlitchStrong,
        1
    );


    safePlayAudio(
        scene07Electrical,
        0.48
    );


    if (
        scene07DeepRumble
    ) {

        scene07DeepRumble.volume =
            0.11;

    }


    fadeAmbientAudio(
        scene07Hum,
        500
    );


    await window.Scene07Animations
        .playScene08Transition();


    fadeAmbientAudio(
        scene07DeepRumble,
        300
    );


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
// PRIMERA INTERACCIÓN
// =========================================================

document.addEventListener(
    "pointerdown",

    unlockScene07Ambience,

    {
        once: true
    }
);


// =========================================================
// INIT
// =========================================================

async function initScene07() {

    applyLanguage();


    window.Scene07Animations
        .init();


    startScene07Ambience();


    await window.Scene07Animations
        .playSceneEntry();


    playOpeningMessages();

}


// =========================================================
// START
// =========================================================

initScene07();