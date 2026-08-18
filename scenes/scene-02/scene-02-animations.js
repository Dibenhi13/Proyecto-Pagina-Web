// =========================================================
// ESCENA 02 — ANIMACIONES GSAP
// Surveillance Interface
// The Lost Ship
// =========================================================


window.Scene02Animations = (() => {


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

    }


    // =====================================================
    // BOOT
    // =====================================================

    function playInterfaceBoot() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
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
                    onComplete: resolve
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
                    onComplete: resolve
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

                ease: "steps(1)"
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
                yoyo: true
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

        playAudioButtonFeedback

    };


})();


window.Scene02Animations.init();