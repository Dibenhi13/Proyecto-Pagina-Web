// =========================================================
// ESCENA 02 — LÓGICA
// Surveillance Interface
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS
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


const cameraPanelTitle =
    document.querySelector("#camera-panel-title");

const cameraButtons =
    document.querySelectorAll(".camera-button");

const cameraVideo =
    document.querySelector("#camera-video");

const videoPlaceholder =
    document.querySelector("#video-placeholder");

const switchingFeed =
    document.querySelector("#switching-feed");

const cameraName =
    document.querySelector("#camera-name");

const liveFeedLabel =
    document.querySelector("#live-feed-label");


const logsTitle =
    document.querySelector("#logs-title");


const logElements = [

    document.querySelector("#log-01"),
    document.querySelector("#log-02"),
    document.querySelector("#log-03"),
    document.querySelector("#log-04"),
    document.querySelector("#log-05")

];


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
// LOG DETAILS
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
// AUDIO NARRATIVO
// =========================================================

const corruptedAudioContainer =
    document.querySelector("#corrupted-audio-container");

const corruptedAudioButton =
    document.querySelector("#play-corrupted-audio");

const corruptedAudioText =
    document.querySelector("#corrupted-audio-text");

const corruptedAudio =
    document.querySelector("#corrupted-audio");


// =========================================================
// SFX
// =========================================================

const scene02Hum =
    document.querySelector("#scene-02-hum");

const scene02UIClick =
    document.querySelector("#scene-02-ui-click");

const scene02SystemError =
    document.querySelector("#scene-02-system-error");

const scene02StaticShort =
    document.querySelector("#scene-02-static-short");

const scene02Electrical =
    document.querySelector("#scene-02-electrical");

const scene02Glitch =
    document.querySelector("#scene-02-glitch");


// =========================================================
// ESTADO
// =========================================================

let currentLanguage = "en";

let currentCamera = "cam01";

let cameraChanging = false;

let audioHasPlayed = false;

let corruptedAudioPlaying = false;

let sceneTransitioning = false;


// =========================================================
// WEB AUDIO API — GAIN
// =========================================================

let audioContext = null;

let narrativeSource = null;

let narrativeGain = null;


function setupNarrativeGain() {

    if (
        audioContext &&
        narrativeGain
    ) {
        return;
    }


    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContextClass) {

        console.warn(
            "Web Audio API no disponible."
        );

        return;
    }


    audioContext =
        new AudioContextClass();


    narrativeSource =
        audioContext.createMediaElementSource(
            corruptedAudio
        );


    narrativeGain =
        audioContext.createGain();


    narrativeGain.gain.value =
        2.2;


    narrativeSource.connect(
        narrativeGain
    );


    narrativeGain.connect(
        audioContext.destination
    );

}


// =========================================================
// CÁMARAS
// =========================================================

const cameras = {

    cam01: {

        labelEN:
            "CORRIDOR CAM 01",

        labelES:
            "CÁMARA PASILLO 01",

        src:
            "../../assets/video/scene-02-cam-01.mp4"

    },


    cam02: {

        labelEN:
            "CONTROL ROOM CAM 02",

        labelES:
            "CÁMARA SALA DE CONTROL 02",

        src:
            "../../assets/video/scene-02-cam-02.mp4"

    },


    cam03: {

        labelEN:
            "EXTERNAL CAM 03",

        labelES:
            "CÁMARA EXTERIOR 03",

        src:
            "../../assets/video/scene-02-cam-03.mp4"

    }

};


// =========================================================
// TRADUCCIONES
// =========================================================

