// =========================================================
// ESCENA 04 — LÓGICA
// Corrupted Surveillance Interface
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
// ELEMENTOS — FEED
// =========================================================

const liveFeedLabel =
    document.querySelector("#live-feed-label");

const cameraVideo =
    document.querySelector("#camera-video");

const videoPlaceholder =
    document.querySelector("#video-placeholder");

const cameraName =
    document.querySelector("#camera-name");

const feedErrorMessage =
    document.querySelector("#feed-error-message");


// =========================================================
// ELEMENTOS — SYSTEM LOGS
// =========================================================

const logsTitle =
    document.querySelector("#logs-title");

const systemLogElements = [

    document.querySelector("#system-log-01"),
    document.querySelector("#system-log-02"),
    document.querySelector("#system-log-03"),
    document.querySelector("#system-log-04")

];

const systemLogCursor =
    document.querySelector("#system-log-cursor");


// =========================================================
// ELEMENTOS — ACCESS LOGS
// =========================================================

const accessLogsButton =
    document.querySelector("#access-logs-button");

const archivedLogsModal =
    document.querySelector("#archived-logs-modal");

const archivedLogsTitle =
    document.querySelector("#archived-logs-title");

const closeLogsButton =
    document.querySelector("#close-logs-button");

const archivedLogItems =
    document.querySelectorAll(".archived-log-item");


// =========================================================
// ELEMENTOS — LOG DETAILS
// =========================================================

const logDetailsPlaceholder =
    document.querySelector("#log-details-placeholder");

const logDetailsContent =
    document.querySelector("#log-details-content");

const selectedLogId =
    document.querySelector("#selected-log-id");

const selectedLogTitle =
    document.querySelector("#selected-log-title");

const selectedLogDate =
    document.querySelector("#selected-log-date");

const selectedLogStatus =
    document.querySelector("#selected-log-status");

const selectedLogBody =
    document.querySelector("#selected-log-body");

const logDateLabel =
    document.querySelector("#log-date-label");

const logStatusLabel =
    document.querySelector("#log-status-label");


// =========================================================
// ELEMENTOS — AUDIO
// =========================================================

const corruptedAudioContainer =
    document.querySelector("#corrupted-audio-container");

const audioWarning =
    document.querySelector("#audio-warning");

const corruptedAudioButton =
    document.querySelector("#play-corrupted-audio");

const corruptedAudioText =
    document.querySelector("#corrupted-audio-text");

const corruptedAudio =
    document.querySelector("#corrupted-audio");

const audioStatusLabel =
    document.querySelector("#audio-status-label");


// =========================================================
// ELEMENTOS — DENIED
// =========================================================

const systemDeniedText =
    document.querySelector("#system-denied-text");


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let audioIsPlaying = false;

let audioHasPlayed = false;

let currentOpenLog = null;

let cameraDeniedAttempts = 0;


// =========================================================
// CÁMARA FIJA
// =========================================================

const lockedCamera = {

    src:
        "../../assets/video/cam-01.mp4",

    labelEN:
        "EXTERNAL CAM 01",

    labelES:
        "CÁMARA EXTERIOR 01"

};


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

        cameras:
            "CAMERAS",

        liveFeed:
            "LIVE FEED",

        logs:
            "SYSTEM LOGS",

        accessLogs:
            "ACCESS LOGS",

        archivedLogs:
            "ARCHIVED LOGS",

        cameraDenied:
            "ACCESS DENIED",

        cameraUnavailable:
            "CAMERA CONTROL UNAVAILABLE",

        signalError:
            "SIGNAL ERROR",

        playAudio:
            "PLAY AUDIO",

        playingAudio:
            "PLAYING...",

        replayAudio:
            "REPLAY AUDIO",

        audioWarning:
            "AUDIO FRAGMENT AVAILABLE",

        audioStream:
            "AUDIO STREAM",

        systemLogs: [

            "Visual feed restored",

            "Camera control unavailable",

            "Archive integrity compromised",

            "Recovered files detected"

        ],

        archiveItems: [

            "MISSION REPORT",

            "NAVIGATION UPDATE",

            "CREW STATUS",

            "[CORRUPTED]"

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

        liveFeed:
            "TRANSMISIÓN EN VIVO",

        logs:
            "REGISTROS DEL SISTEMA",

        accessLogs:
            "ACCEDER A REGISTROS",

        archivedLogs:
            "REGISTROS ARCHIVADOS",

        cameraDenied:
            "ACCESO DENEGADO",

        cameraUnavailable:
            "CONTROL DE CÁMARAS NO DISPONIBLE",

        signalError:
            "ERROR DE SEÑAL",

        playAudio:
            "REPRODUCIR AUDIO",

        playingAudio:
            "REPRODUCIENDO...",

        replayAudio:
            "VOLVER A REPRODUCIR",

        audioWarning:
            "FRAGMENTO DE AUDIO DISPONIBLE",

        audioStream:
            "FLUJO DE AUDIO",

        systemLogs: [

            "Señal visual restaurada",

            "Control de cámaras no disponible",

            "Integridad del archivo comprometida",

            "Archivos recuperados detectados"

        ],

        archiveItems: [

            "REPORTE DE MISIÓN",

            "ACTUALIZACIÓN DE NAVEGACIÓN",

            "ESTADO DE TRIPULACIÓN",

            "[CORRUPTO]"

        ]

    }

};


