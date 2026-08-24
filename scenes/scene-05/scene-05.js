// =========================================================
// ESCENA 05 — LÓGICA
// Guided Exploration / Recovered Archives
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS — HEADER
// =========================================================

const connectionStatus =
    document.querySelector("#connection-status");

const signalLabel =
    document.querySelector("#signal-label");

const signalStrength =
    document.querySelector("#signal-strength");

const dataLabel =
    document.querySelector("#data-label");

const dataStatus =
    document.querySelector("#data-status");


// =========================================================
// CAMERAS
// =========================================================

const cameraPanelTitle =
    document.querySelector("#camera-panel-title");

const cameraButtons =
    document.querySelectorAll(".camera-button");


// =========================================================
// ARCHIVE GRID
// =========================================================

const archiveFiles =
    document.querySelectorAll(".archive-file");

const phaseOneFiles =
    document.querySelectorAll(
        '.archive-file[data-phase="1"]'
    );

const phaseTwoFiles =
    document.querySelectorAll(
        '.archive-file[data-phase="2"]'
    );


// =========================================================
// SYSTEM LOGS
// =========================================================

const logsTitle =
    document.querySelector("#logs-title");

const systemLogElements = [
    document.querySelector("#system-log-01"),
    document.querySelector("#system-log-02"),
    document.querySelector("#system-log-03"),
    document.querySelector("#system-log-04"),
    document.querySelector("#system-log-05")
];


// =========================================================
// ACCESS LOGS
// =========================================================

const accessLogsButton =
    document.querySelector("#access-logs-button");

const recoveryProgressLabel =
    document.querySelector("#recovery-progress-label");

const recoveryProgressValue =
    document.querySelector("#recovery-progress-value");


// =========================================================
// FILE MODAL
// =========================================================

const fileModal =
    document.querySelector("#file-modal");

const closeFileModalButton =
    document.querySelector("#close-file-modal");

const openedFileName =
    document.querySelector("#opened-file-name");

const openedFileStatus =
    document.querySelector("#opened-file-status");


// =========================================================
// CONTENIDOS
// =========================================================

const chatContent =
    document.querySelector("#chat-content");

const chatHeader =
    document.querySelector("#chat-header");

const chatMessages =
    document.querySelector("#chat-messages");


const audioContent =
    document.querySelector("#audio-content");

const damagedPlaybackLabel =
    document.querySelector("#damaged-playback-label");

const playFileAudioButton =
    document.querySelector("#play-file-audio");

const fileAudioButtonText =
    document.querySelector("#file-audio-button-text");


const videoContent =
    document.querySelector("#video-content");

const recoveredVideo =
    document.querySelector("#recovered-video");

const recoveredVideoPlaceholder =
    document.querySelector("#recovered-video-placeholder");


const imageContent =
    document.querySelector("#image-content");

const recoveredImage =
    document.querySelector("#recovered-image");

const imagePlaceholder =
    document.querySelector("#image-placeholder");


const archiveContent =
    document.querySelector("#archive-content");

const archiveText =
    document.querySelector("#archive-text");


// =========================================================
// AUDIO NARRATIVO
// =========================================================

const audioFile01 =
    document.querySelector("#audio-file-01");

const audioFile02 =
    document.querySelector("#audio-file-02");


// =========================================================
// SFX
// =========================================================

const scene05Hum =
    document.querySelector("#scene-05-hum");

const scene05UIClick =
    document.querySelector("#scene-05-ui-click");

const scene05SystemError =
    document.querySelector("#scene-05-system-error");

const scene05StaticShort =
    document.querySelector("#scene-05-static-short");

const scene05StaticLoop =
    document.querySelector("#scene-05-static-loop");

const scene05Electrical =
    document.querySelector("#scene-05-electrical");

const scene05GlitchSoft =
    document.querySelector("#scene-05-glitch-soft");

const scene05GlitchMedium =
    document.querySelector("#scene-05-glitch-medium");

const scene05GlitchStrong =
    document.querySelector("#scene-05-glitch-strong");

const scene05DeepRumble =
    document.querySelector("#scene-05-deep-rumble");

const scene05LowImpact =
    document.querySelector("#scene-05-low-impact");


// =========================================================
// ALERTA FINAL
// =========================================================

const securityAlert =
    document.querySelector("#security-alert");