const translations = {

    en: {

        connected:
            "CONNECTED",

        loading:
            "LOADING...",

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

        switching:
            "SWITCHING FEED...",

        accessLogs:
            "ACCESS LOGS",

        archivedLogs:
            "ARCHIVED LOGS",

        playAudio:
            "PLAY AUDIO",

        playingAudio:
            "PLAYING...",

        replayAudio:
            "REPLAY AUDIO",

        logsList: [

            "Accessing external logs...",

            "Visual feed restored",

            "Scanning interior...",

            "No crew detected",

            "Signal interference detected"

        ],

        archiveItems: [

            "SYSTEM DIAGNOSTIC",

            "NAVIGATION REPORT",

            "CREW AUDIO",

            "[CORRUPTED]"

        ]

    },


    es: {

        connected:
            "CONECTADO",

        loading:
            "CARGANDO...",

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

        switching:
            "CAMBIANDO SEÑAL...",

        accessLogs:
            "ACCEDER A REGISTROS",

        archivedLogs:
            "REGISTROS ARCHIVADOS",

        playAudio:
            "REPRODUCIR AUDIO",

        playingAudio:
            "REPRODUCIENDO...",

        replayAudio:
            "VOLVER A REPRODUCIR",

        logsList: [

            "Accediendo a registros externos...",

            "Señal visual restaurada",

            "Escaneando interior...",

            "No se detectó tripulación",

            "Interferencia en la señal detectada"

        ],

        archiveItems: [

            "DIAGNÓSTICO DEL SISTEMA",

            "REPORTE DE NAVEGACIÓN",

            "AUDIO DE TRIPULACIÓN",

            "[CORRUPTO]"

        ]

    }

};


// =========================================================
// ARCHIVED LOG DATA
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


        log01: {

            id:
                "LOG_01",

            title:
                "SYSTEM DIAGNOSTIC",

            date:
                "07.14.2196",

            status:
                "ARCHIVED",

            body: [

                "Primary systems operating within expected parameters.",

                "Life support functioning at reduced capacity.",

                "Navigation system responsive.",

                "Communications array reporting intermittent signal loss.",

                "Crew biometric monitoring unavailable."

            ]

        },


        log02: {

            id:
                "LOG_02",

            title:
                "NAVIGATION REPORT",

            date:
                "07.17.2196",

            status:
                "ARCHIVED",

            body: [

                "Navigation route terminated unexpectedly.",

                "Final destination coordinates unavailable.",

                "Automatic return protocol initiated.",

                "Return protocol failed.",

                "No manual override detected."

            ]

        },


        log03: {

            id:
                "LOG_03",

            title:
                "CREW AUDIO",

            date:
                "07.18.2196",

            status:
                "PARTIALLY RECOVERED",

            body: [

                "Audio transmission recovered from internal communications.",

                "Source identification unavailable.",

                "Duration: 00:01:47",

                "File integrity: 61%.",

                "Playback file associated with corrupted transmission archive."

            ]

        },


        log04: {

            id:
                "LOG_04",

            title:
                "[CORRUPTED]",

            date:
                "UNKNOWN",

            status:
                "DATA CORRUPTED",

            corrupted:
                true,

            audio:
                true,

            body: [

                "RECOVERY FAILURE.",

                "▒▒▒ SIGNAL SOURCE UNKNOWN ▒▒▒",

                "RECOVERED FRAGMENT: ...do not respond...",

                "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",

                "AUDIO FRAGMENT AVAILABLE."

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


        log01: {

            id:
                "LOG_01",

            title:
                "DIAGNÓSTICO DEL SISTEMA",

            date:
                "14.07.2196",

            status:
                "ARCHIVADO",

            body: [

                "Los sistemas principales operan dentro de los parámetros esperados.",

                "El soporte vital funciona a capacidad reducida.",

                "El sistema de navegación responde correctamente.",

                "La matriz de comunicaciones presenta pérdidas intermitentes de señal.",

                "El monitoreo biométrico de la tripulación no está disponible."

            ]

        },


        log02: {

            id:
                "LOG_02",

            title:
                "REPORTE DE NAVEGACIÓN",

            date:
                "17.07.2196",

            status:
                "ARCHIVADO",

            body: [

                "La ruta de navegación terminó inesperadamente.",

                "Las coordenadas del destino final no están disponibles.",

                "Se inició el protocolo automático de retorno.",

                "El protocolo de retorno falló.",

                "No se detectó ninguna anulación manual."

            ]

        },


        log03: {

            id:
                "LOG_03",

            title:
                "AUDIO DE TRIPULACIÓN",

            date:
                "18.07.2196",

            status:
                "RECUPERADO PARCIALMENTE",

            body: [

                "Transmisión de audio recuperada de las comunicaciones internas.",

                "La identificación de la fuente no está disponible.",

                "Duración: 00:01:47",

                "Integridad del archivo: 61%.",

                "Archivo de reproducción asociado con la transmisión corrupta."

            ]

        },


        log04: {

            id:
                "LOG_04",

            title:
                "[CORRUPTO]",

            date:
                "DESCONOCIDA",

            status:
                "DATOS CORRUPTOS",

            corrupted:
                true,

            audio:
                true,

            body: [

                "FALLO DE RECUPERACIÓN.",

                "▒▒▒ ORIGEN DE SEÑAL DESCONOCIDO ▒▒▒",

                "FRAGMENTO RECUPERADO: ...no respondan...",

                "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",

                "FRAGMENTO DE AUDIO DISPONIBLE."

            ]

        }

    }

};