// =========================================================
// DATOS DE LOS NUEVOS LOGS
// =========================================================

const archivedLogsData = {

    en: {

        labels: {

            date:
                "DATE:",

            status:
                "STATUS:",

            select:
                "SELECT LOG FILE"

        },


        log05: {

            id:
                "LOG_05",

            title:
                "MISSION REPORT",

            date:
                "07.19.2196",

            status:
                "RECOVERED",

            body: [

                "MISSION LOG 02",

                "We are still in orbit.",

                "We are still in orbit.",

                "We are still—",

                "Trajectory correction applied.",

                "Return sequence delayed."

            ]

        },


        log06: {

            id:
                "LOG_06",

            title:
                "NAVIGATION UPDATE",

            date:
                "07.19.2196",

            status:
                "UNSTABLE",

            body: [

                "CURRENT POSITION: UNKNOWN",

                "RETURN ROUTE: ACTIVE",

                "RETURN ROUTE: FAILED",

                "RETURN ROUTE: ACTIVE",

                "DESTINATION: ▒▒▒▒▒▒▒▒▒▒▒▒"

            ]

        },


        log07: {

            id:
                "LOG_07",

            title:
                "CREW STATUS",

            date:
                "07.20.2196",

            status:
                "CONFLICTING DATA",

            body: [

                "CREW STATUS:",

                "4 ACTIVE",

                "3 ACTIVE",

                "4 ACTIVE",

                "0 ACTIVE",

                "BIOMETRIC RECORDS UNAVAILABLE.",

                "LAST UPDATE: UNKNOWN"

            ]

        },


        log08: {

            id:
                "LOG_08",

            title:
                "[CORRUPTED]",

            date:
                "UNKNOWN",

            status:
                "PARTIAL RECOVERY",

            corrupted:
                true,

            audio:
                true,

            body: [

                "▒▒▒ AUDIO SOURCE DETECTED ▒▒▒",

                "SOURCE: CREW INTERNAL COMMUNICATION",

                "IDENTIFICATION: UNKNOWN",

                "FILE INTEGRITY: 38%",

                "RECOVERED AUDIO FRAGMENT AVAILABLE"

            ]

        }

    },


    es: {

        labels: {

            date:
                "FECHA:",

            status:
                "ESTADO:",

            select:
                "SELECCIONAR ARCHIVO"

        },


        log05: {

            id:
                "LOG_05",

            title:
                "REPORTE DE MISIÓN",

            date:
                "19.07.2196",

            status:
                "RECUPERADO",

            body: [

                "REGISTRO DE MISIÓN 02",

                "Seguimos en órbita.",

                "Seguimos en órbita.",

                "Seguimos—",

                "Corrección de trayectoria aplicada.",

                "Secuencia de retorno retrasada."

            ]

        },


        log06: {

            id:
                "LOG_06",

            title:
                "ACTUALIZACIÓN DE NAVEGACIÓN",

            date:
                "19.07.2196",

            status:
                "INESTABLE",

            body: [

                "POSICIÓN ACTUAL: DESCONOCIDA",

                "RUTA DE RETORNO: ACTIVA",

                "RUTA DE RETORNO: FALLIDA",

                "RUTA DE RETORNO: ACTIVA",

                "DESTINO: ▒▒▒▒▒▒▒▒▒▒▒▒"

            ]

        },


        log07: {

            id:
                "LOG_07",

            title:
                "ESTADO DE TRIPULACIÓN",

            date:
                "20.07.2196",

            status:
                "DATOS CONTRADICTORIOS",

            body: [

                "ESTADO DE TRIPULACIÓN:",

                "4 ACTIVOS",

                "3 ACTIVOS",

                "4 ACTIVOS",

                "0 ACTIVOS",

                "REGISTROS BIOMÉTRICOS NO DISPONIBLES.",

                "ÚLTIMA ACTUALIZACIÓN: DESCONOCIDA"

            ]

        },


        log08: {

            id:
                "LOG_08",

            title:
                "[CORRUPTO]",

            date:
                "DESCONOCIDA",

            status:
                "RECUPERACIÓN PARCIAL",

            corrupted:
                true,

            audio:
                true,

            body: [

                "▒▒▒ FUENTE DE AUDIO DETECTADA ▒▒▒",

                "FUENTE: COMUNICACIÓN INTERNA DE TRIPULACIÓN",

                "IDENTIFICACIÓN: DESCONOCIDA",

                "INTEGRIDAD DEL ARCHIVO: 38%",

                "FRAGMENTO DE AUDIO RECUPERADO DISPONIBLE"

            ]

        }

    }

};