const securityAlertPrimary =
    document.querySelector("#security-alert-primary");

const securityAlertSecondary =
    document.querySelector("#security-alert-secondary");


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let currentPhase = 1;

let currentFile = null;

let currentAudio = null;

let audioPlaying = false;

let finalSequenceStarted = false;

const visitedFiles =
    new Set();


// =========================================================
// ASSETS
// =========================================================

const assets = {

    video01:
        "../../assets/video/video-01.mp4",

    video02:
        "../../assets/video/video-02.mp4",

    image01:
        "../../assets/images/image-01.jpg"

};


// =========================================================
// TEXTOS
// =========================================================

const translations = {

    en: {

        connected:
            "CONNECTED",

        signalLabel:
            "SIGNAL STRENGTH:",

        dataLabel:
            "DATA STREAM:",

        active:
            "ACTIVE",

        cameras:
            "CAMERAS",

        logs:
            "SYSTEM LOGS",

        accessLogs:
            "ACCESS LOGS",

        recovery:
            "ARCHIVE RECOVERY",

        recovered:
            "RECOVERED",

        unlocked:
            "UNLOCKED",

        corrupted:
            "CORRUPTED",

        viewed:
            "VIEWED",

        accessDenied:
            "ACCESS DENIED",

        damagedPlayback:
            "DAMAGED PLAYBACK",

        playAudio:
            "PLAY AUDIO",

        playingAudio:
            "PLAYING...",

        replayAudio:
            "REPLAY AUDIO",

        videoUnavailable:
            "VIDEO FRAGMENT UNAVAILABLE",

        imageUnavailable:
            "IMAGE DATA CORRUPTED",

        chatHeader:
            "[CREW CHAT // INTERNAL]",

        systemLogs: [
            "Rewriting log entry...",
            "Correction applied",
            "Audio file integrity unstable"
        ],

        phaseTwoLog:
            "Additional records recovered",

        phaseThreeLog:
            "Archive fragment restored",

        finalLog:
            "Unauthorized pathway detected",

        finalPrimary:
            "UNAUTHORIZED ACCESS DETECTED",

        finalSecondary:
            "SYSTEM INTEGRITY COMPROMISED",

        chat01: [
            {
                time: "[22:14]",
                text: "Did you hear that?"
            },
            {
                time: "[22:15]",
                text: "It's probably interference..."
            },
            {
                time: "[22:15]",
                text: "No... that was inside."
            }
        ],

        chat02: [
            {
                time: "[02:31]",
                text: "Who is in corridor C?"
            },
            {
                time: "[02:32]",
                text: "Nobody."
            },
            {
                time: "[02:33]",
                text: "Then why did the door just open?"
            }
        ],

        archive01: [
            "INTERNAL RECOVERY REPORT",
            "Audio signatures detected outside registered crew channels.",
            "Source identification failed.",
            "Automatic correction protocol initiated.",
            "Crew notification suppressed.",
            "▒▒▒ RECORD ALTERED ▒▒▒"
        ],

        fragment01: [
            "RECOVERED SYSTEM FRAGMENT",
            "ACCESS LEVEL: UNKNOWN",
            "CREW RESPONSE LOG REMOVED",
            "SOURCE: INTERNAL SYSTEM",
            "LAST COMMAND: DO NOT ARCHIVE",
            "▒▒▒ UNAUTHORIZED PATHWAY OPEN ▒▒▒"
        ]

    },


    es: {

        connected:
            "CONECTADO",

        signalLabel:
            "INTENSIDAD DE SEÑAL:",

        dataLabel:
            "FLUJO DE DATOS:",

        active:
            "ACTIVO",

        cameras:
            "CÁMARAS",

        logs:
            "REGISTROS DEL SISTEMA",

        accessLogs:
            "ACCEDER A REGISTROS",

        recovery:
            "RECUPERACIÓN DE ARCHIVOS",

        recovered:
            "RECUPERADO",

        unlocked:
            "DESBLOQUEADO",

        corrupted:
            "CORRUPTO",

        viewed:
            "VISTO",

        accessDenied:
            "ACCESO DENEGADO",

        damagedPlayback:
            "REPRODUCCIÓN DAÑADA",

        playAudio:
            "REPRODUCIR AUDIO",

        playingAudio:
            "REPRODUCIENDO...",

        replayAudio:
            "VOLVER A REPRODUCIR",

        videoUnavailable:
            "FRAGMENTO DE VIDEO NO DISPONIBLE",

        imageUnavailable:
            "DATOS DE IMAGEN CORRUPTOS",

        chatHeader:
            "[CHAT DE TRIPULACIÓN // INTERNO]",

        systemLogs: [
            "Reescribiendo entrada de registro...",
            "Corrección aplicada",
            "Integridad de archivo de audio inestable"
        ],

        phaseTwoLog:
            "Registros adicionales recuperados",

        phaseThreeLog:
            "Fragmento de archivo restaurado",

        finalLog:
            "Ruta no autorizada detectada",

        finalPrimary:
            "ACCESO NO AUTORIZADO DETECTADO",

        finalSecondary:
            "INTEGRIDAD DEL SISTEMA COMPROMETIDA",

        chat01: [
            {
                time: "[22:14]",
                text: "¿Escuchaste eso?"
            },
            {
                time: "[22:15]",
                text: "Probablemente es interferencia..."
            },
            {
                time: "[22:15]",
                text: "No... eso estaba dentro."
            }
        ],

        chat02: [
            {
                time: "[02:31]",
                text: "¿Quién está en el corredor C?"
            },
            {
                time: "[02:32]",
                text: "Nadie."
            },
            {
                time: "[02:33]",
                text: "Entonces, ¿por qué acaba de abrirse la puerta?"
            }
        ],

        archive01: [
            "REPORTE INTERNO DE RECUPERACIÓN",
            "Firmas de audio detectadas fuera de los canales registrados de la tripulación.",
            "La identificación de la fuente falló.",
            "Protocolo de corrección automática iniciado.",
            "Notificación a la tripulación suprimida.",
            "▒▒▒ REGISTRO ALTERADO ▒▒▒"
        ],

        fragment01: [
            "FRAGMENTO DEL SISTEMA RECUPERADO",
            "NIVEL DE ACCESO: DESCONOCIDO",
            "REGISTRO DE RESPUESTA DE TRIPULACIÓN ELIMINADO",
            "FUENTE: SISTEMA INTERNO",
            "ÚLTIMO COMANDO: NO ARCHIVAR",
            "▒▒▒ RUTA NO AUTORIZADA ABIERTA ▒▒▒"
        ]

    }

};


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
// AMBIENTE — INICIO
// =========================================================