// =========================================================
// AUDIO — UTILIDAD SFX
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
        .catch(
            () => {}
        );

}


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
// AUDIO NARRATIVO SEGÚN IDIOMA
// =========================================================

const scene02Recording = {

    en:
        "../../assets/audio/recordings/en/AUDIO_01.mp3",

    es:
        "../../assets/audio/recordings/es/AUDIO_01.mp3"

};


// =========================================================
// CARGAR AUDIO NARRATIVO
// =========================================================

function loadScene02Recording() {

    if (!corruptedAudio) {

        console.error(
            "No se encontró #corrupted-audio."
        );

        return;

    }


    const audioPath =
        scene02Recording[
            currentLanguage
        ];


    corruptedAudio.pause();


    corruptedAudio.src =
        audioPath;


    corruptedAudio.preload =
        "auto";


    corruptedAudio.volume =
        1;


    corruptedAudio.muted =
        false;


    corruptedAudio.load();

}


// =========================================================
// HUM
// =========================================================

function startAmbientHum() {

    if (!scene02Hum) {
        return;
    }


    scene02Hum.volume =
        0.045;


    scene02Hum
        .play()
        .catch(
            () => {}
        );

}


function unlockAmbientHum() {

    if (!scene02Hum) {
        return;
    }


    if (
        scene02Hum.paused
    ) {

        scene02Hum.volume =
            0.045;


        scene02Hum
            .play()
            .catch(
                () => {}
            );

    }

}


// =========================================================
// RESTAURAR HUM
// =========================================================

function restoreAmbientHum() {

    if (!scene02Hum) {
        return;
    }


    scene02Hum.volume =
        0.045;

}


// =========================================================
// FADE HUM
// =========================================================

function fadeHumOut(
    duration = 500
) {

    if (
        !scene02Hum ||
        scene02Hum.paused
    ) {

        return;

    }


    const initialVolume =
        scene02Hum.volume;


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


                scene02Hum.volume =
                    Math.max(
                        0,
                        initialVolume *
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


                    scene02Hum.pause();

                }

            },

            interval

        );

}


// =========================================================
// ACTUALIZAR INTERFAZ
// =========================================================

function updateInterfaceLanguage() {

    const text =
        translations[
            currentLanguage
        ];


    connectionStatus.textContent =
        text.loading;

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

    logsTitle.textContent =
        text.logs;

    switchingFeed.textContent =
        text.switching;

    accessLogsButton.textContent =
        text.accessLogs;

    archivedLogsTitle.textContent =
        text.archivedLogs;


    corruptedAudioText.textContent =
        text.playAudio;


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


            if (description) {

                description.textContent =
                    text.archiveItems[
                        index
                    ];

            }

        }
    );


    updateCameraName();

}


// =========================================================
// CAM NAME
// =========================================================