// =========================================================
// CARGAR IDIOMA
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

    liveFeedLabel.textContent =
        text.liveFeed;

    cameraDeniedMessage.textContent =
        text.cameraDenied;


    logsTitle.textContent =
        text.logs;

    accessLogsButton.textContent =
        text.accessLogs;

    archivedLogsTitle.textContent =
        text.archivedLogs;


    feedErrorMessage.textContent =
        text.signalError;


    audioWarning.textContent =
        text.audioWarning;

    audioStatusLabel.textContent =
        text.audioStream;


    corruptedAudioText.textContent =
        text.playAudio;


    cameraName.textContent =
        currentLanguage === "en"
            ? lockedCamera.labelEN
            : lockedCamera.labelES;


    logDetailsPlaceholder.textContent =
        archivedLogsData[
            currentLanguage
        ].labels.select;


    archivedLogItems.forEach(
        (item, index) => {

            const description =
                item.querySelector(
                    ".log-description"
                );


            description.textContent =
                text.archiveItems[index];

        }
    );

}


// =========================================================
// CARGAR FEED
// =========================================================

function loadLockedCamera() {

    videoPlaceholder.style.display =
        "flex";


    cameraVideo.src =
        lockedCamera.src;


    cameraVideo.load();


    cameraVideo.onloadeddata =
        () => {

            videoPlaceholder.style.display =
                "none";


            cameraVideo
                .play()
                .catch(() => {});

        };


    cameraVideo.onerror =
        () => {

            videoPlaceholder.style.display =
                "flex";

        };

}


// =========================================================
// SECUENCIA SYSTEM LOGS
// =========================================================

async function playSystemLogs() {

    const text =
        translations[
            currentLanguage
        ].systemLogs;


    await wait(500);


    for (
        let i = 0;
        i < systemLogElements.length;
        i++
    ) {

        const element =
            systemLogElements[i];


        element
            .querySelector(
                ".system-log-text"
            )
            .textContent =
            text[i];


        window.Scene04Animations
            .showSystemLog(
                element,
                i
            );


        if (i === 1) {

            window.Scene04Animations
                .playFeedDisturbance();

        }


        if (i === 2) {

            window.Scene04Animations
                .playArchiveWarning();

        }


        await wait(
            i === 2
                ? 900
                : 620
        );

    }


    window.Scene04Animations
        .showSystemCursor();

}


// =========================================================
// CAMERAS BLOQUEADAS
// =========================================================

function attemptCameraChange(
    button
) {

    /*
        Ninguna cámara cambia.

        Siempre permanece CAM 01.
    */

    cameraDeniedAttempts++;


    const text =
        translations[
            currentLanguage
        ];


    /*
        Primer intento:
        ACCESS DENIED

        Después:
        CAMERA CONTROL UNAVAILABLE
    */

    const message =
        cameraDeniedAttempts >= 2
            ? text.cameraUnavailable
            : text.cameraDenied;


    cameraDeniedMessage.textContent =
        message;

    systemDeniedText.textContent =
        message;


    window.Scene04Animations
        .playCameraDenied(
            button
        );


    window.Scene04Animations
        .showCameraDeniedMessage();


    /*
        Si insiste varias veces,
        aumenta un poco la respuesta.
    */

    if (
        cameraDeniedAttempts >= 3
    ) {

        window.Scene04Animations
            .playAggressiveDeniedGlitch();

    }

}


