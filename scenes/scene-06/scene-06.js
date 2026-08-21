// =========================================================
// ESCENA 06 — LÓGICA
// Compromised Transmission
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
// ELEMENTOS — CAMERAS
// =========================================================

const cameraPanelTitle =
    document.querySelector("#camera-panel-title");

const cameraButtons =
    document.querySelectorAll(".camera-button");

const cameraDeniedMessage =
    document.querySelector("#camera-denied-message");


// =========================================================
// TRANSCRIPT
// =========================================================

const transcriptTitle =
    document.querySelector("#transcript-title");

const transcriptStatus =
    document.querySelector("#transcript-status");

const transcriptLines = [
    document.querySelector("#transcript-line-01"),
    document.querySelector("#transcript-line-02"),
    document.querySelector("#transcript-line-03"),
    document.querySelector("#transcript-line-04")
];


// =========================================================
// AUDIO
// =========================================================

const transmissionAudio =
    document.querySelector("#transmission-audio");

const playTransmissionAudio =
    document.querySelector("#play-transmission-audio");

const audioButtonText =
    document.querySelector("#audio-button-text");

const audioProgressBar =
    document.querySelector("#audio-progress-bar");

const playbackStatusLabel =
    document.querySelector("#playback-status-label");


// =========================================================
// VIDEOS
// =========================================================

const video01 =
    document.querySelector("#scene06-video-01");

const video02 =
    document.querySelector("#scene06-video-02");

const videoPlaceholder01 =
    document.querySelector("#video-placeholder-01");

const videoPlaceholder02 =
    document.querySelector("#video-placeholder-02");

const videoFeed01Status =
    document.querySelector("#video-feed-01-status");

const videoFeed02Status =
    document.querySelector("#video-feed-02-status");

const videoFeed01Label =
    document.querySelector("#video-feed-01-label");

const videoFeed02Label =
    document.querySelector("#video-feed-02-label");

const videoError01 =
    document.querySelector("#video-error-01");

const videoError02 =
    document.querySelector("#video-error-02");


// =========================================================
// LOGS
// =========================================================

const logsTitle =
    document.querySelector("#logs-title");

const systemLogElements = [
    document.querySelector("#system-log-01"),
    document.querySelector("#system-log-02"),
    document.querySelector("#system-log-03"),
    document.querySelector("#system-log-04"),
    document.querySelector("#system-log-05"),
    document.querySelector("#system-log-06")
];

const accessLogsButton =
    document.querySelector("#access-logs-button");

const logsDeniedMessage =
    document.querySelector("#logs-denied-message");


// =========================================================
// ERROR / TRANSMISSION LOST
// =========================================================

const systemErrorMessage =
    document.querySelector("#system-error-message");

const transmissionLostPrimary =
    document.querySelector("#transmission-lost-primary");

const transmissionLostSecondary =
    document.querySelector("#transmission-lost-secondary");


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let audioStarted = false;

let sequenceActive = false;

let sequenceFinished = false;

let feed01Started = false;

let feed02Started = false;

let transcript01Shown = false;
let transcript02Shown = false;
let transcript03Shown = false;
let transcript04Shown = false;