function updateCameraName() {

    const camera =
        cameras[
            currentCamera
        ];


    cameraName.textContent =
        currentLanguage === "en"
            ? camera.labelEN
            : camera.labelES;

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
// BOOT
// =========================================================

async function bootSystem() {

    updateInterfaceLanguage();


    if (
        window.Scene02Animations
    ) {

        await window.Scene02Animations
            .playInterfaceBoot();

    }


    connectionStatus.textContent =
        translations[
            currentLanguage
        ].connected;


    safePlayAudio(
        scene02UIClick,
        0.18
    );


    loadCameraMedia(
        currentCamera
    );


    await wait(
        300
    );


    playLogsSequence();

}


// =========================================================
// VIDEO
// =========================================================

function loadCameraMedia(
    cameraId
) {

    const camera =
        cameras[
            cameraId
        ];


    if (!camera) {
        return;
    }


    videoPlaceholder.style.display =
        "flex";


    const placeholderText =
        videoPlaceholder
            .querySelector(
                "span"
            );


    if (
        placeholderText
    ) {

        placeholderText.textContent =
            cameraId.replace(
                "cam",
                "CAM "
            );

    }


    cameraVideo.src =
        camera.src;


    cameraVideo.load();


    cameraVideo.onloadeddata =
        () => {

            videoPlaceholder.style.display =
                "none";


            cameraVideo
                .play()
                .catch(
                    () => {}
                );

        };


    cameraVideo.onerror =
        () => {

            videoPlaceholder.style.display =
                "flex";

        };

}


// =========================================================
// CAMBIAR CÁMARA
// =========================================================

async function changeCamera(
    cameraId
) {

    if (
        cameraChanging ||
        cameraId === currentCamera
    ) {

        return;

    }


    cameraChanging =
        true;


    unlockAmbientHum();


    safePlayAudio(
        scene02UIClick,
        0.25
    );


    safePlayAudio(
        scene02StaticShort,
        0.45
    );


    cameraButtons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    if (
        window.Scene02Animations
    ) {

        await window.Scene02Animations
            .playCameraSwitchOut();

    }


    currentCamera =
        cameraId;


    updateActiveCameraButton();

    updateCameraName();


    loadCameraMedia(
        cameraId
    );


    await wait(
        150
    );


    if (
        window.Scene02Animations
    ) {

        await window.Scene02Animations
            .playCameraSwitchIn();

    }


    cameraChanging =
        false;


    cameraButtons.forEach(
        button => {

            button.disabled =
                false;

        }
    );

}


// =========================================================
// CAM ACTIVE
// =========================================================

function updateActiveCameraButton() {

    cameraButtons.forEach(
        button => {

            button.classList.toggle(
                "active",

                button.dataset.camera ===
                currentCamera
            );

        }
    );

}


// =========================================================
// CAMERA EVENTS
// =========================================================

cameraButtons.forEach(
    button => {

        button.addEventListener(
            "click",

            () => {

                changeCamera(
                    button.dataset.camera
                );

            }
        );

    }
);


// =========================================================
// SYSTEM LOGS
// =========================================================

async function playLogsSequence() {

    const texts =
        translations[
            currentLanguage
        ].logsList;


    logElements.forEach(
        log => {

            if (log) {

                log.style.opacity =
                    "0";

            }

        }
    );


    showLog(
        0,
        texts[0]
    );


    await wait(
        650
    );


    showLog(
        1,
        texts[1]
    );


    await wait(
        700
    );


    showLog(
        2,
        texts[2]
    );


    await playScanningDots(

        logElements[2]
            .querySelector(
                ".log-text"
            ),

        texts[2]

    );


    await wait(
        600
    );


    showLog(
        3,
        texts[3]
    );


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .playNoCrewPulse();

    }


    await wait(
        1200
    );


    showLog(
        4,
        texts[4]
    );


    safePlayAudio(
        scene02Electrical,
        0.32
    );


    safePlayAudio(
        scene02StaticShort,
        0.26
    );


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .playSignalInterference();

    }


    await wait(
        750
    );


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .showLogCursor();

    }

}


// =========================================================
// SHOW LOG
// =========================================================

function showLog(
    index,
    text
) {

    const log =
        logElements[
            index
        ];


    if (!log) {
        return;
    }


    const logText =
        log.querySelector(
            ".log-text"
        );


    if (logText) {

        logText.textContent =
            text;

    }


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .showSystemLog(
                log
            );

    }

}


