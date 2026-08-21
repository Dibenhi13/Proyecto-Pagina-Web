// =========================================================
// ESCENA 04 — ANIMACIONES GSAP
// Corrupted Surveillance Interface
// The Lost Ship
// =========================================================


window.Scene04Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const scene =
        document.querySelector(
            "#scene-04"
        );


    const interfaceElement =
        document.querySelector(
            "#surveillance-interface"
        );


    const header =
        document.querySelector(
            "#system-header"
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


    const videoNoise =
        document.querySelector(
            "#video-noise"
        );


    const videoStatic =
        document.querySelector(
            "#video-static"
        );


    const videoBlackout =
        document.querySelector(
            "#video-blackout"
        );


    const feedAnomaly =
        document.querySelector(
            "#feed-anomaly"
        );


    const feedErrorMessage =
        document.querySelector(
            "#feed-error-message"
        );


    const liveDot =
        document.querySelector(
            "#live-dot"
        );


    const systemNoise =
        document.querySelector(
            "#system-noise"
        );


    const signalStrength =
        document.querySelector(
            "#signal-strength"
        );


    const dataStatus =
        document.querySelector(
            "#data-status"
        );


    const cameraDeniedMessage =
        document.querySelector(
            "#camera-denied-message"
        );


    const systemDeniedMessage =
        document.querySelector(
            "#system-denied-message"
        );


    const archivedLogsModal =
        document.querySelector(
            "#archived-logs-modal"
        );


    const archivedLogsWindow =
        document.querySelector(
            "#archived-logs-window"
        );


    const systemLogCursor =
        document.querySelector(
            "#system-log-cursor"
        );


    const cursorBlock =
        document.querySelector(
            "#cursor-block"
        );


    const audioStatus =
        document.querySelector(
            "#audio-status"
        );


    const audioBars =
        document.querySelectorAll(
            ".audio-signal span"
        );


    const audioButton =
        document.querySelector(
            "#play-corrupted-audio"
        );


    const glitchLayers = [

        document.querySelector(
            "#glitch-layer-01"
        ),

        document.querySelector(
            "#glitch-layer-02"
        ),

        document.querySelector(
            "#glitch-layer-03"
        )

    ];


    const interferenceLines = [

        document.querySelector(
            "#interference-line-01"
        ),

        document.querySelector(
            "#interference-line-02"
        ),

        document.querySelector(
            "#interference-line-03"
        )

    ];


    const systemFlash =
        document.querySelector(
            "#system-flash"
        );


    // =====================================================
    // ESTADO INICIAL
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
                y: -3
            }
        );


        gsap.set(
            cameraPanel,
            {
                opacity: 0,
                x: -6
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
                x: 6
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
            systemDeniedMessage,
            {
                opacity: 0
            }
        );


        gsap.set(
            cameraDeniedMessage,
            {
                opacity: 0
            }
        );


        gsap.set(
            audioStatus,
            {
                opacity: 0
            }
        );


        gsap.set(
            glitchLayers,
            {
                opacity: 0
            }
        );


        gsap.set(
            interferenceLines,
            {
                opacity: 0
            }
        );


        gsap.set(
            systemFlash,
            {
                opacity: 0
            }
        );

    }


    // =====================================================
    // ENTRADA
    // =====================================================

    function playSceneEntry() {

        return new Promise(
            resolve => {

                gsap.timeline({

                    onComplete:
                        resolve

                })

                    /*
                        Llegamos desde el negro
                        de Scene 02.
                    */

                    .to(
                        {},
                        {
                            duration: 0.18
                        }
                    )


                    /*
                        Imagen aparece incorrectamente
                        por primera vez.
                    */

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.36,
                            x: 18,

                            duration: 0.04
                        }
                    )


                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.25,
                            x: -20,

                            duration: 0.04
                        },

                        "<"
                    )


                    .to(
                        glitchLayers,
                        {
                            opacity: 0,

                            duration: 0.06
                        }
                    )


                    /*
                        Aparece interfaz.
                    */

                    .to(
                        interfaceElement,
                        {
                            opacity: 1,

                            duration: 0.16
                        }
                    )


                    .to(
                        header,
                        {
                            opacity: 1,
                            y: 0,

                            duration: 0.18
                        }
                    )


                    .to(
                        cameraPanel,
                        {
                            opacity: 1,
                            x: 0,

                            duration: 0.2
                        }
                    )


                    .to(
                        logsPanel,
                        {
                            opacity: 1,
                            x: 0,

                            duration: 0.2
                        },

                        "-=0.16"
                    )


                    .to(
                        liveFeedPanel,
                        {
                            opacity: 1,
                            scale: 1,

                            duration: 0.25
                        },

                        "-=0.12"
                    )


                    /*
                        Primer fallo inmediatamente.
                    */

                    .to(
                        interfaceElement,
                        {
                            x: -2,

                            duration: 0.035
                        }
                    )


                    .to(
                        interfaceElement,
                        {
                            x: 2,

                            duration: 0.035
                        }
                    )


                    .to(
                        interfaceElement,
                        {
                            x: 0,

                            duration: 0.06
                        }
                    )


                    .call(
                        playInterferenceLine
                    );

            }
        );

    }


    // =====================================================
    // SYSTEM LOG
    // =====================================================

    function showSystemLog(
        element,
        index
    ) {

        gsap.fromTo(
            element,

            {
                opacity: 0,
                x:
                    index >= 2
                        ? -4
                        : -2
            },

            {
                opacity: 1,
                x: 0,

                duration: 0.18
            }
        );

    }


    // =====================================================
    // SYSTEM CURSOR
    // =====================================================

    function showSystemCursor() {

        gsap.set(
            systemLogCursor,
            {
                opacity: 1
            }
        );


        gsap.to(
            cursorBlock,
            {
                opacity: 0.1,

                duration: 0.38,

                repeat: -1,
                yoyo: true,

                ease:
                    "steps(1)"
            }
        );

    }


    // =====================================================
    // INTERFERENCE LINE
    // =====================================================

    function playInterferenceLine() {

        const line =
            interferenceLines[
                Math.floor(
                    Math.random() *
                    interferenceLines.length
                )
            ];


        gsap.set(
            line,
            {
                top:
                    `${gsap.utils.random(
                        10,
                        90
                    )}%`,

                xPercent:
                    -20
            }
        );


        gsap.timeline()

            .to(
                line,
                {
                    opacity:
                        gsap.utils.random(
                            0.22,
                            0.52
                        ),

                    xPercent:
                        10,

                    duration: 0.04
                }
            )

            .to(
                line,
                {
                    opacity: 0,
                    xPercent: 0,

                    duration: 0.07
                }
            );

    }


    // =====================================================
    // FEED DISTURBANCE
    // =====================================================

    function playFeedDisturbance() {

        gsap.timeline()

            .to(
                videoStatic,
                {
                    opacity: 0.45,

                    duration: 0.04
                }
            )

            .to(
                [
                    cameraVideo,
                    videoPlaceholder
                ],
                {
                    x: -3,

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
                    x: 2,

                    duration: 0.04
                }
            )

            .to(
                [
                    cameraVideo,
                    videoPlaceholder
                ],
                {
                    x: 0,

                    duration: 0.06
                }
            )

            .to(
                videoStatic,
                {
                    opacity: 0,

                    duration: 0.08
                },

                "<"
            );


        playInterferenceLine();

    }


    // =====================================================
    // ARCHIVE WARNING
    // =====================================================

    function playArchiveWarning() {

        gsap.timeline()

            .to(
                logsPanel,
                {
                    filter:
                        "brightness(1.25)",

                    x: 2,

                    duration: 0.04
                }
            )

            .to(
                logsPanel,
                {
                    filter:
                        "brightness(0.85)",

                    x: -2,

                    duration: 0.04
                }
            )

            .to(
                logsPanel,
                {
                    filter:
                        "brightness(1)",

                    x: 0,

                    duration: 0.08
                }
            );

    }


    // =====================================================
    // CAMERA DENIED
    // =====================================================

    function playCameraDenied(
        button
    ) {

        gsap.killTweensOf(
            button
        );


        gsap.timeline()

            .to(
                button,
                {
                    x: -3,
                    opacity: 0.45,

                    duration: 0.04
                }
            )

            .to(
                button,
                {
                    x: 3,
                    opacity: 1,

                    duration: 0.04
                }
            )

            .to(
                button,
                {
                    x: 0,

                    duration: 0.07
                }
            );


        /*
            El feed también reacciona,
            como si hubiera recibido
            la orden pero la rechazara.
        */

        gsap.timeline()

            .to(
                videoStatic,
                {
                    opacity: 0.32,

                    duration: 0.035
                }
            )

            .to(
                videoStatic,
                {
                    opacity: 0,

                    duration: 0.08
                }
            );


        playInterferenceLine();

    }


    // =====================================================
    // CAMERA DENIED MESSAGE
    // =====================================================

    function showCameraDeniedMessage() {

        gsap.killTweensOf(
            [
                cameraDeniedMessage,
                systemDeniedMessage
            ]
        );


        /*
            Texto debajo de cámaras.
        */

        gsap.timeline()

            .set(
                cameraDeniedMessage,
                {
                    opacity: 0,
                    y: 2
                }
            )

            .to(
                cameraDeniedMessage,
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.08
                }
            )

            .to(
                cameraDeniedMessage,
                {
                    opacity: 0,

                    duration: 0.22
                },

                "+=0.7"
            );


        /*
            Mensaje grande central muy breve.
        */

        gsap.timeline()

            .to(
                systemDeniedMessage,
                {
                    opacity: 1,

                    duration: 0.06
                }
            )

            .to(
                systemDeniedMessage,
                {
                    opacity: 0.35,

                    duration: 0.04
                }
            )

            .to(
                systemDeniedMessage,
                {
                    opacity: 1,

                    duration: 0.04
                }
            )

            .to(
                systemDeniedMessage,
                {
                    opacity: 0,

                    duration: 0.16
                },

                "+=0.35"
            );

    }


    // =====================================================
    // AGGRESSIVE DENIED
    // =====================================================

    function playAggressiveDeniedGlitch() {

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    x: -3,

                    filter:
                        "brightness(1.28)",

                    duration: 0.035
                }
            )

            .to(
                interfaceElement,
                {
                    x: 4,

                    filter:
                        "brightness(0.8)",

                    duration: 0.035
                }
            )

            .to(
                interfaceElement,
                {
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.07
                }
            );


        playGlitchSlice();

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

                    duration: 0.18
                }
            )

            .to(
                archivedLogsWindow,
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.22
                },

                "-=0.1"
            )

            /*
                Pequeño error al abrir.
            */

            .to(
                archivedLogsWindow,
                {
                    x: -2,

                    duration: 0.035
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 0,

                    duration: 0.06
                }
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

                    duration: 0.14
                }
            )

            .to(
                archivedLogsModal,
                {
                    opacity: 0,

                    duration: 0.14
                },

                "-=0.07"
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
        corrupted = false,
        logNumber = ""
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

                duration: 0.2
            }
        );


        /*
            LOG 05:
            pequeña repetición incómoda.
        */

        if (
            logNumber === "05"
        ) {

            gsap.delayedCall(
                0.3,
                playInterferenceLine
            );

        }


        /*
            LOG 06 y 07:
            un poco más inestables.
        */

        if (
            logNumber === "06" ||
            logNumber === "07"
        ) {

            gsap.delayedCall(
                0.25,

                () => {

                    gsap.timeline()

                        .to(
                            element,
                            {
                                x: 2,

                                duration: 0.035
                            }
                        )

                        .to(
                            element,
                            {
                                x: 0,

                                duration: 0.06
                            }
                        );

                }
            );

        }


        /*
            LOG 08:
            corrupción claramente mayor.
        */

        if (corrupted) {

            gsap.timeline()

                .to(
                    element,
                    {
                        opacity: 0.45,
                        x: 4,

                        duration: 0.04
                    }
                )

                .to(
                    element,
                    {
                        opacity: 1,
                        x: -3,

                        duration: 0.04
                    }
                )

                .to(
                    element,
                    {
                        x: 0,

                        duration: 0.07
                    }
                );


            playGlitchSlice();

            playInterferenceLine();

        }

    }


    // =====================================================
    // MODAL BLOQUEADO
    // =====================================================

    function playLockedModalFeedback() {

        /*
            Usuario intenta escapar
            mientras escucha LOG_08.
        */

        gsap.killTweensOf(
            archivedLogsWindow
        );


        gsap.timeline()

            .to(
                archivedLogsWindow,
                {
                    x: -3,

                    filter:
                        "brightness(1.2)",

                    duration: 0.04
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 3,

                    filter:
                        "brightness(0.82)",

                    duration: 0.04
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.07
                }
            );


        playGlitchSlice();

        playInterferenceLine();

    }


    // =====================================================
    // AUDIO BUTTON
    // =====================================================

    function playAudioButtonFeedback() {

        gsap.timeline()

            .to(
                audioButton,
                {
                    background:
                        "rgba(0,255,56,0.14)",

                    boxShadow:
                        "0 0 14px rgba(0,255,56,0.36)",

                    duration: 0.07
                }
            )

            .to(
                audioButton,
                {
                    background:
                        "rgba(0,255,56,0.01)",

                    boxShadow:
                        "inset 0 0 6px rgba(0,255,56,0.02)",

                    duration: 0.17
                }
            );

    }


    // =====================================================
    // AUDIO VISUALIZATION
    // =====================================================

    function startAudioVisualization() {

        gsap.to(
            audioStatus,
            {
                opacity: 1,

                duration: 0.14
            }
        );


        audioBars.forEach(
            bar => {

                gsap.killTweensOf(
                    bar
                );


                gsap.to(
                    bar,
                    {
                        scaleY:
                            gsap.utils.random(
                                1.2,
                                4
                            ),

                        opacity:
                            gsap.utils.random(
                                0.45,
                                1
                            ),

                        duration:
                            gsap.utils.random(
                                0.1,
                                0.28
                            ),

                        repeat: -1,
                        yoyo: true,

                        ease:
                            "sine.inOut",

                        delay:
                            gsap.utils.random(
                                0,
                                0.15
                            )
                    }
                );

            }
        );

    }


    // =====================================================
    // STOP AUDIO VISUALIZATION
    // =====================================================

    function stopAudioVisualization() {

        audioBars.forEach(
            bar => {

                gsap.killTweensOf(
                    bar
                );


                gsap.to(
                    bar,
                    {
                        scaleY: 1,
                        opacity: 0.5,

                        duration: 0.15
                    }
                );

            }
        );


        gsap.to(
            audioStatus,
            {
                opacity: 0,

                duration: 0.18
            }
        );

    }


    // =====================================================
    // AUDIO CORRUPTION
    // =====================================================

    function playAudioCorruptionGlitch() {

        gsap.timeline()

            .to(
                archivedLogsWindow,
                {
                    x: -2,

                    duration: 0.035
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 2,

                    duration: 0.035
                }
            )

            .to(
                archivedLogsWindow,
                {
                    x: 0,

                    duration: 0.06
                }
            );


        gsap.timeline()

            .to(
                systemNoise,
                {
                    opacity: 0.11,

                    duration: 0.04
                }
            )

            .to(
                systemNoise,
                {
                    opacity: 0.045,

                    duration: 0.08
                }
            );


        if (
            Math.random() > 0.45
        ) {

            playGlitchSlice();

        }

    }


    // =====================================================
