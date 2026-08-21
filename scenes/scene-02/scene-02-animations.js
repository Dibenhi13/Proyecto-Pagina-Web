// =========================================================
// ESCENA 02 — ANIMACIONES GSAP
// Surveillance Interface
// The Lost Ship
// =========================================================


window.Scene02Animations = (() => {


    // =====================================================
    // REGISTRAR SCROLLTRIGGER
    // =====================================================

    gsap.registerPlugin(
        ScrollTrigger
    );


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const scene =
        document.querySelector(
            "#scene-02"
        );


    const interfaceElement =
        document.querySelector(
            "#surveillance-interface"
        );


    const header =
        document.querySelector(
            ".system-header"
        );


    const cameraPanel =
        document.querySelector(
            "#camera-panel"
        );


    const liveFeedPanel =
        document.querySelector(
            "#live-feed-panel"
        );


    const logsPanel =
        document.querySelector(
            "#logs-panel"
        );


    const cameraVideo =
        document.querySelector(
            "#camera-video"
        );


    const videoPlaceholder =
        document.querySelector(
            "#video-placeholder"
        );


    const videoStatic =
        document.querySelector(
            "#video-static"
        );


    const videoNoise =
        document.querySelector(
            ".video-noise"
        );


    const systemNoise =
        document.querySelector(
            ".system-noise"
        );


    const switchingFeed =
        document.querySelector(
            "#switching-feed"
        );


    const globalInterference =
        document.querySelector(
            "#global-interference"
        );


    const feedAnomaly =
        document.querySelector(
            "#feed-anomaly"
        );


    const signalStrength =
        document.querySelector(
            "#signal-strength"
        );


    const dataStatus =
        document.querySelector(
            "#data-status"
        );


    const logCursor =
        document.querySelector(
            "#log-cursor"
        );


    const cursorBlock =
        document.querySelector(
            ".cursor-block"
        );


    const archivedLogsModal =
        document.querySelector(
            "#archived-logs-modal"
        );


    const archivedLogsWindow =
        document.querySelector(
            ".archived-logs-window"
        );


    const audioButton =
        document.querySelector(
            "#play-corrupted-audio"
        );


    const sceneTransition =
        document.querySelector(
            "#scene-transition"
        );


    // =====================================================
    // INITIAL STATE
    // =====================================================

    function setInitialState() {

        gsap.set(
            interfaceElement,
            {
                opacity: 0
            }
        );


        gsap.set(
            header,
            {
                opacity: 0,
                y: -4
            }
        );


        gsap.set(
            cameraPanel,
            {
                opacity: 0,
                x: -8
            }
        );


        gsap.set(
            liveFeedPanel,
            {
                opacity: 0,
                scale: 0.995
            }
        );


        gsap.set(
            logsPanel,
            {
                opacity: 0,
                x: 8
            }
        );


        gsap.set(
            archivedLogsModal,
            {
                opacity: 0,
                visibility: "hidden",
                pointerEvents: "none"
            }
        );


        gsap.set(
            archivedLogsWindow,
            {
                opacity: 0,
                y: 8
            }
        );


        gsap.set(
            sceneTransition,
            {
                opacity: 0
            }
        );

    }


    // =====================================================
    // BOOT
    // =====================================================

    function playInterfaceBoot() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete:
                        resolve
                })

                    .to(
                        {},
                        {
                            duration: 0.45
                        }
                    )

                    .to(
                        scene,
                        {
                            filter:
                                "brightness(1.15)",

                            duration: 0.05
                        }
                    )

                    .to(
                        scene,
                        {
                            filter:
                                "brightness(1)",

                            duration: 0.08
                        }
                    )

                    .to(
                        interfaceElement,
                        {
                            opacity: 1,

                            duration: 0.25
                        }
                    )

                    .to(
                        header,
                        {
                            opacity: 1,
                            y: 0,

                            duration: 0.25
                        }
                    )

                    .to(
                        cameraPanel,
                        {
                            opacity: 1,
                            x: 0,

                            duration: 0.3
                        }
                    )

                    .to(
                        logsPanel,
                        {
                            opacity: 1,
                            x: 0,

                            duration: 0.3
                        },

                        "-=0.22"
                    )

                    .to(
                        liveFeedPanel,
                        {
                            opacity: 1,
                            scale: 1,

                            duration: 0.38
                        },

                        "-=0.12"
                    )

                    .call(
                        playGlobalLineGlitch
                    );

            }
        );

    }


    // =====================================================
    // GLOBAL GLITCH
    // =====================================================

    function playGlobalLineGlitch() {

        gsap.set(
            globalInterference,
            {
                top:
                    `${gsap.utils.random(
                        15,
                        85
                    )}%`,

                xPercent:
                    -20
            }
        );


        gsap.timeline()

            .to(
                globalInterference,
                {
                    opacity: 0.45,
                    xPercent: 10,

                    duration: 0.04
                }
            )

            .to(
                globalInterference,
                {
                    opacity: 0,
                    xPercent: 0,

                    duration: 0.06
                }
            );

    }


    // =====================================================
    // CAMERA OUT
    // =====================================================

    function playCameraSwitchOut() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete:
                        resolve
                })

                    .to(
                        switchingFeed,
                        {
                            opacity: 1,

                            duration: 0.08
                        }
                    )

                    .to(
                        videoStatic,
                        {
                            opacity: 0.6,

                            duration: 0.06
                        },

                        "<"
                    )

                    .to(
                        [
                            cameraVideo,
                            videoPlaceholder
                        ],
                        {
                            opacity: 0,
                            x: -3,

                            duration: 0.08
                        }
                    );

            }
        );

    }


    // =====================================================
    // CAMERA IN
    // =====================================================

    function playCameraSwitchIn() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete:
                        resolve
                })

                    .set(
                        [
                            cameraVideo,
                            videoPlaceholder
                        ],
                        {
                            x: 3
                        }
                    )

                    .to(
                        [
                            cameraVideo,
                            videoPlaceholder
                        ],
                        {
                            opacity: 1,
                            x: 0,

                            duration: 0.12
                        }
                    )

                    .to(
                        videoStatic,
                        {
                            opacity: 0,

                            duration: 0.09
                        },

                        "<"
                    )

                    .to(
                        switchingFeed,
                        {
                            opacity: 0,

                            duration: 0.08
                        },

                        "<"
                    );

            }
        );

    }


    // =====================================================
    // SYSTEM LOG
    // =====================================================

    function showSystemLog(
        log
    ) {

        gsap.fromTo(
            log,

            {
                opacity: 0,
                x: -3
            },

            {
                opacity: 1,
                x: 0,

                duration: 0.18
            }
        );

    }


    // =====================================================
    // NO CREW
    // =====================================================

    function playNoCrewPulse() {

        gsap.timeline()

            .to(
                liveFeedPanel,
                {
                    filter:
                        "brightness(1.12)",

                    duration: 0.06
                }
            )

            .to(
                liveFeedPanel,
                {
                    filter:
                        "brightness(1)",

                    duration: 0.12
                }
            );

    }


    // =====================================================
    // SIGNAL INTERFERENCE
    // =====================================================

    function playSignalInterference() {

        gsap.timeline()

            .to(
                videoStatic,
                {
                    opacity: 0.55,

                    duration: 0.05
                }
            )

            .to(
                [
                    cameraVideo,
                    videoPlaceholder
                ],
                {
                    x: -5,

                    duration: 0.05
                },

                "<"
            )

            .to(
                feedAnomaly,
                {
                    opacity: 0.28,

                    duration: 0.025
                }
            )

            .to(
                feedAnomaly,
                {
                    opacity: 0,

                    duration: 0.03
                }
            )

            .to(
                [
                    cameraVideo,
                    videoPlaceholder
                ],
                {
                    x: 0,

                    duration: 0.1
                }
            )

            .to(
                videoStatic,
                {
                    opacity: 0,

                    duration: 0.08
                },

                "<"
            )

            .call(
                playGlobalLineGlitch
            );

    }


    // =====================================================
    // CURSOR
    // =====================================================

    function showLogCursor() {

        gsap.set(
            logCursor,
            {
                opacity: 1
            }
        );


        gsap.to(
            cursorBlock,
            {
                opacity: 0.1,

                duration: 0.45,

                repeat: -1,
                yoyo: true,

                ease:
                    "steps(1)"
            }
        );

    }


    // =====================================================
    // SIGNAL STRENGTH
    // =====================================================

    function animateSignalStrength() {

        function changeSignal() {

            signalStrength.textContent =
                `${Math.floor(
                    gsap.utils.random(
                        72,
                        79
                    )
                )}%`;


            gsap.delayedCall(

                gsap.utils.random(
                    2,
                    4
                ),

                changeSignal

            );

        }


        changeSignal();

    }


    // =====================================================
    // DATA STREAM
    // =====================================================

    function animateDataStream() {

        gsap.to(
            dataStatus,
            {
                opacity: 0.68,

                duration: 1.8,

                repeat: -1,
                yoyo: true,

                ease:
                    "sine.inOut"
            }
        );

    }


    // =====================================================
    // RANDOM FEED GLITCH
    // =====================================================

    function scheduleRandomFeedGlitch() {

        gsap.delayedCall(

            gsap.utils.random(
                5,
                10
            ),

            () => {

                gsap.timeline()

                    .to(
                        videoNoise,
                        {
                            opacity: 0.08,

                            duration: 0.04
                        }
                    )

                    .to(
                        [
                            cameraVideo,
                            videoPlaceholder
                        ],
                        {
                            x: 1.5,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        [
                            cameraVideo,
                            videoPlaceholder
                        ],
                        {
                            x: 0,

                            duration: 0.05
                        }
                    )

                    .to(
                        videoNoise,
                        {
                            opacity: 0.025,

                            duration: 0.07
                        },

                        "<"
                    )

                    .call(
                        scheduleRandomFeedGlitch
                    );

            }

        );

    }


    // =====================================================
    // OPEN MODAL
    // =====================================================

    function openArchivedLogs() {

        gsap.set(
            archivedLogsModal,
            {
                visibility:
                    "visible",

                pointerEvents:
                    "auto"
            }
        );


        gsap.timeline()

            .to(
                archivedLogsModal,
                {
                    opacity: 1,

                    duration: 0.2
                }
            )

            .to(
                archivedLogsWindow,
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.25
                },

                "-=0.12"
            );

    }


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    function closeArchivedLogs(
        onComplete
    ) {

        gsap.timeline({
            onComplete
        })

            .to(
                archivedLogsWindow,
                {
                    opacity: 0,
                    y: 6,

                    duration: 0.15
                }
            )

            .to(
                archivedLogsModal,
                {
                    opacity: 0,

                    duration: 0.16
                },

                "-=0.08"
            )

            .set(
                archivedLogsModal,
                {
                    visibility:
                        "hidden",

                    pointerEvents:
                        "none"
                }
            );

    }


    // =====================================================
    // SHOW ARCHIVED LOG
    // =====================================================

    function showArchivedLogContent(
        element,
        corrupted = false
    ) {

        gsap.killTweensOf(
            element
        );


        gsap.fromTo(
            element,

            {
                opacity: 0,
                x: -4
            },

            {
                opacity: 1,
                x: 0,

                duration: 0.22
            }
        );


        if (corrupted) {

            gsap.timeline()

                .to(
                    element,
                    {
                        x: 3,
                        opacity: 0.55,

                        duration: 0.04
                    }
                )

                .to(
                    element,
                    {
                        x: -2,
                        opacity: 1,

                        duration: 0.04
                    }
                )

                .to(
                    element,
                    {
                        x: 0,

                        duration: 0.07
                    }
                )

                .call(
                    playGlobalLineGlitch
                );

        }

    }


    // =====================================================
    // AUDIO BUTTON FEEDBACK
    // =====================================================

    function playAudioButtonFeedback() {

        gsap.timeline()

            .to(
                audioButton,
                {
                    background:
                        "rgba(0,255,56,0.14)",

                    boxShadow:
                        "0 0 14px rgba(0,255,56,0.35)",

                    duration: 0.08
                }
            )

            .to(
                audioButton,
                {
                    background:
                        "rgba(0,255,56,0.03)",

                    boxShadow:
                        "0 0 4px rgba(0,255,56,0.12)",

                    duration: 0.18
                }
            );

    }


    // =====================================================
    // FEEDBACK — MODAL BLOQUEADO
    // =====================================================

    function playLockedModalFeedback() {

        /*
            Cada vez que el usuario intenta:
            - cerrar con X
            - usar ESC
            - hacer click fuera
            - cambiar a otro log

            mientras el audio está sonando,
            el sistema responde visualmente
            pero NO permite salir.
        */

        gsap.killTweensOf(
            archivedLogsWindow
        );


        gsap.timeline()

            .to(
                archivedLogsWindow,
                {
                    x: -2,

                    filter:
                        "brightness(1.18)",

                    duration: 0.04
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 3,

                    filter:
                        "brightness(0.84)",

                    duration: 0.04
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: -1,

                    filter:
                        "brightness(1.08)",

                    duration: 0.04
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.08
                }
            );


        /*
            Interferencia global adicional.
        */

        playGlobalLineGlitch();


        /*
            Pequeño spike de noise.
        */

        gsap.timeline()

            .to(
                systemNoise,
                {
                    opacity: 0.1,

                    duration: 0.04
                }
            )

            .to(
                systemNoise,
                {
                    opacity: 0.022,

                    duration: 0.1
                }
            );

    }


    // =====================================================
    // TRANSICIÓN A ESCENA 04
    // =====================================================

    function playScene04Transition() {

        return new Promise(
            resolve => {

                const timeline =
                    gsap.timeline({

                        onComplete:
                            resolve

                    });


                /*
                    El audio termina.

                    Esperamos unos milisegundos
                    antes de que el sistema falle.
                */

                timeline.to(
                    {},
                    {
                        duration: 0.3
                    }
                );


                // -----------------------------------------
                // PRIMER FALLO
                // -----------------------------------------

                timeline.to(
                    interfaceElement,
                    {
                        x: -2,

                        filter:
                            "brightness(1.15)",

                        duration: 0.045
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        x: 3,

                        filter:
                            "brightness(0.85)",

                        duration: 0.045
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        x: 0,

                        filter:
                            "brightness(1)",

                        duration: 0.07
                    }
                );


                // -----------------------------------------
                // NOISE AUMENTA
                // -----------------------------------------

                timeline.to(
                    systemNoise,
                    {
                        opacity: 0.14,

                        duration: 0.06
                    },

                    "<"
                );


                // -----------------------------------------
                // STATIC DEL FEED
                // -----------------------------------------

                timeline.to(
                    videoStatic,
                    {
                        opacity: 0.65,

                        duration: 0.06
                    },

                    "<"
                );


                // -----------------------------------------
                // PRIMERA INTERFERENCIA
                // -----------------------------------------

                timeline.call(
                    playGlobalLineGlitch
                );


                timeline.to(
                    {},
                    {
                        duration: 0.08
                    }
                );


                // -----------------------------------------
                // SEGUNDA INTERFERENCIA
                // -----------------------------------------

                timeline.call(
                    playGlobalLineGlitch
                );


                // -----------------------------------------
                // MODAL CORRUPTO FALLA
                // -----------------------------------------

                timeline.to(
                    archivedLogsWindow,
                    {
                        x: -4,
                        opacity: 0.78,

                        duration: 0.045
                    }
                );


                timeline.to(
                    archivedLogsWindow,
                    {
                        x: 5,
                        opacity: 1,

                        duration: 0.045
                    }
                );


                timeline.to(
                    archivedLogsWindow,
                    {
                        x: 0,

                        duration: 0.06
                    }
                );


                // -----------------------------------------
                // DISTORSIÓN GENERAL
                // -----------------------------------------

                timeline.to(
                    interfaceElement,
                    {
                        scaleX: 1.004,
                        scaleY: 0.997,

                        x: -3,

                        filter:
                            "brightness(1.3)",

                        duration: 0.05
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        scaleX: 0.997,
                        scaleY: 1.004,

                        x: 4,

                        duration: 0.05
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        scaleX: 1,
                        scaleY: 1,

                        x: 0,

                        duration: 0.07
                    }
                );


                // -----------------------------------------
                // FEED FALLA
                // -----------------------------------------

                timeline.to(
                    [
                        cameraVideo,
                        videoPlaceholder
                    ],
                    {
                        opacity: 0.12,

                        duration: 0.05
                    }
                );


                timeline.to(
                    [
                        cameraVideo,
                        videoPlaceholder
                    ],
                    {
                        opacity: 1,

                        duration: 0.05
                    }
                );


                // -----------------------------------------
                // STATIC MÁS FUERTE
                // -----------------------------------------

                timeline.to(
                    videoStatic,
                    {
                        opacity: 0.9,

                        duration: 0.05
                    }
                );


                timeline.to(
                    systemNoise,
                    {
                        opacity: 0.22,

                        duration: 0.05
                    },

                    "<"
                );


                timeline.call(
                    playGlobalLineGlitch
                );


                // -----------------------------------------
                // CORTE DE INTERFAZ
                // -----------------------------------------

                timeline.to(
                    interfaceElement,
                    {
                        opacity: 0.45,
                        x: -5,

                        duration: 0.035
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        opacity: 1,
                        x: 4,

                        duration: 0.035
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        x: 0,

                        duration: 0.05
                    }
                );


                // -----------------------------------------
                // EL MODAL TAMBIÉN SE DISTORSIONA
                // -----------------------------------------

                timeline.to(
                    archivedLogsWindow,
                    {
                        scaleX: 1.008,
                        scaleY: 0.99,

                        filter:
                            "brightness(1.35)",

                        duration: 0.04
                    },

                    "<"
                );


                timeline.to(
                    archivedLogsWindow,
                    {
                        scaleX: 0.995,
                        scaleY: 1.008,

                        duration: 0.04
                    }
                );


                timeline.to(
                    archivedLogsWindow,
                    {
                        scaleX: 1,
                        scaleY: 1,

                        filter:
                            "brightness(1)",

                        duration: 0.06
                    }
                );


                // -----------------------------------------
                // NEGRO INTERMITENTE
                // -----------------------------------------

                timeline.set(
                    sceneTransition,
                    {
                        opacity: 0
                    }
                );


                timeline.to(
                    sceneTransition,
                    {
                        opacity: 0.35,

                        duration: 0.06
                    }
                );


                timeline.to(
                    sceneTransition,
                    {
                        opacity: 0.08,

                        duration: 0.04
                    }
                );


                timeline.to(
                    sceneTransition,
                    {
                        opacity: 0.72,

                        duration: 0.06
                    }
                );


                // -----------------------------------------
                // ÚLTIMO FALLO
                // -----------------------------------------

                timeline.to(
                    interfaceElement,
                    {
                        x: -3,

                        filter:
                            "brightness(1.45)",

                        duration: 0.04
                    },

                    "<"
                );


                timeline.to(
                    archivedLogsWindow,
                    {
                        x: 5,

                        filter:
                            "brightness(1.5)",

                        duration: 0.04
                    },

                    "<"
                );


                timeline.call(
                    playGlobalLineGlitch
                );


                timeline.to(
                    [
                        interfaceElement,
                        archivedLogsWindow
                    ],
                    {
                        x: 0,

                        duration: 0.04
                    }
                );


                // -----------------------------------------
                // NEGRO TOTAL
                // -----------------------------------------

                timeline.to(
                    sceneTransition,
                    {
                        opacity: 1,

                        duration: 0.13,

                        ease:
                            "power2.in"
                    }
                );

            }
        );

    }


    // =====================================================
    // SCROLL
    // =====================================================

    function createScrollSequence() {

        gsap.timeline({

            scrollTrigger: {

                trigger:
                    scene,

                start:
                    "top top",

                end:
                    "+=1800",

                scrub:
                    1,

                pin:
                    true,

                anticipatePin:
                    1

            }

        })

            .to(
                signalStrength,
                {
                    opacity: 0.7,

                    duration: 1
                }
            )

            .to(
                liveFeedPanel,
                {
                    filter:
                        "brightness(0.94)",

                    duration: 1
                }
            )

            .to(
                videoNoise,
                {
                    opacity: 0.07,

                    duration: 0.6
                }
            )

            .to(
                videoNoise,
                {
                    opacity: 0.025,

                    duration: 0.5
                }
            )

            .to(
                [
                    cameraPanel,
                    logsPanel
                ],
                {
                    opacity: 0.78,

                    duration: 1
                }
            );

    }


    // =====================================================
    // INIT
    // =====================================================

    function init() {

        setInitialState();

        animateSignalStrength();

        animateDataStream();

        scheduleRandomFeedGlitch();

        createScrollSequence();

    }


    // =====================================================
    // PUBLIC
    // =====================================================

    return {

        init,

        playInterfaceBoot,

        playCameraSwitchOut,

        playCameraSwitchIn,

        showSystemLog,

        playNoCrewPulse,

        playSignalInterference,

        showLogCursor,

        openArchivedLogs,

        closeArchivedLogs,

        showArchivedLogContent,

        playAudioButtonFeedback,

        playLockedModalFeedback,

        playScene04Transition

    };


})();


// =========================================================
// INICIALIZACIÓN AUTOMÁTICA
// =========================================================

window.Scene02Animations.init();