function startScene05Ambience() {

    if (scene05Hum) {

        scene05Hum.volume =
            0.05;


        scene05Hum
            .play()
            .catch(() => {});

    }


    if (scene05StaticLoop) {

        scene05StaticLoop.volume =
            0.02;


        scene05StaticLoop
            .play()
            .catch(() => {});

    }

}


// =========================================================
// DESBLOQUEAR AUDIO
// =========================================================

function unlockScene05Ambience() {

    if (
        scene05Hum &&
        scene05Hum.paused
    ) {

        scene05Hum.volume =
            0.05;


        scene05Hum
            .play()
            .catch(() => {});

    }


    if (
        scene05StaticLoop &&
        scene05StaticLoop.paused
    ) {

        scene05StaticLoop.volume =
            currentPhase === 1
                ? 0.02
                : currentPhase === 2
                    ? 0.035
                    : 0.05;


        scene05StaticLoop
            .play()
            .catch(() => {});

    }


    if (
        currentPhase >= 3 &&
        scene05DeepRumble &&
        scene05DeepRumble.paused
    ) {

        scene05DeepRumble.volume =
            0.04;


        scene05DeepRumble
            .play()
            .catch(() => {});

    }

}


// =========================================================
// ACTUALIZAR AMBIENTE POR FASE
// =========================================================

function updatePhaseAmbience() {

    if (
        currentPhase === 1
    ) {

        if (scene05StaticLoop) {

            scene05StaticLoop.volume =
                0.02;

        }


        return;

    }


    if (
        currentPhase === 2
    ) {

        if (scene05StaticLoop) {

            scene05StaticLoop.volume =
                0.035;

        }


        return;

    }


    if (
        currentPhase >= 3
    ) {

        if (scene05StaticLoop) {

            scene05StaticLoop.volume =
                0.05;

        }


        if (scene05DeepRumble) {

            scene05DeepRumble.volume =
                0.04;


            if (
                scene05DeepRumble.paused
            ) {

                scene05DeepRumble
                    .play()
                    .catch(() => {});

            }

        }

    }

}