let log04Shown = false;
let log05Shown = false;
let log06Shown = false;


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

        connected:
            "CONNECTED",

        signalLabel:
            "SIGNAL STRENGTH:",

        dataLabel:
            "DATA STREAM:",

        active:
            "ACTIVE",

        unstable:
            "UNSTABLE",

        cameras:
            "CAMERAS",

        accessDenied:
            "ACCESS DENIED",

        transcriptTitle:
            "AUDIO TRANSCRIPT",

        transcriptStatus:
            "PARTIAL RECOVERY",

        transcriptRecovering:
            "RECOVERING",

        transcriptCorrupted:
            "CORRUPTED",

        playAudio:
            "PLAY RECOVERED AUDIO",

        playing:
            "PLAYBACK ACTIVE",

        ready:
            "READY",

        decoding:
            "DECODING",

        corruptedPlayback:
            "DAMAGED PLAYBACK",

        videoFeed01:
            "VIDEO FEED 01",

        videoFeed02:
            "VIDEO FEED 02",

        standby:
            "STANDBY",

        restoring:
            "RESTORING",

        activeFeed:
            "ACTIVE",

        unstableFeed:
            "UNSTABLE",

        signalLoss:
            "SIGNAL LOSS",

        logsTitle:
            "SYSTEM LOGS",

        accessLogs:
            "ACCESS LOGS",

        initialLogs: [
            "Rewriting log entry...",
            "Correction applied",
            "Audio file integrity unstable"
        ],

        playbackCorrupted:
            "Playback corrupted",

        streamInstability:
            "Stream instability increasing",

        unauthorizedInjection:
            "Unauthorized signal injection",

        integrityCompromised:
            "Transmission integrity compromised",

        transcript: [
            "\"Do not open the—\"",
            "\"Do not go back. I repeat—\"",
            "\"It's not—\"",
            "▒▒▒ TRANSCRIPTION FAILURE ▒▒▒"
        ],

        errorPlayback:
            "PLAYBACK ERROR",

        errorSignal:
            "SIGNAL INJECTION DETECTED",

        transmissionLost:
            "TRANSMISSION LOST",

        connectionTerminated:
            "CONNECTION TERMINATED"

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

        unstable:
            "INESTABLE",

        cameras:
            "CÁMARAS",

        accessDenied:
            "ACCESO DENEGADO",

        transcriptTitle:
            "TRANSCRIPCIÓN DE AUDIO",

        transcriptStatus:
            "RECUPERACIÓN PARCIAL",

        transcriptRecovering:
            "RECUPERANDO",

        transcriptCorrupted:
            "CORRUPTO",

        playAudio:
            "REPRODUCIR AUDIO RECUPERADO",

        playing:
            "REPRODUCCIÓN ACTIVA",

        ready:
            "LISTO",

        decoding:
            "DECODIFICANDO",

        corruptedPlayback:
            "REPRODUCCIÓN DAÑADA",

        videoFeed01:
            "VIDEO 01",

        videoFeed02:
            "VIDEO 02",

        standby:
            "EN ESPERA",

        restoring:
            "RESTAURANDO",

        activeFeed:
            "ACTIVO",

        unstableFeed:
            "INESTABLE",

        signalLoss:
            "PÉRDIDA DE SEÑAL",

        logsTitle:
            "REGISTROS DEL SISTEMA",

        accessLogs:
            "ACCEDER A REGISTROS",

        initialLogs: [
            "Reescribiendo entrada de registro...",
            "Corrección aplicada",
            "Integridad de archivo de audio inestable"
        ],

        playbackCorrupted:
            "Reproducción corrupta",

        streamInstability:
            "Inestabilidad de transmisión aumentando",

        unauthorizedInjection:
            "Inyección de señal no autorizada",

        integrityCompromised:
            "Integridad de transmisión comprometida",

        transcript: [
            "\"No abras la—\"",
            "\"No regreses. Repito—\"",
            "\"No es—\"",
            "▒▒▒ FALLO DE TRANSCRIPCIÓN ▒▒▒"
        ],

        errorPlayback:
            "ERROR DE REPRODUCCIÓN",

        errorSignal:
            "INYECCIÓN DE SEÑAL DETECTADA",

        transmissionLost:
            "TRANSMISIÓN PERDIDA",

        connectionTerminated:
            "CONEXIÓN TERMINADA"

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
// ACTUALIZAR IDIOMA
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

    cameraDeniedMessage.textContent =
        text.accessDenied;


    transcriptTitle.textContent =
        text.transcriptTitle;

    transcriptStatus.textContent =
        text.transcriptStatus;


    audioButtonText.textContent =
        text.playAudio;

    playbackStatusLabel.textContent =
        text.ready;


    videoFeed01Label.textContent =
        text.videoFeed01;

    videoFeed02Label.textContent =
        text.videoFeed02;

    videoFeed01Status.textContent =
        text.standby;

    videoFeed02Status.textContent =
        text.standby;


    videoError01.textContent =
        text.signalLoss;

    videoError02.textContent =
        text.signalLoss;


    logsTitle.textContent =
        text.logsTitle;

    accessLogsButton.textContent =
        text.accessLogs;

    logsDeniedMessage.textContent =
        text.accessDenied;


    transmissionLostPrimary.textContent =
        text.transmissionLost;

    transmissionLostSecondary.textContent =
        text.connectionTerminated;

}


// =========================================================
// SYSTEM LOG
// =========================================================

function setSystemLog(
    index,
    message
) {

    const element =
        systemLogElements[index];


    if (!element) {
        return;
    }


    const textElement =
        element.querySelector(
            ".system-log-text"
        );


    textElement.textContent =
        message;


    window.Scene06Animations
        .showSystemLog(
            element
        );

}


// =========================================================
// LOGS INICIALES
// =========================================================

async function playInitialLogs() {

    const messages =
        translations[
            currentLanguage
        ].initialLogs;


    await wait(400);


    for (
        let i = 0;
        i < messages.length;
        i++
    ) {

        setSystemLog(
            i,
            messages[i]
        );


        await wait(
            600
        );

    }


    window.Scene06Animations
        .showCursor();

}


// =========================================================
// CAMERAS BLOQUEADAS
// =========================================================