// =========================================================
// CAMERA EVENTS
// =========================================================

cameraButtons.forEach(
    button => {

        button.addEventListener(
            "click",

            () => {

                attemptCameraChange(
                    button
                );

            }
        );

    }
);


// =========================================================
// ABRIR LOGS
// =========================================================

function openArchivedLogs() {

    /*
        ACCESS LOGS sí funciona.
    */

    archivedLogsModal.setAttribute(
        "aria-hidden",
        "false"
    );


    window.Scene04Animations
        .openArchivedLogs();

}


// =========================================================
// CERRAR LOGS
// =========================================================

function closeArchivedLogs() {

    /*
        Cuando el audio está sonando,
        el usuario queda atrapado.
    */

    if (audioIsPlaying) {

        window.Scene04Animations
            .playLockedModalFeedback();

        return;

    }


    window.Scene04Animations
        .closeArchivedLogs(
            () => {

                archivedLogsModal
                    .setAttribute(
                        "aria-hidden",
                        "true"
                    );

            }
        );

}


// =========================================================
// MOSTRAR ARCHIVED LOG
// =========================================================

function showArchivedLog(
    logNumber
) {

    /*
        Durante el audio no puede
        cambiar de archivo.
    */

    if (audioIsPlaying) {

        window.Scene04Animations
            .playLockedModalFeedback();

        return;

    }


    const languageData =
        archivedLogsData[
            currentLanguage
        ];


    const log =
        languageData[
            `log${logNumber}`
        ];


    if (!log) {
        return;
    }


    currentOpenLog =
        logNumber;


    /*
        Reiniciamos audio si veníamos
        de LOG_08 y cambiamos de archivo.
    */

    corruptedAudio.pause();

    corruptedAudio.currentTime =
        0;


    logDetailsPlaceholder.style.display =
        "none";

    logDetailsContent.style.display =
        "block";


    logDateLabel.textContent =
        languageData.labels.date;

    logStatusLabel.textContent =
        languageData.labels.status;


    selectedLogId.textContent =
        log.id;

    selectedLogTitle.textContent =
        log.title;

    selectedLogDate.textContent =
        log.date;

    selectedLogStatus.textContent =
        log.status;


    selectedLogBody.innerHTML =
        "";


    log.body.forEach(
        (line, index) => {

            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.textContent =
                line;


            /*
                Los datos extraños reciben
                styling de corrupción.
            */

            if (
                log.corrupted ||
                line.includes("▒") ||
                line.includes("FAILED") ||
                line.includes("FALLIDA") ||
                line === "0 ACTIVE" ||
                line === "0 ACTIVOS"
            ) {

                paragraph.classList.add(
                    "corrupted-line"
                );

            }


            selectedLogBody.appendChild(
                paragraph
            );

        }
    );


    /*
        Solo LOG_08 tiene audio.
    */

    corruptedAudioContainer.style.display =
        log.audio
            ? "block"
            : "none";


    if (log.audio) {

        corruptedAudioText.textContent =
            audioHasPlayed
                ? translations[
                    currentLanguage
                ].replayAudio
                : translations[
                    currentLanguage
                ].playAudio;

    }


    window.Scene04Animations
        .showArchivedLogContent(
            logDetailsContent,
            Boolean(log.corrupted),
            logNumber
        );

}


// =========================================================
// ARCHIVED LOG EVENTS
// =========================================================

archivedLogItems.forEach(
    item => {

        item.addEventListener(
            "click",

            () => {

                showArchivedLog(
                    item.dataset.log
                );

            }
        );

    }
);


// =========================================================
// PLAY AUDIO
// =========================================================

function playCorruptedAudio() {

    if (audioIsPlaying) {

        return;

    }


    audioIsPlaying =
        true;


    corruptedAudioText.textContent =
        translations[
            currentLanguage
        ].playingAudio;


    /*
        Visualmente hacemos evidente que
        el sistema tomó control.
    */

    closeLogsButton.classList.add(
        "audio-locked"
    );


    archivedLogItems.forEach(
        item => {

            item.classList.add(
                "audio-locked"
            );

        }
    );


    window.Scene04Animations
        .startAudioVisualization();


    window.Scene04Animations
        .playAudioButtonFeedback();


    corruptedAudio.currentTime =
        0;


    corruptedAudio
        .play()
        .catch(
            () => {

                /*
                    Si aún no tenemos asset,
                    no dejamos atrapado al usuario.
                */

                audioIsPlaying =
                    false;


                corruptedAudioText.textContent =
                    audioHasPlayed
                        ? translations[
                            currentLanguage
                        ].replayAudio
                        : translations[
                            currentLanguage
                        ].playAudio;


                unlockAudioInterface();


                window.Scene04Animations
                    .stopAudioVisualization();

            }
        );

}