// =========================================================
// BAJAR AMBIENTE DURANTE AUDIO
// =========================================================

function lowerAmbienceForDialogue() {

    if (
        scene05Hum &&
        !scene05Hum.paused
    ) {

        scene05Hum.volume =
            0.022;

    }


    if (
        scene05StaticLoop &&
        !scene05StaticLoop.paused
    ) {

        scene05StaticLoop.volume =
            0.01;

    }


    if (
        scene05DeepRumble &&
        !scene05DeepRumble.paused
    ) {

        scene05DeepRumble.volume =
            0.02;

    }

}


// =========================================================
// RESTAURAR AMBIENTE
// =========================================================

function restorePhaseAmbience() {

    if (scene05Hum) {

        scene05Hum.volume =
            0.05;

    }


    updatePhaseAmbience();

}


// =========================================================
// FADE
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
// IDIOMA INTERFAZ
// =========================================================

function updateInterfaceLanguage() {

    const text =
        translations[currentLanguage];


    connectionStatus.textContent =
        text.connected;

    signalLabel.textContent =
        text.signalLabel;

    dataLabel.textContent =
        text.dataLabel;

    dataStatus.textContent =
        text.active;

    cameraPanelTitle.textContent =
        text.cameras;

    logsTitle.textContent =
        text.logs;

    accessLogsButton.textContent =
        text.accessLogs;

    recoveryProgressLabel.textContent =
        text.recovery;

    chatHeader.textContent =
        text.chatHeader;

    damagedPlaybackLabel.textContent =
        text.damagedPlayback;

    fileAudioButtonText.textContent =
        text.playAudio;

    recoveredVideoPlaceholder.textContent =
        text.videoUnavailable;

    imagePlaceholder.textContent =
        text.imageUnavailable;

    securityAlertPrimary.textContent =
        text.finalPrimary;

    securityAlertSecondary.textContent =
        text.finalSecondary;

}


// =========================================================
// SYSTEM LOG
// =========================================================

function setSystemLog(
    index,
    text
) {

    const log =
        systemLogElements[
            index
        ];


    if (!log) {
        return;
    }


    log
        .querySelector(
            ".system-log-text"
        )
        .textContent =
        text;


    window.Scene05Animations
        .showSystemLog(
            log
        );

}


// =========================================================
// SYSTEM LOGS INICIALES
// =========================================================

async function playInitialSystemLogs() {

    const logs =
        translations[
            currentLanguage
        ].systemLogs;


    await wait(
        400
    );


    for (
        let i = 0;
        i < logs.length;
        i++
    ) {

        setSystemLog(
            i,
            logs[i]
        );


        if (
            i === 2
        ) {

            safePlayAudio(
                scene05Electrical,
                0.15
            );

        }


        await wait(
            650
        );

    }


    window.Scene05Animations
        .showSystemCursor();

}


// =========================================================
// CAMERAS BLOQUEADAS
// =========================================================

cameraButtons.forEach(
    button => {

        button.addEventListener(
            "click",

            () => {

                unlockScene05Ambience();


                safePlayAudio(
                    scene05SystemError,
                    0.45
                );


                window.Scene05Animations
                    .playDeniedControl(
                        button,
                        translations[
                            currentLanguage
                        ].accessDenied
                    );

            }
        );

    }
);


// =========================================================
// ACCESS LOGS BLOQUEADO
// =========================================================

accessLogsButton.addEventListener(
    "click",

    () => {

        unlockScene05Ambience();


        safePlayAudio(
            scene05SystemError,
            0.45
        );


        window.Scene05Animations
            .playDeniedControl(
                accessLogsButton,
                translations[
                    currentLanguage
                ].accessDenied
            );

    }
);


// =========================================================
// OCULTAR CONTENIDO
// =========================================================

function hideAllFileContent() {

    [
        chatContent,
        audioContent,
        videoContent,
        imageContent,
        archiveContent
    ]
        .forEach(
            content => {

                content.style.display =
                    "none";

                content.style.opacity =
                    "0";

            }
        );

}


// =========================================================
// ABRIR ARCHIVO
// =========================================================