cameraButtons.forEach(
    button => {

        button.addEventListener(
            "click",

            () => {

                window.Scene06Animations
                    .playDeniedControl(
                        button,
                        cameraDeniedMessage
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

        window.Scene06Animations
            .playDeniedControl(
                accessLogsButton,
                logsDeniedMessage
            );

    }
);


// =========================================================
// MOSTRAR TRANSCRIPT
// =========================================================

function showTranscriptLine(
    index
) {

    const line =
        transcriptLines[index];

    const text =
        translations[
            currentLanguage
        ].transcript[index];


    if (!line) {
        return;
    }


    line.textContent =
        text;


    window.Scene06Animations
        .showTranscriptLine(
            line,
            index
        );

}


// =========================================================
// ACTIVAR VIDEO 01
// =========================================================

function activateVideo01() {

    if (feed01Started) {
        return;
    }


    feed01Started =
        true;


    const text =
        translations[currentLanguage];


    videoFeed01Status.textContent =
        text.restoring;


    window.Scene06Animations
        .restoreVideoFeed(
            1
        );


    video01
        .play()
        .then(
            () => {

                videoPlaceholder01.style.display =
                    "none";

                videoFeed01Status.textContent =
                    text.activeFeed;

            }
        )
        .catch(
            () => {

                videoPlaceholder01.textContent =
                    text.signalLoss;

            }
        );

}


// =========================================================
// ACTIVAR VIDEO 02
// =========================================================

function activateVideo02() {

    if (feed02Started) {
        return;
    }


    feed02Started =
        true;


    const text =
        translations[currentLanguage];


    videoFeed02Status.textContent =
        text.restoring;


    window.Scene06Animations
        .restoreVideoFeed(
            2
        );


    video02
        .play()
        .then(
            () => {

                videoPlaceholder02.style.display =
                    "none";

                videoFeed02Status.textContent =
                    text.activeFeed;

            }
        )
        .catch(
            () => {

                videoPlaceholder02.textContent =
                    text.signalLoss;

            }
        );

}


// =========================================================
// PLAY AUDIO
// =========================================================

function startTransmissionPlayback() {

    if (
        audioStarted ||
        sequenceFinished
    ) {

        return;

    }


    audioStarted =
        true;

    sequenceActive =
        true;


    const text =
        translations[currentLanguage];


    playTransmissionAudio.disabled =
        true;


    audioButtonText.textContent =
        text.playing;

    playbackStatusLabel.textContent =
        text.decoding;

    transcriptStatus.textContent =
        text.transcriptRecovering;


    window.Scene06Animations
        .startPlaybackState();


    transmissionAudio.currentTime =
        0;


    transmissionAudio
        .play()
        .catch(
            () => {

                audioStarted =
                    false;

                sequenceActive =
                    false;

                playTransmissionAudio.disabled =
                    false;


                audioButtonText.textContent =
                    text.playAudio;

                playbackStatusLabel.textContent =
                    text.ready;


                window.Scene06Animations
                    .stopPlaybackState();

            }
        );

}


// =========================================================
// PLAY EVENT
// =========================================================

playTransmissionAudio.addEventListener(
    "click",
    startTransmissionPlayback
);


// =========================================================
// AUDIO PROGRESS
// =========================================================

transmissionAudio.addEventListener(
    "timeupdate",

    () => {

        if (
            !sequenceActive ||
            !transmissionAudio.duration
        ) {

            return;

        }


        const duration =
            transmissionAudio.duration;

        const time =
            transmissionAudio.currentTime;

        const progress =
            (
                time /
                duration
            ) *
            100;


        audioProgressBar.style.width =
            `${progress}%`;


        /*
            Usamos porcentajes del audio,
            así no dependemos de que el
            archivo final dure exactamente
            cierta cantidad de segundos.
        */

        const percentage =
            time /
            duration;


        // -----------------------------------------
        // 10%
        // Primera frase
        // -----------------------------------------

        if (
            percentage >= 0.10 &&
            !transcript01Shown
        ) {

            transcript01Shown =
                true;


            showTranscriptLine(
                0
            );


            window.Scene06Animations
                .playMinorCorruption();

        }


        // -----------------------------------------
        // 23%
        // Video 01
        // -----------------------------------------

        if (
            percentage >= 0.23 &&
            !feed01Started
        ) {

            activateVideo01();


            setSystemLog(
                3,
                translations[
                    currentLanguage
                ].playbackCorrupted
            );

        }


        // -----------------------------------------
        // 37%
        // Segunda frase
        // -----------------------------------------

        if (
            percentage >= 0.37 &&
            !transcript02Shown
        ) {

            transcript02Shown =
                true;


            showTranscriptLine(
                1
            );


            playbackStatusLabel.textContent =
                translations[
                    currentLanguage
                ].corruptedPlayback;


            window.Scene06Animations
                .increaseInstability(
                    2
                );

        }


        // -----------------------------------------
        // 50%
        // Video 02
        // -----------------------------------------

        if (
            percentage >= 0.50 &&
            !feed02Started
        ) {

            activateVideo02();


            setSystemLog(
                4,
                translations[
                    currentLanguage
                ].streamInstability
            );

        }


        // -----------------------------------------
        // 63%
        // Tercera frase
        // -----------------------------------------

        if (
            percentage >= 0.63 &&
            !transcript03Shown
        ) {

            transcript03Shown =
                true;


            showTranscriptLine(
                2
            );


            dataStatus.textContent =
                translations[
                    currentLanguage
                ].unstable;


            window.Scene06Animations
                .increaseInstability(
                    3
                );


            window.Scene06Animations
                .playFeedAnomaly(
                    1
                );

        }


        // -----------------------------------------
        // 74%
        // Anomalía en segundo feed
        // -----------------------------------------

        if (
            percentage >= 0.74 &&
            !log05Shown
        ) {

            log05Shown =
                true;


            setSystemLog(
                5,
                translations[
                    currentLanguage
                ].unauthorizedInjection
            );


            window.Scene06Animations
                .showSystemError(
                    translations[
                        currentLanguage
                    ].errorSignal
                );


            window.Scene06Animations
                .playFeedAnomaly(
                    2
                );

        }


        // -----------------------------------------
        // 84%
        // Transcript falla
        // -----------------------------------------

        if (
            percentage >= 0.84 &&
            !transcript04Shown
        ) {

            transcript04Shown =
                true;


            showTranscriptLine(
                3
            );


            transcriptStatus.textContent =
                translations[
                    currentLanguage
                ].transcriptCorrupted;


            videoFeed01Status.textContent =
                translations[
                    currentLanguage
                ].unstableFeed;

            videoFeed02Status.textContent =
                translations[
                    currentLanguage
                ].unstableFeed;


            window.Scene06Animations
                .increaseInstability(
                    4
                );


            window.Scene06Animations
                .playBothFeedFailure();

        }


        // -----------------------------------------
        // 92%
        // Integridad comprometida
        // -----------------------------------------

        if (
            percentage >= 0.92 &&
            !log06Shown
        ) {

            log06Shown =
                true;


            setSystemLog(
                5,
                translations[
                    currentLanguage
                ].integrityCompromised
            );


            connectionStatus.textContent =
                "ERR_██";


            window.Scene06Animations
                .playCriticalFailure();

        }

    }
);


// =========================================================
// AUDIO TERMINA
// =========================================================

transmissionAudio.addEventListener(
    "ended",

    async () => {

        if (
            sequenceFinished
        ) {

            return;

        }


        sequenceFinished =
            true;

        sequenceActive =
            false;


        audioProgressBar.style.width =
            "100%";


        playbackStatusLabel.textContent =
            translations[
                currentLanguage
            ].corruptedPlayback;


        /*
            El usuario ya no recupera
            ningún control.
        */

        cameraButtons.forEach(
            button => {

                button.disabled =
                    true;

            }
        );


        accessLogsButton.disabled =
            true;


        playTransmissionAudio.disabled =
            true;


        video01.pause();
        video02.pause();


        window.Scene06Animations
            .stopPlaybackState();


        /*
            Corte final de transmisión.
        */

        await window.Scene06Animations
            .playTransmissionLostSequence();


        window.location.href =
            "../scene-07/scene-07.html";

    }
);


// =========================================================
// ERROR DE AUDIO
// =========================================================

transmissionAudio.addEventListener(
    "error",

    () => {

        if (!audioStarted) {
            return;
        }


        sequenceActive =
            false;

        audioStarted =
            false;


        playTransmissionAudio.disabled =
            false;


        audioButtonText.textContent =
            translations[
                currentLanguage
            ].playAudio;


        playbackStatusLabel.textContent =
            translations[
                currentLanguage
            ].ready;


        window.Scene06Animations
            .stopPlaybackState();


        window.Scene06Animations
            .showSystemError(
                translations[
                    currentLanguage
                ].errorPlayback
            );

    }
);


// =========================================================
// INIT
// =========================================================

async function initScene06() {

    updateInterfaceLanguage();


    /*
        Videos preparados pero detenidos.
    */

    video01.pause();
    video02.pause();


    window.Scene06Animations
        .init();


    await window.Scene06Animations
        .playSceneEntry();


    playInitialLogs();

}


// =========================================================
// START
// =========================================================

initScene06();