// =========================================================
// SCANNING
// =========================================================

async function playScanningDots(
    element,
    baseText
) {

    if (!element) {
        return;
    }


    const cleanText =
        baseText.replace(
            /\.*$/,
            ""
        );


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        element.textContent =
            cleanText + ".";


        await wait(
            220
        );


        element.textContent =
            cleanText + "..";


        await wait(
            220
        );


        element.textContent =
            cleanText + "...";


        await wait(
            220
        );

    }


    element.textContent =
        baseText;

}


// =========================================================
// OPEN LOGS
// =========================================================

function openArchivedLogs() {

    unlockAmbientHum();


    safePlayAudio(
        scene02UIClick,
        0.28
    );


    archivedLogsModal.setAttribute(
        "aria-hidden",
        "false"
    );


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .openArchivedLogs();

    }

}


// =========================================================
// CLOSE LOGS
// =========================================================

function closeArchivedLogs() {

    if (
        corruptedAudioPlaying ||
        sceneTransitioning
    ) {

        safePlayAudio(
            scene02SystemError,
            0.5
        );


        if (
            window.Scene02Animations &&
            window.Scene02Animations
                .playLockedModalFeedback
        ) {

            window.Scene02Animations
                .playLockedModalFeedback();

        }


        return;

    }


    safePlayAudio(
        scene02UIClick,
        0.2
    );


    corruptedAudio.pause();

    corruptedAudio.currentTime =
        0;


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
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

}


// =========================================================
// SHOW ARCHIVED LOG
// =========================================================

function showArchivedLog(
    logNumber
) {

    if (
        corruptedAudioPlaying ||
        sceneTransitioning
    ) {

        safePlayAudio(
            scene02SystemError,
            0.5
        );


        if (
            window.Scene02Animations &&
            window.Scene02Animations
                .playLockedModalFeedback
        ) {

            window.Scene02Animations
                .playLockedModalFeedback();

        }


        return;

    }


    safePlayAudio(
        scene02UIClick,
        0.22
    );


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


    corruptedAudio.pause();

    corruptedAudio.currentTime =
        0;


    corruptedAudioText.textContent =
        audioHasPlayed
            ? translations[
                currentLanguage
            ].replayAudio
            : translations[
                currentLanguage
            ].playAudio;


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
        line => {

            const p =
                document.createElement(
                    "p"
                );


            p.textContent =
                line;


            if (
                log.corrupted
            ) {

                p.classList.add(
                    "corrupted-line"
                );

            }


            selectedLogBody
                .appendChild(
                    p
                );

        }
    );


    corruptedAudioContainer.style.display =
        log.audio
            ? "block"
            : "none";


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .showArchivedLogContent(

                logDetailsContent,

                Boolean(
                    log.corrupted
                )

            );

    }

}


// =========================================================
// REPRODUCIR AUDIO NARRATIVO
// =========================================================