function openArchiveFile(
    fileId
) {

    if (
        audioPlaying ||
        finalSequenceStarted
    ) {

        return;

    }


    const button =
        document.querySelector(
            `[data-file="${fileId}"]`
        );


    if (
        !button ||
        button.disabled ||
        button.classList.contains("locked")
    ) {

        return;

    }


    unlockScene05Ambience();


    currentFile =
        fileId;


    safePlayAudio(
        scene05UIClick,
        0.22
    );


    if (
        currentPhase === 2
    ) {

        safePlayAudio(
            scene05StaticShort,
            0.16
        );

    }


    if (
        currentPhase >= 3
    ) {

        safePlayAudio(
            scene05StaticShort,
            0.25
        );

    }


    if (
        fileId === "image01"
    ) {

        safePlayAudio(
            scene05Electrical,
            0.25
        );

    }


    if (
        fileId === "archive01"
    ) {

        safePlayAudio(
            scene05Electrical,
            0.3
        );


        safePlayAudio(
            scene05StaticShort,
            0.28
        );

    }


    if (
        fileId === "fragment01"
    ) {

        safePlayAudio(
            scene05LowImpact,
            0.65
        );


        setTimeout(
            () => {

                safePlayAudio(
                    scene05GlitchStrong,
                    1
                );

            },
            70
        );


        if (
            scene05DeepRumble
        ) {

            scene05DeepRumble.volume =
                0.09;

        }

    }


    hideAllFileContent();


    openedFileName.textContent =
        getDisplayName(
            fileId
        );


    openedFileStatus.textContent =
        button.classList.contains(
            "corrupted-file"
        )
            ? translations[
                currentLanguage
            ].corrupted
            : translations[
                currentLanguage
            ].recovered;


    fileModal.setAttribute(
        "aria-hidden",
        "false"
    );


    window.Scene05Animations
        .openFileModal();


    switch (
        fileId
    ) {

        case "chat01":

            showChat(
                translations[
                    currentLanguage
                ].chat01
            );

            break;


        case "chat02":

            showChat(
                translations[
                    currentLanguage
                ].chat02
            );

            break;


        case "audio01":

            showAudio(
                audioFile01
            );

            break;


        case "audio02":

            showAudio(
                audioFile02
            );

            break;


        case "video01":

            showVideo(
                assets.video01
            );

            break;


        case "video02":

            showVideo(
                assets.video02
            );

            break;


        case "image01":

            showImage(
                assets.image01
            );

            break;


        case "archive01":

            showArchiveText(
                translations[
                    currentLanguage
                ].archive01
            );

            break;


        case "fragment01":

            showArchiveText(
                translations[
                    currentLanguage
                ].fragment01
            );


            startFinalSequence();

            break;

    }


    markFileVisited(
        fileId
    );

}


// =========================================================
// DISPLAY NAME
// =========================================================

function getDisplayName(
    fileId
) {

    const names = {

        chat01:
            "CHAT_01",

        audio01:
            "AUDIO_01",

        video01:
            "VIDEO_01",

        chat02:
            "CHAT_02",

        audio02:
            "AUDIO_02",

        video02:
            "VIDEO_02",

        image01:
            currentLanguage === "en"
                ? "IMAGE_01"
                : "IMAGEN_01",

        archive01:
            currentLanguage === "en"
                ? "ARCHIVE_01"
                : "ARCHIVO_01",

        fragment01:
            "▒▒▒▒▒▒▒"

    };


    return names[
        fileId
    ];

}


// =========================================================
// CHAT
// =========================================================

function showChat(
    messages
) {

    chatContent.style.display =
        "block";


    chatMessages.innerHTML =
        "";


    messages.forEach(
        message => {

            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.classList.add(
                "chat-message"
            );


            const time =
                document.createElement(
                    "span"
                );


            time.classList.add(
                "chat-timestamp"
            );


            time.textContent =
                message.time;


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                message.text;


            paragraph.appendChild(
                time
            );


            paragraph.appendChild(
                text
            );


            chatMessages.appendChild(
                paragraph
            );

        }
    );


    window.Scene05Animations
        .showChatContent(
            chatContent
        );

}


// =========================================================
// AUDIO
// =========================================================

