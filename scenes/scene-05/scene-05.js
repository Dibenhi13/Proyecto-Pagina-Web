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
// AUDIO
// =========================================================

const audioFile01 =
    document.querySelector("#audio-file-01");

const audioFile02 =
    document.querySelector("#audio-file-02");


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
        systemLogElements[index];


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


    await wait(400);


    for (
        let i = 0;
        i < logs.length;
        i++
    ) {

        setSystemLog(
            i,
            logs[i]
        );


        await wait(650);

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


    currentFile =
        fileId;


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


    switch (fileId) {

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

            /*
                En cuanto se abre el archivo
                final empieza el contador
                de 3 segundos.
            */

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


    return names[fileId];

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


            paragraph.appendChild(time);
            paragraph.appendChild(text);

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


    window.Scene05Animations
        .startAudioVisualizer();


    window.Scene05Animations
        .playAudioDamageGlitch();


    currentAudio.currentTime =
        0;


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

    /*
        Audio narrativo:
        no puede cerrar hasta terminar.
    */

    if (audioPlaying) {

        window.Scene05Animations
            .playLockedModalFeedback();

        return;

    }


    /*
        Una vez abierto el archivo final,
        el sistema toma control.
    */

    if (finalSequenceStarted) {

        return;

    }


    if (currentAudio) {

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


    /*
        fragment01 ya inicia su
        propia secuencia final.
    */

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

    return Array.from(
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

    Array.from(files)
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
    // FASE 01 → 02
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


        window.Scene05Animations
            .setInstabilityLevel(2);


        return;

    }


    // =====================================================
    // FASE 02 → 03
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


        window.Scene05Animations
            .setInstabilityLevel(3);


        return;

    }


    // =====================================================
    // FASE 03
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
                    NIVEL CRÍTICO.
                */

                window.Scene05Animations
                    .setInstabilityLevel(4);

            }

        }

    }

}


// =========================================================
// SECUENCIA FINAL
// EXACTAMENTE 3 SEGUNDOS DESPUÉS
// DE ABRIR EL ARCHIVO FINAL
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


    /*
        El usuario tiene 3 segundos
        para ver el archivo.
    */

    await wait(
        3000
    );


    /*
        Después de 3 segundos,
        el sistema interrumpe todo.
    */

    await window.Scene05Animations
        .playScene06Transition();


    window.location.href =
        "../scene-06/scene-06.html";

}


// =========================================================
// INIT
// =========================================================

async function initScene05() {

    updateInterfaceLanguage();


    window.Scene05Animations
        .init();


    await window.Scene05Animations
        .playSceneEntry();


    playInitialSystemLogs();

}


// =========================================================
// START
// =========================================================

initScene05();