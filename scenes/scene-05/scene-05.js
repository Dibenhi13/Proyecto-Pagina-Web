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
// ACCESS LOGS / PROGRESS
// =========================================================

const accessLogsButton =
    document.querySelector("#access-logs-button");

const recoveryProgress =
    document.querySelector("#recovery-progress");

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

let currentLanguage =
    "en";

let currentPhase =
    1;

let currentFile =
    null;

let currentAudio =
    null;

let audioPlaying =
    false;

let finalSequenceStarted =
    false;


const visitedFiles =
    new Set();


// =========================================================
// ARCHIVOS QUE CUENTAN PARA EL PROGRESO
//
// El fragmento final NO entra en 0/8.
// =========================================================

const explorationFiles = [

    "chat01",
    "audio01",
    "video01",

    "chat02",
    "audio02",
    "video02",

    "image01",
    "archive01"

];


// =========================================================
// ASSETS
// =========================================================

const assets = {

    video01:
        "../../assets/video/VIDEO_01.mp4",

    video02:
        "../../assets/video/VIDEO_02.mp4",

    image01:
        "../../assets/images/image-01.png"

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

        filesAccessed:
            "FILES ACCESSED",

        recovered:
            "RECOVERED",

        unlocked:
            "UNLOCKED",

        corrupted:
            "CORRUPTED",

        locked:
            "LOCKED",

        new:
            "NEW",

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
                text: "Maintenance says Deck C is drawing power again."
            },

            {
                time: "[22:15]",
                text: "That section has been sealed for six hours."
            },

            {
                time: "[22:16]",
                text: "I know. The system says someone opened the door from inside."
            },

            {
                time: "[22:17]",
                text: "There is no one on Deck C."
            },

            {
                time: "[22:18]",
                text: "Then stop checking the camera."
            }

        ],


        chat02: [

            {
                time: "[02:31]",
                text: "Who changed the crew manifest?"
            },

            {
                time: "[02:32]",
                text: "No one. Why?"
            },

            {
                time: "[02:33]",
                text: "It says there are four people on board."
            },

            {
                time: "[02:33]",
                text: "There are only three of us left."
            },

            {
                time: "[02:34]",
                text: "Don't correct it."
            },

            {
                time: "[02:35]",
                text: "Why?"
            },

            {
                time: "[02:35]",
                text: "Because every time I do, it adds them back."
            }


        ],

        archive01: [

            "INTERNAL RECOVERY REPORT",

            "Unregistered activity detected in sealed areas of the ship.",

            "Multiple system logs were modified without crew authorization.",

            "Biometric records no longer match the number of active crew members.",

            "Attempts to restore previous records were automatically overwritten.",

            "Surveillance feeds continue to identify movement in restricted sectors.",

            "Crew notification protocol has been disabled by an unknown process.",

            "SOURCE OF MODIFICATIONS: INTERNAL SYSTEM",

            "▒▒▒ DO NOT TRUST THE CREW MANIFEST ▒▒▒"

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

        filesAccessed:
            "ARCHIVOS REVISADOS",

        recovered:
            "RECUPERADO",

        unlocked:
            "DESBLOQUEADO",

        corrupted:
            "CORRUPTO",

        locked:
            "BLOQUEADO",

        new:
            "NUEVO",

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
                text: "Mantenimiento dice que la cubierta C está consumiendo energía otra vez."
            },

            {
                time: "[22:15]",
                text: "Esa sección lleva seis horas sellada."
            },

            {
                time: "[22:16]",
                text: "Lo sé. El sistema dice que alguien abrió la puerta desde adentro."
            },

            {
                time: "[22:17]",
                text: "No hay nadie en la cubierta C."
            },

            {
                time: "[22:18]",
                text: "Entonces deja de revisar la cámara."
            }

        ],

        chat02: [

            {
                time: "[02:31]",
                text: "¿Quién modificó el registro de la tripulación?"
            },

            {
                time: "[02:32]",
                text: "Nadie. ¿Por qué?"
            },

            {
                time: "[02:33]",
                text: "Dice que hay cuatro personas a bordo."
            },

            {
                time: "[02:33]",
                text: "Solo quedamos tres."
            },

            {
                time: "[02:34]",
                text: "No lo corrijas."
            },

            {
                time: "[02:35]",
                text: "¿Por qué?"
            },

            {
                time: "[02:35]",
                text: "Porque cada vez que lo hago, vuelve a agregarlo."
            }

        ],

        archive01: [

            "REPORTE INTERNO DE RECUPERACIÓN",

            "Se detectó actividad no registrada en áreas selladas de la nave.",

            "Múltiples registros del sistema fueron modificados sin autorización de la tripulación.",

            "Los registros biométricos ya no coinciden con el número de tripulantes activos.",

            "Los intentos por restaurar registros anteriores fueron sobrescritos automáticamente.",

            "Las cámaras continúan detectando movimiento en sectores restringidos.",

            "El protocolo de notificación a la tripulación fue desactivado por un proceso desconocido.",

            "ORIGEN DE LAS MODIFICACIONES: SISTEMA INTERNO",

            "▒▒▒ NO CONFÍES EN EL REGISTRO DE TRIPULACIÓN ▒▒▒"

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
// AUDIOS NARRATIVOS SEGÚN IDIOMA
//
// audio01 de Scene 05 = AUDIO_03
// audio02 de Scene 05 = AUDIO_04
// =========================================================

const scene05Recordings = {

    en: {

        audio01:
            "../../assets/audio/recordings/en/AUDIO_03.mp3",

        audio02:
            "../../assets/audio/recordings/en/AUDIO_04.mp3"

    },


    es: {

        audio01:
            "../../assets/audio/recordings/es/AUDIO_03.mp3",

        audio02:
            "../../assets/audio/recordings/es/AUDIO_04.mp3"

    }

};


// =========================================================
// CARGAR AUDIOS NARRATIVOS
// =========================================================

function loadScene05Recordings() {

    const recordings =
        scene05Recordings[
            currentLanguage
        ];


    if (
        audioFile01
    ) {

        audioFile01.pause();

        audioFile01.currentTime =
            0;

        audioFile01.src =
            recordings.audio01;

        audioFile01.preload =
            "auto";

        audioFile01.volume =
            1;

        audioFile01.muted =
            false;

        audioFile01.playbackRate =
            1;

        audioFile01.load();

    }


    if (
        audioFile02
    ) {

        audioFile02.pause();

        audioFile02.currentTime =
            0;

        audioFile02.src =
            recordings.audio02;

        audioFile02.preload =
            "auto";

        audioFile02.volume =
            1;

        audioFile02.muted =
            false;

        audioFile02.playbackRate =
            1;

        audioFile02.load();

    }


    console.log(
        "Scene 05 recordings:",
        recordings
    );

}


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


    if (
        restart
    ) {

        audio.currentTime =
            0;

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
// AMBIENTE — INICIO
// =========================================================

function startScene05Ambience() {

    if (
        scene05Hum
    ) {

        scene05Hum.volume =
            0.035;


        scene05Hum
            .play()
            .catch(
                () => {}
            );

    }


    if (
        scene05StaticLoop
    ) {

        scene05StaticLoop.volume =
            0.005;


        scene05StaticLoop
            .play()
            .catch(
                () => {}
            );

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
            0.035;


        scene05Hum
            .play()
            .catch(
                () => {}
            );

    }


    if (
        scene05StaticLoop &&
        scene05StaticLoop.paused &&
        !audioPlaying
    ) {

        scene05StaticLoop.volume =
            currentPhase === 1
                ? 0.005
                : currentPhase === 2
                    ? 0.008
                    : 0.012;


        scene05StaticLoop
            .play()
            .catch(
                () => {}
            );

    }


    if (
        currentPhase >= 3 &&
        scene05DeepRumble &&
        scene05DeepRumble.paused
    ) {

        scene05DeepRumble.volume =
            0.025;


        scene05DeepRumble
            .play()
            .catch(
                () => {}
            );

    }

}


// =========================================================
// ACTUALIZAR AMBIENTE POR FASE
// =========================================================

function updatePhaseAmbience() {

    if (
        currentPhase === 1
    ) {

        if (
            scene05StaticLoop
        ) {

            scene05StaticLoop.volume =
                0.005;

        }


        return;

    }


    if (
        currentPhase === 2
    ) {

        if (
            scene05StaticLoop
        ) {

            scene05StaticLoop.volume =
                0.008;

        }


        return;

    }


    if (
        currentPhase >= 3
    ) {

        if (
            scene05StaticLoop
        ) {

            scene05StaticLoop.volume =
                0.012;

        }


        if (
            scene05DeepRumble
        ) {

            scene05DeepRumble.volume =
                0.025;


            if (
                scene05DeepRumble.paused
            ) {

                scene05DeepRumble
                    .play()
                    .catch(
                        () => {}
                    );

            }

        }

    }

}


// =========================================================
// BAJAR AMBIENTE DURANTE AUDIO NARRATIVO
// =========================================================

function lowerAmbienceForDialogue() {

    if (
        scene05Hum
    ) {

        scene05Hum.volume =
            0.008;

    }


    if (
        scene05StaticLoop
    ) {

        scene05StaticLoop.pause();

    }


    if (
        scene05DeepRumble
    ) {

        scene05DeepRumble.volume =
            0.008;

    }

}


// =========================================================
// RESTAURAR AMBIENTE
// =========================================================

function restorePhaseAmbience() {

    if (
        finalSequenceStarted
    ) {

        return;

    }


    if (
        scene05Hum
    ) {

        scene05Hum.volume =
            0.035;

    }


    if (
        scene05StaticLoop
    ) {

        scene05StaticLoop.volume =
            currentPhase === 1
                ? 0.005
                : currentPhase === 2
                    ? 0.008
                    : 0.012;


        scene05StaticLoop
            .play()
            .catch(
                () => {}
            );

    }


    if (
        currentPhase >= 3 &&
        scene05DeepRumble
    ) {

        scene05DeepRumble.volume =
            0.025;

    }

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
        duration /
        steps;


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
// ACTUALIZAR ESTADO NEW / VIEWED
// =========================================================

function updateFileVisitStates() {

    const text =
        translations[
            currentLanguage
        ];


    archiveFiles.forEach(
        file => {

            const fileId =
                file.dataset.file;


            const visitState =
                file.querySelector(
                    ".file-visit-state"
                );


            if (
                !visitState
            ) {

                return;

            }


            // -----------------------------------------
            // BLOQUEADO
            // -----------------------------------------

            if (
                file.classList.contains(
                    "locked"
                )
            ) {

                visitState.textContent =
                    "";

                file.classList.remove(
                    "new-file"
                );

                return;

            }


            // -----------------------------------------
            // YA VISTO
            // -----------------------------------------

            if (
                visitedFiles.has(
                    fileId
                )
            ) {

                file.classList.remove(
                    "new-file"
                );

                file.classList.add(
                    "visited"
                );


                visitState.textContent =
                    text.viewed;


                return;

            }


            // -----------------------------------------
            // DISPONIBLE Y NO VISTO
            // -----------------------------------------

            file.classList.remove(
                "visited"
            );

            file.classList.add(
                "new-file"
            );


            visitState.textContent =
                text.new;

        }
    );

}


// =========================================================
// IDIOMA INTERFAZ
// =========================================================

function updateInterfaceLanguage() {

    const text =
        translations[
            currentLanguage
        ];


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
        text.filesAccessed;

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


    updateFileVisitStates();

    updateRecoveryProgress(
        false
    );

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


    if (
        !log
    ) {

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
                0.10
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
                    0.40
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
            0.40
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
        button.classList.contains(
            "locked"
        )
    ) {

        return;

    }


    unlockScene05Ambience();


    currentFile =
        fileId;


    safePlayAudio(
        scene05UIClick,
        0.18
    );


    /*
        No reproducimos static al abrir
        audio01 ni audio02.
    */

    const isNarrativeAudioFile =
        fileId === "audio01" ||
        fileId === "audio02";


    if (
        !isNarrativeAudioFile &&
        currentPhase === 2
    ) {

        safePlayAudio(
            scene05StaticShort,
            0.08
        );

    }


    if (
        !isNarrativeAudioFile &&
        currentPhase >= 3
    ) {

        safePlayAudio(
            scene05StaticShort,
            0.12
        );

    }


    if (
        fileId === "image01"
    ) {

        safePlayAudio(
            scene05Electrical,
            0.16
        );

    }


    if (
        fileId === "archive01"
    ) {

        safePlayAudio(
            scene05Electrical,
            0.18
        );


        safePlayAudio(
            scene05StaticShort,
            0.10
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


    currentAudio.volume =
        1;


    currentAudio.muted =
        false;


    currentAudio.playbackRate =
        1;


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
// PLAY AUDIO NARRATIVO
// =========================================================

async function playCurrentAudio() {

    if (
        !currentAudio ||
        audioPlaying
    ) {

        return;

    }


    let expectedAudio =
        null;


    if (
        currentAudio === audioFile01
    ) {

        expectedAudio =
            scene05Recordings[
                currentLanguage
            ].audio01;

    }


    if (
        currentAudio === audioFile02
    ) {

        expectedAudio =
            scene05Recordings[
                currentLanguage
            ].audio02;

    }


    if (
        !expectedAudio
    ) {

        console.error(
            "No se pudo identificar el audio narrativo."
        );

        return;

    }


    if (
        currentAudio.getAttribute(
            "src"
        ) !== expectedAudio
    ) {

        currentAudio.src =
            expectedAudio;


        currentAudio.load();

    }


    audioPlaying =
        true;


    fileAudioButtonText.textContent =
        translations[
            currentLanguage
        ].playingAudio;


    safePlayAudio(
        scene05UIClick,
        0.14
    );


    /*
        SIN STATIC SHORT.
        El audio narrativo debe escucharse limpio.
    */

    lowerAmbienceForDialogue();


    window.Scene05Animations
        .startAudioVisualizer();


    window.Scene05Animations
        .playAudioDamageGlitch();


    currentAudio.currentTime =
        0;


    currentAudio.volume =
        1;


    currentAudio.muted =
        false;


    currentAudio.playbackRate =
        1;


    try {

        await currentAudio.play();


        console.log(
            "Scene 05 audio reproduciendo:",
            currentAudio.currentSrc
        );

    }

    catch (
        error
    ) {

        console.error(
            "ERROR reproduciendo audio Scene 05:",
            error
        );


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
            0.10
        );


        safePlayAudio(
            scene05GlitchSoft,
            0.18
        );

    }


    restorePhaseAmbience();

}


// =========================================================
// AUDIO EVENTS
// =========================================================

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
// AUDIO ERROR
// =========================================================

audioFile01.addEventListener(
    "error",

    () => {

        console.error(
            "Error cargando AUDIO_03:",
            scene05Recordings[
                currentLanguage
            ].audio01
        );

    }
);


audioFile02.addEventListener(
    "error",

    () => {

        console.error(
            "Error cargando AUDIO_04:",
            scene05Recordings[
                currentLanguage
            ].audio02
        );

    }
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
                .catch(
                    () => {}
                );

        };


    recoveredVideo.onerror =
        () => {

            recoveredVideoPlaceholder.style.display =
                "flex";

        };


    safePlayAudio(
        scene05StaticShort,
        currentPhase >= 2
            ? 0.12
            : 0.07
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
        0.32
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
                line.includes(
                    "▒"
                )
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
            0.45
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
        0.16
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

    /*
        Fragment01 no forma parte del contador 0/8,
        pero sí puede recibir el estado visual VIEWED.
    */

    const button =
        document.querySelector(
            `[data-file="${fileId}"]`
        );


    if (
        !button
    ) {

        return;

    }


    if (
        !visitedFiles.has(
            fileId
        )
    ) {

        visitedFiles.add(
            fileId
        );

    }


    button.classList.remove(
        "new-file"
    );


    button.classList.remove(
        "newly-unlocked"
    );


    button.classList.add(
        "visited"
    );


    const visitState =
        button.querySelector(
            ".file-visit-state"
        );


    if (
        visitState
    ) {

        visitState.textContent =
            translations[
                currentLanguage
            ].viewed;

    }


    updateRecoveryProgress();


    if (
        fileId !== "fragment01"
    ) {

        checkPhaseProgress();

    }

}


// =========================================================
// RECOVERY / EXPLORATION PROGRESS
// =========================================================

function updateRecoveryProgress(
    animate = true
) {

    const totalFiles =
        explorationFiles.length;


    const accessedFiles =
        explorationFiles.filter(
            fileId =>
                visitedFiles.has(
                    fileId
                )
        ).length;


    recoveryProgressValue.textContent =
        `${accessedFiles}/${totalFiles}`;


    if (
        !animate ||
        !recoveryProgress
    ) {

        return;

    }


    /*
        Pequeño pulso visual del contador.
    */

    recoveryProgress.classList.remove(
        "progress-updated"
    );


    void recoveryProgress.offsetWidth;


    recoveryProgress.classList.add(
        "progress-updated"
    );


    setTimeout(
        () => {

            recoveryProgress.classList.remove(
                "progress-updated"
            );

        },
        550
    );


    /*
        Conservamos la animación que
        ya tenías, si existe.
    */

    if (
        window.Scene05Animations &&
        typeof window.Scene05Animations
            .pulseRecoveryProgress ===
            "function"
    ) {

        window.Scene05Animations
            .pulseRecoveryProgress();

    }

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
                    "newly-unlocked",
                    "new-file"
                );


                const status =
                    file.querySelector(
                        ".file-status"
                    );


                /*
                    Conservamos el estado técnico:
                    CORRUPTED para archivos corruptos,
                    UNLOCKED para los demás.
                */

                if (
                    status
                ) {

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

                }


                const visitState =
                    file.querySelector(
                        ".file-visit-state"
                    );


                if (
                    visitState
                ) {

                    visitState.textContent =
                        translations[
                            currentLanguage
                        ].new;

                }


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


        safePlayAudio(
            scene05GlitchMedium,
            1
        );


        window.Scene05Animations
            .setInstabilityLevel(
                2
            );


        setTimeout(
            () => {

                safePlayAudio(
                    scene05Electrical,
                    0.18
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
                    0.24
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


                safePlayAudio(
                    scene05LowImpact,
                    0.6
                );


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


    /*
        Ya se revisaron los ocho archivos
        principales de exploración.
    */

    recoveryProgressValue.textContent =
        "8/8";


    if (
        scene05DeepRumble
    ) {

        scene05DeepRumble.volume =
            0.09;

    }


    await wait(
        3000
    );


    safePlayAudio(
        scene05GlitchStrong,
        1
    );


    safePlayAudio(
        scene05StaticShort,
        0.30
    );


    setTimeout(
        () => {

            safePlayAudio(
                scene05Electrical,
                0.32
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

    // =====================================================
    // IDIOMA
    // =====================================================

    updateInterfaceLanguage();


    // =====================================================
    // ESTADOS INICIALES NEW / LOCKED
    // =====================================================

    updateFileVisitStates();

    updateRecoveryProgress(
        false
    );


    // =====================================================
    // AUDIO_03 + AUDIO_04
    // =====================================================

    loadScene05Recordings();


    // =====================================================
    // ANIMACIONES
    // =====================================================

    window.Scene05Animations
        .init();


    // =====================================================
    // AMBIENTE
    // =====================================================

    startScene05Ambience();


    // =====================================================
    // ENTRADA
    // =====================================================

    await window.Scene05Animations
        .playSceneEntry();


    // =====================================================
    // LOGS
    // =====================================================

    playInitialSystemLogs();

}


// =========================================================
// START
// =========================================================

initScene05();