function showAudio(
    audio
) {

    currentAudio =
        audio;


    audioContent.style.display =
        "flex";


    currentAudio.pause();


    currentAudio.currentTime =
        0;


    fileAudioButtonText.textContent =
        translations[
            currentLanguage
        ].playAudio;


    window.Scene05Animations
        .showFileContent(
            audioContent
        );

}


// =========================================================
// PLAY AUDIO
// =========================================================

function playCurrentAudio() {

    if (
        !currentAudio ||
        audioPlaying
    ) {

        return;

    }


    audioPlaying =
        true;


    fileAudioButtonText.textContent =
        translations[
            currentLanguage
        ].playingAudio;


    safePlayAudio(
        scene05UIClick,
        0.25
    );


    safePlayAudio(
        scene05StaticShort,
        currentPhase >= 2
            ? 0.3
            : 0.2
    );


    lowerAmbienceForDialogue();


    window.Scene05Animations
        .startAudioVisualizer();


    window.Scene05Animations
        .playAudioDamageGlitch();


    currentAudio.currentTime =
        0;


    currentAudio.volume =
        0.88;


    currentAudio
        .play()
        .catch(
            () => {

                audioPlaying =
                    false;


                fileAudioButtonText.textContent =
                    translations[
                        currentLanguage
                    ].playAudio;


                window.Scene05Animations
                    .stopAudioVisualizer();


                restorePhaseAmbience();

            }
        );

}


// =========================================================
// AUDIO TERMINA
// =========================================================

function onAudioEnded() {

    audioPlaying =
        false;


    fileAudioButtonText.textContent =
        translations[
            currentLanguage
        ].replayAudio;


    window.Scene05Animations
        .stopAudioVisualizer();


    window.Scene05Animations
        .playAudioEndGlitch();


    if (
        currentPhase >= 2
    ) {

        safePlayAudio(
            scene05Electrical,
            0.25
        );


        safePlayAudio(
            scene05GlitchSoft,
            0.35
        );

    }

    else {

        safePlayAudio(
            scene05StaticShort,
            0.18
        );

    }


    restorePhaseAmbience();

}


playFileAudioButton.addEventListener(
    "click",
    playCurrentAudio
);


audioFile01.addEventListener(
    "ended",
    onAudioEnded
);


audioFile02.addEventListener(
    "ended",
    onAudioEnded
);


// =========================================================
// VIDEO
// =========================================================

function showVideo(
    source
) {

    videoContent.style.display =
        "block";


    recoveredVideoPlaceholder.style.display =
        "flex";


    recoveredVideo.src =
        source;


    recoveredVideo.load();


    recoveredVideo.onloadeddata =
        () => {

            recoveredVideoPlaceholder.style.display =
                "none";


            recoveredVideo
                .play()
                .catch(() => {});

        };


    recoveredVideo.onerror =
        () => {

            recoveredVideoPlaceholder.style.display =
                "flex";

        };


    safePlayAudio(
        scene05StaticShort,
        currentPhase >= 2
            ? 0.28
            : 0.18
    );


    window.Scene05Animations
        .showVideoContent(
            videoContent
        );

}


// =========================================================
// IMAGE
// =========================================================

function showImage(
    source
) {

    imageContent.style.display =
        "block";


    recoveredImage.style.display =
        "none";


    imagePlaceholder.style.display =
        "flex";


    recoveredImage.src =
        source;


    recoveredImage.onload =
        () => {

            imagePlaceholder.style.display =
                "none";


            recoveredImage.style.display =
                "block";

        };


    recoveredImage.onerror =
        () => {

            imagePlaceholder.style.display =
                "flex";


            recoveredImage.style.display =
                "none";

        };


    safePlayAudio(
        scene05GlitchMedium,
        0.38
    );


    window.Scene05Animations
        .showImageContent(
            imageContent
        );

}


// =========================================================
// ARCHIVE TEXT
// =========================================================

function showArchiveText(
    lines
) {

    archiveContent.style.display =
        "block";


    archiveText.innerHTML =
        "";


    lines.forEach(
        line => {

            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.textContent =
                line;


            if (
                line.includes("▒")
            ) {

                paragraph.classList.add(
                    "corrupted-line"
                );

            }


            archiveText.appendChild(
                paragraph
            );

        }
    );


    window.Scene05Animations
        .showArchiveContent(
            archiveContent
        );

}


