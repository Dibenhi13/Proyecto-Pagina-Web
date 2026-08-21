// =========================================================
// ESCENA 06 — ANIMACIONES GSAP
// Compromised Transmission
// The Lost Ship
// =========================================================


window.Scene06Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const interfaceElement =
        document.querySelector(
            "#transmission-interface"
        );


    const header =
        document.querySelector(
            "#system-header"
        );


    const cameraPanel =
        document.querySelector(
            "#camera-panel"
        );


    const transmissionPanel =
        document.querySelector(
            "#transmission-panel"
        );


    const transcriptPanel =
        document.querySelector(
            "#transcript-panel"
        );


    const logsPanel =
        document.querySelector(
            "#logs-panel"
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


    const connectionStatus =
        document.querySelector(
            "#connection-status"
        );


    const systemLogCursor =
        document.querySelector(
            "#system-log-cursor"
        );


    const cursorBlock =
        document.querySelector(
            "#cursor-block"
        );


    const audioVisualizer =
        document.querySelector(
            "#audio-visualizer"
        );


    const audioBars =
        document.querySelectorAll(
            "#audio-visualizer span"
        );


    const playButton =
        document.querySelector(
            "#play-transmission-audio"
        );


    const videoFeed01 =
        document.querySelector(
            "#video-feed-01"
        );


    const videoFeed02 =
        document.querySelector(
            "#video-feed-02"
        );


    const video01 =
        document.querySelector(
            "#scene06-video-01"
        );


    const video02 =
        document.querySelector(
            "#scene06-video-02"
        );


    const videoStatic01 =
        document.querySelector(
            "#video-static-01"
        );


    const videoStatic02 =
        document.querySelector(
            "#video-static-02"
        );


    const videoBlackout01 =
        document.querySelector(
            "#video-blackout-01"
        );


    const videoBlackout02 =
        document.querySelector(
            "#video-blackout-02"
        );


    const videoAnomaly01 =
        document.querySelector(
            "#video-anomaly-01"
        );


    const videoAnomaly02 =
        document.querySelector(
            "#video-anomaly-02"
        );


    const videoError01 =
        document.querySelector(
            "#video-error-01"
        );


    const videoError02 =
        document.querySelector(
            "#video-error-02"
        );


    const systemErrorOverlay =
        document.querySelector(
            "#system-error-overlay"
        );


    const systemErrorMessage =
        document.querySelector(
            "#system-error-message"
        );


    const transmissionLost =
        document.querySelector(
            "#transmission-lost"
        );


    const transmissionLostWindow =
        document.querySelector(
            "#transmission-lost-window"
        );


    const glitchLayers = [
        document.querySelector("#glitch-layer-01"),
        document.querySelector("#glitch-layer-02"),
        document.querySelector("#glitch-layer-03"),
        document.querySelector("#glitch-layer-04")
    ];


    const interferenceLines = [
        document.querySelector("#interference-line-01"),
        document.querySelector("#interference-line-02"),
        document.querySelector("#interference-line-03")
    ];


    const systemFlash =
        document.querySelector(
            "#system-flash"
        );


    const sceneTransition =
        document.querySelector(
            "#scene-transition"
        );


    // =====================================================
    // ESTADO
    // =====================================================

    let instabilityLevel = 1;

    let playbackActive = false;

    let sceneEnding = false;


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
            transmissionPanel,
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
            audioVisualizer,
            {
                opacity: 0
            }
        );


        gsap.set(
            [
                videoStatic01,
                videoStatic02,
                videoBlackout01,
                videoBlackout02,
                videoAnomaly01,
                videoAnomaly02,
                videoError01,
                videoError02
            ],
            {
                opacity: 0
            }
        );


        gsap.set(
            systemErrorOverlay,
            {
                opacity: 0
            }
        );


        gsap.set(
            transmissionLost,
            {
                opacity: 0,
                visibility: "hidden",
                pointerEvents: "none"
            }
        );


        gsap.set(
            transmissionLostWindow,
            {
                opacity: 0,
                scale: 0.98
            }
        );


        gsap.set(
            glitchLayers,
            {
                opacity: 0,
                x: 0
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


        gsap.set(
            sceneTransition,
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
                    onComplete: resolve
                })

                    .to(
                        {},
                        {
                            duration: 0.16
                        }
                    )

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.4,
                            x: 22,
                            duration: 0.04
                        }
                    )

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.3,
                            x: -24,
                            duration: 0.04
                        },
                        "<"
                    )

                    .to(
                        glitchLayers,
                        {
                            opacity: 0,
                            x: 0,
                            duration: 0.06
                        }
                    )

                    .to(
                        interfaceElement,
                        {
                            opacity: 1,
                            duration: 0.14
                        }
                    )

                    .to(
                        header,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.16
                        }
                    )

                    .to(
                        cameraPanel,
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.18
                        }
                    )

                    .to(
                        logsPanel,
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.18
                        },
                        "-=0.13"
                    )

                    .to(
                        transmissionPanel,
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.22
                        },
                        "-=0.1"
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
        element
    ) {

        gsap.fromTo(
            element,

            {
                opacity: 0,
                x: -3
            },

            {
                opacity: 1,
                x: 0,
                duration: 0.17
            }
        );

    }


    // =====================================================
    // CURSOR
    // =====================================================

    function showCursor() {

        gsap.set(
            systemLogCursor,
            {
                opacity: 1
            }
        );


        gsap.to(
            cursorBlock,
            {
                opacity: 0.12,

                duration: 0.34,

                repeat: -1,

                yoyo: true,

                ease: "steps(1)"
            }
        );

    }


    // =====================================================
    // DENIED CONTROL
    // =====================================================

    function playDeniedControl(
        button,
        messageElement
    ) {

        if (sceneEnding) {
            return;
        }


        gsap.killTweensOf(
            button
        );


        gsap.timeline()

            .to(
                button,
                {
                    x: -3,
                    opacity: 0.4,
                    duration: 0.035
                }
            )

            .to(
                button,
                {
                    x: 3,
                    opacity: 1,
                    duration: 0.035
                }
            )

            .to(
                button,
                {
                    x: 0,
                    duration: 0.06
                }
            );


        if (messageElement) {

            gsap.killTweensOf(
                messageElement
            );


            gsap.timeline()

                .to(
                    messageElement,
                    {
                        opacity: 1,
                        duration: 0.06
                    }
                )

                .to(
                    messageElement,
                    {
                        opacity: 0,
                        duration: 0.18
                    },
                    "+=0.65"
                );

        }


        playGlitchSlice();

    }


    // =====================================================
    // TRANSCRIPT
    // =====================================================

    function showTranscriptLine(
        element,
        index
    ) {

        gsap.fromTo(
            element,

            {
                opacity: 0,
                x: -4
            },

            {
                opacity: 1,
                x: 0,
                duration: 0.18
            }
        );


        /*
            Mientras más tarde aparece,
            más dañada se siente.
        */

        if (
            index >= 1
        ) {

            gsap.timeline()

                .to(
                    element,
                    {
                        x: 2,
                        opacity: 0.55,
                        duration: 0.035
                    }
                )

                .to(
                    element,
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.06
                    }
                );

        }


        if (
            index >= 2
        ) {

            playGlitchSlice();

        }


        if (
            index === 3
        ) {

            playTranscriptFailure();

        }

    }


    // =====================================================
    // TRANSCRIPT FAILURE
    // =====================================================

    function playTranscriptFailure() {

        gsap.timeline()

            .to(
                transcriptPanel,
                {
                    x: -4,
                    filter:
                        "brightness(1.5)",
                    duration: 0.035
                }
            )

            .to(
                transcriptPanel,
                {
                    x: 4,
                    filter:
                        "brightness(0.7)",
                    duration: 0.035
                }
            )

            .to(
                transcriptPanel,
                {
                    x: 0,
                    filter:
                        "brightness(1)",
                    duration: 0.07
                }
            );


        playInterferenceLine();

    }


    // =====================================================
    // PLAYBACK STATE
    // =====================================================

    function startPlaybackState() {

        playbackActive =
            true;


        gsap.to(
            audioVisualizer,
            {
                opacity: 1,
                duration: 0.12
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
                                1.3,
                                4.5
                            ),

                        opacity:
                            gsap.utils.random(
                                0.45,
                                1
                            ),

                        duration:
                            gsap.utils.random(
                                0.09,
                                0.26
                            ),

                        repeat: -1,
                        yoyo: true,

                        ease: "sine.inOut",

                        delay:
                            gsap.utils.random(
                                0,
                                0.12
                            )
                    }
                );

            }
        );


        gsap.timeline()

            .to(
                playButton,
                {
                    background:
                        "rgba(0,255,56,0.08)",

                    boxShadow:
                        "0 0 12px rgba(0,255,56,0.25)",

                    duration: 0.08
                }
            )

            .to(
                playButton,
                {
                    background:
                        "rgba(0,255,56,0.015)",

                    duration: 0.15
                }
            );


        playMinorCorruption();

    }


    // =====================================================
    // STOP PLAYBACK STATE
    // =====================================================

    function stopPlaybackState() {

        playbackActive =
            false;


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
                        duration: 0.12
                    }
                );

            }
        );


        gsap.to(
            audioVisualizer,
            {
                opacity: 0,
                duration: 0.15
            }
        );

    }


    // =====================================================
    // RESTORE VIDEO FEED
    // =====================================================

    function restoreVideoFeed(
        feedNumber
    ) {

        const feed =
            feedNumber === 1
                ? videoFeed01
                : videoFeed02;


        const video =
            feedNumber === 1
                ? video01
                : video02;


        const staticLayer =
            feedNumber === 1
                ? videoStatic01
                : videoStatic02;


        gsap.timeline()

            .to(
                staticLayer,
                {
                    opacity: 0.65,
                    duration: 0.05
                }
            )

            .to(
                feed,
                {
                    x: -3,
                    opacity: 0.6,
                    duration: 0.04
                },
                "<"
            )

            .to(
                feed,
                {
                    x: 3,
                    opacity: 1,
                    duration: 0.04
                }
            )

            .to(
                staticLayer,
                {
                    opacity: 0,
                    duration: 0.09
                }
            )

            .to(
                feed,
                {
                    x: 0,
                    duration: 0.06
                },
                "<"
            );


        gsap.fromTo(
            video,

            {
                opacity: 0.2
            },

            {
                opacity: 0.82,
                duration: 0.2
            }
        );


        playInterferenceLine();

    }


    // =====================================================
    // FEED ANOMALY
    // =====================================================

    function playFeedAnomaly(
        feedNumber
    ) {

        const anomaly =
            feedNumber === 1
                ? videoAnomaly01
                : videoAnomaly02;


        const staticLayer =
            feedNumber === 1
                ? videoStatic01
                : videoStatic02;


        const feed =
            feedNumber === 1
                ? videoFeed01
                : videoFeed02;


        /*
            Algo aparece apenas el tiempo
            suficiente para dudar si se vio.
        */

        gsap.timeline()

            .to(
                staticLayer,
                {
                    opacity: 0.22,
                    duration: 0.04
                }
            )

            .to(
                anomaly,
                {
                    opacity: 0.28,
                    duration: 0.045
                },
                "<"
            )

            .to(
                anomaly,
                {
                    opacity: 0.09,
                    duration: 0.04
                }
            )

            .to(
                anomaly,
                {
                    opacity: 0,
                    duration: 0.05
                }
            )

            .to(
                staticLayer,
                {
                    opacity: 0,
                    duration: 0.07
                },
                "<"
            );


        gsap.timeline()

            .to(
                feed,
                {
                    x: -2,
                    duration: 0.035
                }
            )

            .to(
                feed,
                {
                    x: 0,
                    duration: 0.06
                }
            );

    }


    // =====================================================
    // BOTH FEED FAILURE
    // =====================================================

    function playBothFeedFailure() {

        gsap.timeline()

            .to(
                [
                    videoStatic01,
                    videoStatic02
                ],
                {
                    opacity: 0.55,
                    duration: 0.04
                }
            )

            .to(
                [
                    videoFeed01,
                    videoFeed02
                ],
                {
                    x: index =>
                        index === 0
                            ? -5
                            : 5,

                    filter:
                        "brightness(1.45)",

                    duration: 0.04
                },
                "<"
            )

            .to(
                [
                    videoBlackout01,
                    videoBlackout02
                ],
                {
                    opacity: 0.7,
                    duration: 0.035
                }
            )

            .to(
                [
                    videoBlackout01,
                    videoBlackout02
                ],
                {
                    opacity: 0,
                    duration: 0.05
                }
            )

            .to(
                [
                    videoFeed01,
                    videoFeed02
                ],
                {
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.07
                }
            )

            .to(
                [
                    videoStatic01,
                    videoStatic02
                ],
                {
                    opacity: 0,
                    duration: 0.08
                },
                "<"
            );


        playGlitchSlice();

        playInterferenceLine();

    }


    // =====================================================
    // ERROR OVERLAY
    // =====================================================

    function showSystemError(
        message
    ) {

        if (
            !systemErrorMessage
        ) {
            return;
        }


        systemErrorMessage.textContent =
            message;


        gsap.killTweensOf(
            systemErrorOverlay
        );


        gsap.timeline()

            .to(
                systemErrorOverlay,
                {
                    opacity: 1,
                    duration: 0.055
                }
            )

            .to(
                systemErrorMessage,
                {
                    x: -4,
                    duration: 0.035
                }
            )

            .to(
                systemErrorMessage,
                {
                    x: 4,
                    duration: 0.035
                }
            )

            .to(
                systemErrorMessage,
                {
                    x: 0,
                    duration: 0.05
                }
            )

            .to(
                systemErrorOverlay,
                {
                    opacity: 0,
                    duration: 0.12
                },
                "+=0.35"
            );


        playGlitchSlice();

    }


    // =====================================================
    // MINOR CORRUPTION
    // =====================================================

    function playMinorCorruption() {

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    x: -2,
                    opacity: 0.91,
                    duration: 0.035
                }
            )

            .to(
                interfaceElement,
                {
                    x: 2,
                    opacity: 1,
                    duration: 0.035
                }
            )

            .to(
                interfaceElement,
                {
                    x: 0,
                    duration: 0.06
                }
            );


        playInterferenceLine();

    }


    // =====================================================
    // INCREASE INSTABILITY
    // =====================================================

    function increaseInstability(
        level
    ) {

        instabilityLevel =
            Math.max(
                instabilityLevel,
                level
            );


        /*
            Cambio de nivel visible.
        */

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    x: -5,
                    filter:
                        "brightness(1.55)",
                    duration: 0.04
                }
            )

            .to(
                glitchLayers[0],
                {
                    opacity:
                        0.3 +
                        level * 0.06,

                    x:
                        15 +
                        level * 3,

                    duration: 0.04
                },
                "<"
            )

            .to(
                glitchLayers[1],
                {
                    opacity:
                        0.24 +
                        level * 0.05,

                    x:
                        -18 -
                        level * 3,

                    duration: 0.04
                },
                "<"
            )

            .to(
                interfaceElement,
                {
                    x: 6,
                    filter:
                        "brightness(0.65)",
                    duration: 0.04
                }
            )

            .to(
                interfaceElement,
                {
                    x: 0,
                    filter:
                        "brightness(1)",
                    duration: 0.08
                }
            )

            .to(
                glitchLayers,
                {
                    opacity: 0,
                    x: 0,
                    duration: 0.06
                },
                "<"
            );


        if (
            instabilityLevel >= 3
        ) {

            gsap.delayedCall(
                0.12,
                playPanelFailure
            );

        }


        if (
            instabilityLevel >= 4
        ) {

            gsap.delayedCall(
                0.22,
                playCriticalFailure
            );

        }

    }


    // =====================================================
    // PANEL FAILURE
    // =====================================================

    function playPanelFailure() {

        const panels = [
            cameraPanel,
            transcriptPanel,
            logsPanel,
            videoFeed01,
            videoFeed02
        ];


        const target =
            panels[
                Math.floor(
                    Math.random() *
                    panels.length
                )
            ];


        gsap.timeline()

            .to(
                target,
                {
                    opacity:
                        instabilityLevel >= 4
                            ? 0.22
                            : 0.48,

                    x:
                        gsap.utils.random(
                            -4,
                            4
                        ),

                    filter:
                        "brightness(1.6)",

                    duration: 0.035
                }
            )

            .to(
                target,
                {
                    opacity: 1,
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.07
                }
            );

    }


    // =====================================================
    // CRITICAL FAILURE
    // =====================================================

    function playCriticalFailure() {

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    x: -7,
                    opacity: 0.42,

                    filter:
                        "brightness(1.8)",

                    duration: 0.035
                }
            )

            .to(
                glitchLayers,
                {
                    opacity: 0.55,
                    duration: 0.035
                },
                "<"
            )

            .to(
                systemFlash,
                {
                    opacity: 0.1,
                    duration: 0.025
                },
                "<"
            )

            .to(
                interfaceElement,
                {
                    x: 8,
                    opacity: 0.86,

                    filter:
                        "brightness(0.5)",

                    duration: 0.04
                }
            )

            .to(
                interfaceElement,
                {
                    x: 0,
                    opacity: 1,

                    filter:
                        "brightness(1)",

                    duration: 0.07
                }
            )

            .to(
                [
                    glitchLayers,
                    systemFlash
                ],
                {
                    opacity: 0,
                    duration: 0.06
                },
                "<"
            );


        playBothFeedFailure();

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
                        8,
                        92
                    )}%`,

                xPercent: -25
            }
        );


        gsap.timeline()

            .to(
                line,
                {
                    opacity:
                        instabilityLevel >= 3
                            ? 0.65
                            : 0.42,

                    xPercent: 18,

                    duration: 0.035
                }
            )

            .to(
                line,
                {
                    opacity: 0,
                    xPercent: 0,

                    duration: 0.06
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


        const strength =
            14 +
            instabilityLevel * 4;


        gsap.timeline()

            .set(
                layer,
                {
                    x:
                        gsap.utils.random(
                            -strength,
                            strength
                        )
                }
            )

            .to(
                layer,
                {
                    opacity:
                        0.2 +
                        instabilityLevel * 0.07,

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
    // CORRUPTION LOOP
    // =====================================================

    function corruptionLoop() {

        let min;
        let max;


        switch (
            instabilityLevel
        ) {

            case 1:
                min = 1.9;
                max = 3.8;
                break;

            case 2:
                min = 1.1;
                max = 2.2;
                break;

            case 3:
                min = 0.55;
                max = 1.3;
                break;

            default:
                min = 0.25;
                max = 0.7;
        }


        gsap.delayedCall(
            gsap.utils.random(
                min,
                max
            ),

            () => {

                if (sceneEnding) {
                    return;
                }


                const random =
                    Math.random();


                playGlitchSlice();


                if (
                    random > 0.35
                ) {

                    playInterferenceLine();

                }


                if (
                    instabilityLevel >= 2 &&
                    random > 0.45
                ) {

                    playPanelFailure();

                }


                if (
                    instabilityLevel >= 3 &&
                    random > 0.68
                ) {

                    playRandomFeedDamage();

                }


                if (
                    instabilityLevel >= 4 &&
                    random > 0.76
                ) {

                    playCriticalFailure();

                }


                corruptionLoop();

            }
        );

    }


    // =====================================================
    // RANDOM FEED DAMAGE
    // =====================================================

    function playRandomFeedDamage() {

        const feedNumber =
            Math.random() > 0.5
                ? 1
                : 2;


        const staticLayer =
            feedNumber === 1
                ? videoStatic01
                : videoStatic02;


        const blackout =
            feedNumber === 1
                ? videoBlackout01
                : videoBlackout02;


        const feed =
            feedNumber === 1
                ? videoFeed01
                : videoFeed02;


        gsap.timeline()

            .to(
                staticLayer,
                {
                    opacity: 0.35,
                    duration: 0.035
                }
            )

            .to(
                feed,
                {
                    x:
                        gsap.utils.random(
                            -3,
                            3
                        ),
                    duration: 0.035
                },
                "<"
            )

            .to(
                blackout,
                {
                    opacity: 0.65,
                    duration: 0.025
                }
            )

            .to(
                blackout,
                {
                    opacity: 0,
                    duration: 0.045
                }
            )

            .to(
                staticLayer,
                {
                    opacity: 0,
                    duration: 0.06
                },
                "<"
            )

            .to(
                feed,
                {
                    x: 0,
                    duration: 0.05
                },
                "<"
            );

    }


    // =====================================================
    // SIGNAL LOOP
    // =====================================================

    function signalLoop() {

        let min;
        let max;
        let delay;


        switch (
            instabilityLevel
        ) {

            case 1:
                min = 61;
                max = 74;
                delay = 1.6;
                break;

            case 2:
                min = 48;
                max = 70;
                delay = 1;
                break;

            case 3:
                min = 31;
                max = 62;
                delay = 0.58;
                break;

            default:
                min = 16;
                max = 51;
                delay = 0.32;
        }


        const value =
            Math.round(
                gsap.utils.random(
                    min,
                    max
                )
            );


        signalStrength.textContent =
            `${value}%`;


        if (
            instabilityLevel >= 3 &&
            Math.random() > 0.65
        ) {

            signalStrength.textContent =
                "--%";


            gsap.delayedCall(
                0.07,

                () => {

                    signalStrength.textContent =
                        `${value}%`;

                }
            );

        }


        gsap.delayedCall(
            delay,
            signalLoop
        );

    }


    // =====================================================
    // CONNECTION / DATA LOOP
    // =====================================================

    function statusLoop() {

        gsap.delayedCall(
            0.9,

            () => {

                if (
                    !sceneEnding &&
                    instabilityLevel >= 3
                ) {

                    if (
                        Math.random() > 0.68
                    ) {

                        const connectionOriginal =
                            connectionStatus.textContent;


                        connectionStatus.textContent =
                            Math.random() > 0.5
                                ? "CONNEC▒ED"
                                : "ERR_██";


                        gsap.delayedCall(
                            0.1,

                            () => {

                                connectionStatus.textContent =
                                    connectionOriginal;

                            }
                        );

                    }


                    if (
                        Math.random() > 0.67
                    ) {

                        const dataOriginal =
                            dataStatus.textContent;


                        dataStatus.textContent =
                            "ERR";


                        gsap.delayedCall(
                            0.12,

                            () => {

                                dataStatus.textContent =
                                    dataOriginal;

                            }
                        );

                    }

                }


                statusLoop();

            }
        );

    }


    // =====================================================
    // TRANSMISSION LOST → SCENE 07
    // =====================================================

    function playTransmissionLostSequence() {

        sceneEnding =
            true;


        return new Promise(
            resolve => {

                gsap.set(
                    transmissionLost,
                    {
                        visibility:
                            "visible",

                        pointerEvents:
                            "auto"
                    }
                );


                const timeline =
                    gsap.timeline({
                        onComplete: resolve
                    });


                /*
                    Audio terminó.
                    Ambos feeds muestran una
                    última reacción simultánea.
                */

                timeline.to(
                    [
                        videoAnomaly01,
                        videoAnomaly02
                    ],
                    {
                        opacity: 0.3,
                        duration: 0.045
                    }
                );


                timeline.to(
                    [
                        videoStatic01,
                        videoStatic02
                    ],
                    {
                        opacity: 0.72,
                        duration: 0.04
                    },
                    "<"
                );


                timeline.to(
                    interfaceElement,
                    {
                        x: -8,
                        filter:
                            "brightness(1.9)",
                        duration: 0.04
                    }
                );


                timeline.to(
                    interfaceElement,
                    {
                        x: 10,
                        filter:
                            "brightness(0.45)",
                        duration: 0.04
                    }
                );


                /*
                    Se pierde la imagen.
                */

                timeline.to(
                    [
                        videoBlackout01,
                        videoBlackout02
                    ],
                    {
                        opacity: 1,
                        duration: 0.06
                    }
                );


                timeline.to(
                    [
                        videoAnomaly01,
                        videoAnomaly02,
                        videoStatic01,
                        videoStatic02
                    ],
                    {
                        opacity: 0,
                        duration: 0.05
                    },
                    "<"
                );


                /*
                    Interfaz colapsa.
                */

                timeline.to(
                    glitchLayers,
                    {
                        opacity: 0.65,
                        duration: 0.04
                    }
                );


                timeline.to(
                    systemFlash,
                    {
                        opacity: 0.12,
                        duration: 0.03
                    },
                    "<"
                );


                timeline.to(
                    interfaceElement,
                    {
                        opacity: 0.25,
                        x: -12,
                        duration: 0.04
                    },
                    "<"
                );


                timeline.to(
                    interfaceElement,
                    {
                        opacity: 0,
                        x: 10,
                        duration: 0.05
                    }
                );


                /*
                    TRANSMISSION LOST
                */

                timeline.to(
                    transmissionLost,
                    {
                        opacity: 1,
                        duration: 0.08
                    }
                );


                timeline.to(
                    transmissionLostWindow,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.11
                    }
                );


                timeline.to(
                    transmissionLostWindow,
                    {
                        x: -4,
                        duration: 0.035
                    }
                );


                timeline.to(
                    transmissionLostWindow,
                    {
                        x: 5,
                        duration: 0.035
                    }
                );


                timeline.to(
                    transmissionLostWindow,
                    {
                        x: 0,
                        duration: 0.05
                    }
                );


                /*
                    Tiempo para leer.
                */

                timeline.to(
                    {},
                    {
                        duration: 0.85
                    }
                );


                /*
                    Último corte.
                */

                timeline.to(
                    transmissionLostWindow,
                    {
                        opacity: 0.2,
                        x: 8,
                        duration: 0.04
                    }
                );


                timeline.to(
                    glitchLayers,
                    {
                        opacity: 0.8,
                        duration: 0.04
                    },
                    "<"
                );


                /*
                    Blackout.
                */

                timeline.to(
                    sceneTransition,
                    {
                        opacity: 1,

                        duration: 0.15,

                        ease:
                            "power2.in"
                    }
                );

            }
        );

    }


    // =====================================================
    // INIT
    // =====================================================

    function init() {

        setInitialState();

        corruptionLoop();

        signalLoop();

        statusLoop();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        showSystemLog,

        showCursor,

        playDeniedControl,

        showTranscriptLine,

        startPlaybackState,

        stopPlaybackState,

        restoreVideoFeed,

        playFeedAnomaly,

        playBothFeedFailure,

        showSystemError,

        playMinorCorruption,

        increaseInstability,

        playCriticalFailure,

        playTransmissionLostSequence

    };


})();