// =========================================================
// DESBLOQUEAR INTERFAZ DEL AUDIO
// =========================================================

function unlockAudioInterface() {

    closeLogsButton.classList.remove(
        "audio-locked"
    );


    archivedLogItems.forEach(
        item => {

            item.classList.remove(
                "audio-locked"
            );

        }
    );

}


// =========================================================
// AUDIO BUTTON EVENT
// =========================================================

corruptedAudioButton.addEventListener(
    "click",
    playCorruptedAudio
);


// =========================================================
// AUDIO DISTORTION
// =========================================================

function createAudioDistortion() {

    if (!audioIsPlaying) {

        return;

    }


    /*
        Distorsión suave.
        No debe destruir la inteligibilidad.
    */

    const playbackRates = [

        1,
        1,
        0.97,
        1,
        0.94,
        1.02

    ];


    corruptedAudio.playbackRate =
        playbackRates[
            Math.floor(
                Math.random() *
                playbackRates.length
            )
        ];


    /*
        Pequeña caída ocasional.
    */

    if (
        Math.random() > 0.72
    ) {

        corruptedAudio.volume =
            0.48;


        setTimeout(
            () => {

                if (audioIsPlaying) {

                    corruptedAudio.volume =
                        1;

                }

            },

            110
        );

    }


    /*
        Sincronizamos pequeños glitches
        visuales con algunas alteraciones.
    */

    if (
        Math.random() > 0.62
    ) {

        window.Scene04Animations
            .playAudioCorruptionGlitch();

    }


    setTimeout(
        createAudioDistortion,

        700 +
        Math.random() * 1200
    );

}


// =========================================================
// AUDIO PLAY
// =========================================================

corruptedAudio.addEventListener(
    "play",

    () => {

        createAudioDistortion();

    }
);


// =========================================================
// AUDIO TERMINA → ESCENA 05
// =========================================================

corruptedAudio.addEventListener(
    "ended",

    async () => {

        audioIsPlaying =
            false;

        audioHasPlayed =
            true;


        corruptedAudio.playbackRate =
            1;

        corruptedAudio.volume =
            1;


        corruptedAudioText.textContent =
            translations[
                currentLanguage
            ].replayAudio;


        /*
            El audio terminó, pero no devolvemos
            el control al usuario.

            Desde aquí el sistema toma control
            y comienza la transición.
        */

        corruptedAudioButton.disabled =
            true;

        closeLogsButton.disabled =
            true;

        accessLogsButton.disabled =
            true;


        archivedLogItems.forEach(
            item => {

                item.disabled =
                    true;

            }
        );


        cameraButtons.forEach(
            button => {

                button.disabled =
                    true;

            }
        );


        window.Scene04Animations
            .stopAudioVisualization();


        /*
            Glitch final.
        */

        await window.Scene04Animations
            .playScene05Transition();


        /*
            Entrar a Scene 05.
        */

        window.location.href =
            "../scene-05/scene-05.html";

    }
);


// =========================================================
// ACCESS LOG EVENT
// =========================================================

accessLogsButton.addEventListener(
    "click",
    openArchivedLogs
);


// =========================================================
// CLOSE BUTTON EVENT
// =========================================================

closeLogsButton.addEventListener(
    "click",
    closeArchivedLogs
);


// =========================================================
// CLICK FUERA DEL MODAL
// =========================================================

archivedLogsModal.addEventListener(
    "click",

    event => {

        if (
            event.target ===
            archivedLogsModal
        ) {

            closeArchivedLogs();

        }

    }
);


// =========================================================
// ESC
// =========================================================

document.addEventListener(
    "keydown",

    event => {

        if (
            event.key === "Escape" &&
            archivedLogsModal
                .getAttribute(
                    "aria-hidden"
                ) === "false"
        ) {

            closeArchivedLogs();

        }

    }
);


// =========================================================
// INIT
// =========================================================

async function initScene04() {

    updateInterfaceLanguage();


    loadLockedCamera();


    window.Scene04Animations
        .init();


    await window.Scene04Animations
        .playSceneEntry();


    playSystemLogs();

}


// =========================================================
// START
// =========================================================

initScene04();