// =========================================================
// CERRAR MODAL
// =========================================================

function closeFileModal() {

    if (
        audioPlaying
    ) {

        safePlayAudio(
            scene05SystemError,
            0.5
        );


        window.Scene05Animations
            .playLockedModalFeedback();


        return;

    }


    if (
        finalSequenceStarted
    ) {

        return;

    }


    safePlayAudio(
        scene05UIClick,
        0.18
    );


    if (
        currentAudio
    ) {

        currentAudio.pause();


        currentAudio.currentTime =
            0;


        currentAudio =
            null;

    }


    recoveredVideo.pause();


    window.Scene05Animations
        .closeFileModal(

            () => {

                fileModal.setAttribute(
                    "aria-hidden",
                    "true"
                );


                hideAllFileContent();

            }

        );

}


// =========================================================
// CLOSE EVENTS
// =========================================================

closeFileModalButton.addEventListener(
    "click",
    closeFileModal
);


fileModal.addEventListener(
    "click",

    event => {

        if (
            event.target ===
            fileModal
        ) {

            closeFileModal();

        }

    }
);


document.addEventListener(
    "keydown",

    event => {

        if (
            event.key === "Escape" &&
            fileModal.getAttribute(
                "aria-hidden"
            ) === "false"
        ) {

            closeFileModal();

        }

    }
);


// =========================================================
// GRID EVENTS
// =========================================================

archiveFiles.forEach(
    file => {

        file.addEventListener(
            "click",

            () => {

                openArchiveFile(
                    file.dataset.file
                );

            }
        );

    }
);


// =========================================================
// VISITED
// =========================================================

function markFileVisited(
    fileId
) {

    if (
        visitedFiles.has(
            fileId
        )
    ) {

        return;

    }


    visitedFiles.add(
        fileId
    );


    const button =
        document.querySelector(
            `[data-file="${fileId}"]`
        );


    button.classList.add(
        "visited"
    );


    const status =
        button.querySelector(
            ".file-status"
        );


    status.textContent =
        translations[
            currentLanguage
        ].viewed;


    updateRecoveryProgress();


    if (
        fileId !== "fragment01"
    ) {

        checkPhaseProgress();

    }

}


// =========================================================
// RECOVERY PROGRESS
// =========================================================

function updateRecoveryProgress() {

    const totalFiles =
        9;


    const progress =
        Math.round(
            (
                visitedFiles.size /
                totalFiles
            ) *
            100
        );


    recoveryProgressValue.textContent =
        `${progress}%`;


    window.Scene05Animations
        .pulseRecoveryProgress();

}


// =========================================================
// PHASE COMPLETE
// =========================================================

function phaseComplete(
    files
) {

    return Array
        .from(
            files
        )
        .every(
            file =>
                visitedFiles.has(
                    file.dataset.file
                )
        );

}


// =========================================================
// UNLOCK
// =========================================================

function unlockPhase(
    files
) {

    Array
        .from(
            files
        )
        .forEach(
            file => {

                file.disabled =
                    false;


                file.classList.remove(
                    "locked"
                );


                file.classList.add(
                    "unlocked",
                    "newly-unlocked"
                );


                const status =
                    file.querySelector(
                        ".file-status"
                    );


                status.textContent =
                    file.classList.contains(
                        "corrupted-file"
                    )
                        ? translations[
                            currentLanguage
                        ].corrupted
                        : translations[
                            currentLanguage
                        ].unlocked;


                window.Scene05Animations
                    .animateFileUnlock(
                        file
                    );

            }
        );

}


// =========================================================
// PROGRESIÓN
// =========================================================