async function toggleCorruptedAudio() {

    const text =
        translations[
            currentLanguage
        ];


    if (
        sceneTransitioning
    ) {

        return;

    }


    if (
        corruptedAudioPlaying
    ) {

        safePlayAudio(
            scene02SystemError,
            0.45
        );


        return;

    }


    unlockAmbientHum();


    // -----------------------------------------
    // CONFIGURAR GAIN
    // -----------------------------------------

    setupNarrativeGain();


    if (
        audioContext &&
        audioContext.state ===
            "suspended"
    ) {

        try {

            await audioContext.resume();

        }

        catch (error) {

            console.warn(
                "No se pudo reanudar AudioContext:",
                error
            );

        }

    }


    if (
        narrativeGain
    ) {

        narrativeGain.gain.value =
            1.8;

    }


    // -----------------------------------------
    // VERIFICAR AUDIO
    // -----------------------------------------

    const expectedAudio =
        scene02Recording[
            currentLanguage
        ];


    if (
        !corruptedAudio.src ||
        !corruptedAudio.src.includes(
            "AUDIO_01.mp3"
        )
    ) {

        corruptedAudio.src =
            expectedAudio;


        corruptedAudio.load();

    }


    corruptedAudioPlaying =
        true;


    corruptedAudioText.textContent =
        text.playingAudio;


    safePlayAudio(
        scene02UIClick,
        0.3
    );


    // -----------------------------------------
    // BAJAR AMBIENTE
    // -----------------------------------------

    if (
        scene02Hum
    ) {

        scene02Hum.volume =
            0.01;

    }


    // -----------------------------------------
    // BLOQUEAR INTERFAZ
    // -----------------------------------------

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


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .playAudioButtonFeedback();

    }


    // -----------------------------------------
    // PREPARAR AUDIO
    // -----------------------------------------

    corruptedAudio.currentTime =
        0;


    corruptedAudio.volume =
        1;


    corruptedAudio.muted =
        false;


    // -----------------------------------------
    // PLAY
    // -----------------------------------------

    try {

        await corruptedAudio.play();


        console.log(
            "AUDIO_01 reproduciendo:",
            corruptedAudio.currentSrc
        );


        console.log(
            "Narrative gain:",
            narrativeGain
                ? narrativeGain.gain.value
                : "sin GainNode"
        );

    }

    catch (error) {

        console.error(
            "No se pudo reproducir AUDIO_01:",
            error
        );


        corruptedAudioPlaying =
            false;


        corruptedAudioText.textContent =
            text.playAudio;


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


        restoreAmbientHum();

    }

}


// =========================================================
// AUDIO ERROR
// =========================================================

corruptedAudio.addEventListener(

    "error",

    () => {

        console.error(
            "ERROR CARGANDO AUDIO:",
            scene02Recording[
                currentLanguage
            ]
        );


        corruptedAudioPlaying =
            false;


        restoreAmbientHum();

    }

);


// =========================================================
// AUDIO NARRATIVO TERMINA
// =========================================================

corruptedAudio.addEventListener(

    "ended",

    async () => {

        audioHasPlayed =
            true;


        corruptedAudioPlaying =
            false;


        sceneTransitioning =
            true;


        corruptedAudioText.textContent =
            translations[
                currentLanguage
            ].replayAudio;


        corruptedAudioButton.disabled =
            true;

        closeLogsButton.disabled =
            true;

        accessLogsButton.disabled =
            true;


        cameraButtons.forEach(
            button => {

                button.disabled =
                    true;

            }
        );


        archivedLogItems.forEach(
            item => {

                item.disabled =
                    true;

            }
        );


        safePlayAudio(
            scene02Electrical,
            0.45
        );


        await wait(
            120
        );


        safePlayAudio(
            scene02Glitch,
            1
        );


        safePlayAudio(
            scene02StaticShort,
            0.55
        );


        fadeHumOut(
            650
        );


        if (
            window.Scene02Animations &&
            window.Scene02Animations
                .playScene04Transition
        ) {

            await window.Scene02Animations
                .playScene04Transition();

        }


        window.location.href =
            "../scene-04/scene-04.html";

    }

);


// =========================================================
// EVENTS
// =========================================================

accessLogsButton.addEventListener(
    "click",
    openArchivedLogs
);


closeLogsButton.addEventListener(
    "click",
    closeArchivedLogs
);


corruptedAudioButton.addEventListener(
    "click",
    toggleCorruptedAudio
);


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
// CLICK FUERA
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
// DESBLOQUEO AUDIO
// =========================================================

document.addEventListener(

    "pointerdown",

    async () => {

        unlockAmbientHum();


        setupNarrativeGain();


        if (
            audioContext &&
            audioContext.state ===
                "suspended"
        ) {

            try {

                await audioContext.resume();

            }

            catch (error) {}

        }

    },

    {
        once:
            true
    }

);


// =========================================================
// INIT
// =========================================================

function initScene02() {

    loadScene02Recording();


    updateActiveCameraButton();


    if (
        window.Scene02Animations
    ) {

        window.Scene02Animations
            .init();

    }


    startAmbientHum();


    bootSystem();

}


// =========================================================
// START
// =========================================================

initScene02();