// TRANSICIÓN A ESCENA 05
// =====================================================

function playScene05Transition() {

    return new Promise(
        resolve => {

            const sceneTransition =
                document.querySelector(
                    "#scene-transition"
                );


            const timeline =
                gsap.timeline({

                    onComplete:
                        resolve

                });


            /*
                Micro pausa después
                del último fragmento.
            */

            timeline.to(
                {},
                {
                    duration: 0.28
                }
            );


            // -----------------------------------------
            // LOG 08 comienza a colapsar
            // -----------------------------------------

            timeline.to(
                archivedLogsWindow,
                {
                    x: -4,

                    filter:
                        "brightness(1.4)",

                    duration: 0.04
                }
            );


            timeline.to(
                archivedLogsWindow,
                {
                    x: 5,

                    filter:
                        "brightness(0.75)",

                    duration: 0.04
                }
            );


            timeline.to(
                archivedLogsWindow,
                {
                    x: -2,

                    filter:
                        "brightness(1.2)",

                    duration: 0.04
                }
            );


            // -----------------------------------------
            // Glitch slices
            // -----------------------------------------

            timeline.to(
                glitchLayers[0],
                {
                    opacity: 0.48,
                    x: 24,

                    duration: 0.04
                },

                "<"
            );


            timeline.to(
                glitchLayers[1],
                {
                    opacity: 0.36,
                    x: -26,

                    duration: 0.04
                },

                "<"
            );


            timeline.to(
                glitchLayers[2],
                {
                    opacity: 0.3,
                    x: 18,

                    duration: 0.04
                },

                "<"
            );


            // -----------------------------------------
            // Pantalla completa empieza a fallar
            // -----------------------------------------

            timeline.to(
                interfaceElement,
                {
                    x: -3,

                    scaleX: 1.005,

                    filter:
                        "brightness(1.3)",

                    duration: 0.045
                }
            );


            timeline.to(
                interfaceElement,
                {
                    x: 4,

                    scaleX: 0.996,

                    duration: 0.045
                }
            );


            timeline.to(
                interfaceElement,
                {
                    x: 0,
                    scaleX: 1,

                    duration: 0.06
                }
            );


            // -----------------------------------------
            // Flash / blackout breve
            // -----------------------------------------

            timeline.to(
                systemFlash,
                {
                    opacity: 0.1,

                    duration: 0.035
                }
            );


            timeline.to(
                systemFlash,
                {
                    opacity: 0,

                    duration: 0.05
                }
            );


            timeline.to(
                sceneTransition,
                {
                    opacity: 0.45,

                    duration: 0.05
                }
            );


            timeline.to(
                sceneTransition,
                {
                    opacity: 0.08,

                    duration: 0.04
                }
            );


            // -----------------------------------------
            // Último fallo fuerte
            // -----------------------------------------

            timeline.to(
                archivedLogsWindow,
                {
                    opacity: 0.25,
                    x: 8,

                    duration: 0.04
                }
            );


            timeline.to(
                interfaceElement,
                {
                    opacity: 0.45,
                    x: -6,

                    duration: 0.04
                },

                "<"
            );


            timeline.to(
                glitchLayers,
                {
                    opacity: 0,

                    duration: 0.05
                }
            );


            timeline.to(
                [
                    archivedLogsWindow,
                    interfaceElement
                ],
                {
                    opacity: 1,
                    x: 0,

                    duration: 0.045
                }
            );


            // -----------------------------------------
            // BLACKOUT FINAL
            // -----------------------------------------

            timeline.to(
                sceneTransition,
                {
                    opacity: 1,

                    duration: 0.14,

                    ease:
                        "power2.in"
                }
            );

        }
    );

}


    // =====================================================
    // GLITCH SLICE
    // =====================================================

    function playGlitchSlice() {

        const layer =
            glitchLayers[
                Math.floor(
                    Math.random() *
                    glitchLayers.length
                )
            ];


        gsap.timeline()

            .set(
                layer,
                {
                    x:
                        gsap.utils.random(
                            -18,
                            18
                        )
                }
            )

            .to(
                layer,
                {
                    opacity:
                        gsap.utils.random(
                            0.18,
                            0.42
                        ),

                    duration: 0.035
                }
            )

            .to(
                layer,
                {
                    opacity: 0,
                    x: 0,

                    duration: 0.055
                }
            );

    }


    // =====================================================
    // RANDOM FEED FAILURE
    // =====================================================

    function scheduleRandomFeedFailure() {

        gsap.delayedCall(

            gsap.utils.random(
                3.2,
                6.5
            ),

            () => {

                const random =
                    Math.random();


                /*
                    Diferentes fallos aleatorios.
                */

                if (
                    random < 0.35
                ) {

                    playMinorStatic();

                }

                else if (
                    random < 0.65
                ) {

                    playVideoBlackout();

                }

                else if (
                    random < 0.88
                ) {

                    playFeedError();

                }

                else {

                    playFeedAnomaly();

                }


                scheduleRandomFeedFailure();

            }

        );

    }


    // =====================================================
    // MINOR STATIC
    // =====================================================

    function playMinorStatic() {

        gsap.timeline()

            .to(
                videoStatic,
                {
                    opacity:
                        gsap.utils.random(
                            0.18,
                            0.42
                        ),

                    duration: 0.035
                }
            )

            .to(
                [
                    cameraVideo,
                    videoPlaceholder
                ],
                {
                    x:
                        gsap.utils.random(
                            -2,
                            2
                        ),

                    duration: 0.035
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
                videoStatic,
                {
                    opacity: 0,

                    duration: 0.07
                },

                "<"
            );

    }


    // =====================================================
    // BLACKOUT
    // =====================================================

    function playVideoBlackout() {

        gsap.timeline()

            .to(
                videoBlackout,
                {
                    opacity: 0.85,

                    duration: 0.035
                }
            )

            .to(
                videoBlackout,
                {
                    opacity: 0.08,

                    duration: 0.04
                }
            )

            .to(
                videoBlackout,
                {
                    opacity: 0.7,

                    duration: 0.025
                }
            )

            .to(
                videoBlackout,
                {
                    opacity: 0,

                    duration: 0.06
                }
            );

    }


    // =====================================================
    // FEED ERROR
    // =====================================================

    function playFeedError() {

        gsap.timeline()

            .to(
                feedErrorMessage,
                {
                    opacity: 1,

                    duration: 0.05
                }
            )

            .to(
                feedErrorMessage,
                {
                    opacity: 0,

                    duration: 0.05
                },

                "+=0.08"
            );


        playMinorStatic();

    }


    // =====================================================
    // FEED ANOMALY
    // =====================================================

    function playFeedAnomaly() {

        /*
            Muy corta.
            Sigue siendo un indicio,
            no una aparición evidente.
        */

        gsap.timeline()

            .to(
                feedAnomaly,
                {
                    opacity: 0.22,

                    duration: 0.04
                }
            )

            .to(
                feedAnomaly,
                {
                    opacity: 0.08,

                    duration: 0.035
                }
            )

            .to(
                feedAnomaly,
                {
                    opacity: 0,

                    duration: 0.045
                }
            );


        playMinorStatic();

    }


    // =====================================================
    // RANDOM GLOBAL GLITCH
    // =====================================================

    function scheduleRandomGlobalGlitch() {

        gsap.delayedCall(

            gsap.utils.random(
                2.8,
                5.3
            ),

            () => {

                gsap.timeline()

                    .to(
                        interfaceElement,
                        {
                            x:
                                gsap.utils.random(
                                    -2.5,
                                    2.5
                                ),

                            opacity:
                                gsap.utils.random(
                                    0.88,
                                    0.97
                                ),

                            duration: 0.035
                        }
                    )

                    .to(
                        interfaceElement,
                        {
                            x: 0,
                            opacity: 1,

                            duration: 0.065
                        }
                    );


                if (
                    Math.random() > 0.4
                ) {

                    playInterferenceLine();

                }


                if (
                    Math.random() > 0.65
                ) {

                    playGlitchSlice();

                }


                scheduleRandomGlobalGlitch();

            }

        );

    }


    // =====================================================
    // SIGNAL STRENGTH
    // =====================================================

    function animateSignalStrength() {

        const values = [

            64,
            62,
            68,
            59,
            71,
            66,
            58,
            69,
            61,
            73

        ];


        function updateSignal() {

            const value =
                values[
                    Math.floor(
                        Math.random() *
                        values.length
                    )
                ];


            signalStrength.textContent =
                `${value}%`;


            if (
                value <= 60
            ) {

                gsap.fromTo(
                    signalStrength,

                    {
                        opacity: 0.25
                    },

                    {
                        opacity: 1,

                        duration: 0.1
                    }
                );

            }


            gsap.delayedCall(

                gsap.utils.random(
                    1,
                    2.4
                ),

                updateSignal

            );

        }


        updateSignal();

    }


    // =====================================================
    // DATA STREAM
    // =====================================================

    function animateDataStream() {

        gsap.to(
            dataStatus,
            {
                opacity: 0.48,

                duration: 1,

                repeat: -1,
                yoyo: true,

                ease:
                    "sine.inOut"
            }
        );

    }


    // =====================================================
    // LIVE DOT
    // =====================================================

    function animateLiveDot() {

        gsap.to(
            liveDot,
            {
                opacity: 0.35,

                duration: 0.75,

                repeat: -1,
                yoyo: true,

                ease:
                    "steps(2)"
            }
        );

    }


    // =====================================================
    // NOISE
    // =====================================================

    function animateNoise() {

        gsap.to(
            systemNoise,
            {
                opacity: 0.075,

                duration: 1.4,

                repeat: -1,
                yoyo: true,

                ease:
                    "sine.inOut"
            }
        );


        gsap.to(
            videoNoise,
            {
                opacity: 0.08,

                duration: 1.1,

                repeat: -1,
                yoyo: true,

                ease:
                    "sine.inOut"
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

        animateLiveDot();

        animateNoise();

        scheduleRandomFeedFailure();

        scheduleRandomGlobalGlitch();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        showSystemLog,

        showSystemCursor,

        playFeedDisturbance,

        playArchiveWarning,

        playCameraDenied,

        showCameraDeniedMessage,

        playAggressiveDeniedGlitch,

        openArchivedLogs,

        closeArchivedLogs,

        showArchivedLogContent,

        playLockedModalFeedback,

        playAudioButtonFeedback,

        startAudioVisualization,

        stopAudioVisualization,

        playAudioCorruptionGlitch,

        playScene05Transition

    };


})();