function checkPhaseProgress() {

    // =====================================================
    // PHASE 01 → PHASE 02
    // =====================================================

    if (
        currentPhase === 1 &&
        phaseComplete(
            phaseOneFiles
        )
    ) {

        currentPhase =
            2;


        unlockPhase(
            phaseTwoFiles
        );


        setSystemLog(
            3,
            translations[
                currentLanguage
            ].phaseTwoLog
        );


        updatePhaseAmbience();


        /*
            IMPORTANTE:
            El audio empieza exactamente
            cuando comienza el glitch visual.
        */

        safePlayAudio(
            scene05GlitchMedium,
            1
        );


        window.Scene05Animations
            .setInstabilityLevel(
                2
            );


        /*
            La electricidad entra después
            para no tapar el ataque del glitch.
        */

        setTimeout(
            () => {

                safePlayAudio(
                    scene05Electrical,
                    0.25
                );

            },
            220
        );


        return;

    }


    // =====================================================
    // PHASE 02 → PHASE 03
    // =====================================================

    if (
        currentPhase === 2 &&
        phaseComplete(
            phaseTwoFiles
        )
    ) {

        currentPhase =
            3;


        const phaseThreeInitialFiles =
            document.querySelectorAll(
                '.archive-file[data-phase="3"]:not(.final-file)'
            );


        unlockPhase(
            phaseThreeInitialFiles
        );


        setSystemLog(
            4,
            translations[
                currentLanguage
            ].phaseThreeLog
        );


        updatePhaseAmbience();


        /*
            Glitch fuerte sincronizado
            con el cambio visual.
        */

        safePlayAudio(
            scene05GlitchStrong,
            1
        );


        window.Scene05Animations
            .setInstabilityLevel(
                3
            );


        setTimeout(
            () => {

                safePlayAudio(
                    scene05Electrical,
                    0.32
                );

            },
            250
        );


        return;

    }


    // =====================================================
    // PHASE 03 → FINAL FRAGMENT
    // =====================================================

    if (
        currentPhase === 3
    ) {

        const imageVisited =
            visitedFiles.has(
                "image01"
            );


        const archiveVisited =
            visitedFiles.has(
                "archive01"
            );


        if (
            imageVisited &&
            archiveVisited
        ) {

            const finalFile =
                document.querySelector(
                    '[data-file="fragment01"]'
                );


            if (
                finalFile &&
                finalFile.disabled
            ) {

                unlockPhase(
                    [finalFile]
                );


                setSystemLog(
                    4,
                    translations[
                        currentLanguage
                    ].finalLog
                );


                /*
                    Impacto grave que anuncia
                    que se abrió algo que no debía.
                */

                safePlayAudio(
                    scene05LowImpact,
                    0.6
                );


                /*
                    GLITCH SONORO Y VISUAL
                    AL MISMO TIEMPO.
                */

                safePlayAudio(
                    scene05GlitchStrong,
                    1
                );


                window.Scene05Animations
                    .setInstabilityLevel(
                        4
                    );


                if (
                    scene05DeepRumble
                ) {

                    scene05DeepRumble.volume =
                        0.065;

                }

            }

        }

    }

}


// =========================================================
// SECUENCIA FINAL
// 3 SEGUNDOS DESPUÉS DE ABRIR FRAGMENT
// =========================================================

async function startFinalSequence() {

    if (
        finalSequenceStarted
    ) {

        return;

    }


    finalSequenceStarted =
        true;


    recoveryProgressValue.textContent =
        "100%";


    if (
        scene05DeepRumble
    ) {

        scene05DeepRumble.volume =
            0.09;

    }


    /*
        3 segundos para leer
        el fragmento final.
    */

    await wait(
        3000
    );


    /*
        Colapso sonoro.
    */

    safePlayAudio(
        scene05GlitchStrong,
        1
    );


    safePlayAudio(
        scene05StaticShort,
        0.55
    );


    setTimeout(
        () => {

            safePlayAudio(
                scene05Electrical,
                0.4
            );

        },
        80
    );


    fadeAmbientAudio(
        scene05Hum,
        500
    );


    fadeAmbientAudio(
        scene05StaticLoop,
        650
    );


    if (
        scene05DeepRumble
    ) {

        scene05DeepRumble.volume =
            0.11;

    }


    await window.Scene05Animations
        .playScene06Transition();


    fadeAmbientAudio(
        scene05DeepRumble,
        300
    );


    window.location.href =
        "../scene-06/scene-06.html";

}


// =========================================================
// PRIMERA INTERACCIÓN
// =========================================================

document.addEventListener(
    "pointerdown",

    unlockScene05Ambience,

    {
        once: true
    }
);


// =========================================================
// INIT
// =========================================================

async function initScene05() {

    updateInterfaceLanguage();


    window.Scene05Animations
        .init();


    startScene05Ambience();


    await window.Scene05Animations
        .playSceneEntry();


    playInitialSystemLogs();

}


// =========================================================
// START
// =========================================================

initScene05();