// =========================================================
// SCENE 10 — SHARED ANIMATIONS
// Open Endings
// The Lost Ship
// =========================================================


window.Scene10Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const scene =
        document.querySelector(
            ".ending-scene"
        );


    const endingFrame =
        document.querySelector(
            "#ending-frame"
        );


    const endingContent =
        document.querySelector(
            "#ending-content"
        );


    const endingNoise =
        document.querySelector(
            "#ending-noise"
        );


    const endingScanlines =
        document.querySelector(
            "#ending-scanlines"
        );


    const authorizeMessage =
        document.querySelector(
            "#authorize-message"
        );


    const ghostTexts =
        Array.from(
            document.querySelectorAll(
                ".ending-ghost-text"
            )
        );


    const interferenceLines =
        Array.from(
            document.querySelectorAll(
                ".interference-line"
            )
        );


    const glitchLayers =
        Array.from(
            document.querySelectorAll(
                ".glitch-layer"
            )
        );


    const endingFlash =
        document.querySelector(
            "#ending-flash"
        );


    const endingWhiteout =
        document.querySelector(
            "#ending-whiteout"
        );


    // =====================================================
    // ESTADO
    // =====================================================

    let corruptionLevel = 0;

    let endingComplete = false;


    // =====================================================
    // INITIAL STATE
    // =====================================================

    function setInitialState() {

        gsap.set(
            endingFrame,
            {
                opacity: 0,
                scale: 0.999
            }
        );


        if (
            authorizeMessage
        ) {

            gsap.set(
                authorizeMessage,
                {
                    opacity: 0,
                    y: 2
                }
            );

        }


        gsap.set(
            ghostTexts,
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
            glitchLayers,
            {
                opacity: 0,
                x: 0
            }
        );


        gsap.set(
            endingFlash,
            {
                opacity: 0
            }
        );


        gsap.set(
            endingWhiteout,
            {
                opacity: 0
            }
        );

    }


    // =====================================================
    // ENTRY
    // =====================================================

    function playSceneEntry() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    /*
                        Negro al inicio.
                    */

                    .to(
                        {},
                        {
                            duration: 0.65
                        }
                    )


                    /*
                        El marco reaparece.
                    */

                    .to(
                        endingFrame,
                        {
                            opacity: 0.2,
                            duration: 0.05
                        }
                    )

                    .to(
                        endingFrame,
                        {
                            opacity: 0,
                            duration: 0.04
                        }
                    )

                    .to(
                        {},
                        {
                            duration: 0.12
                        }
                    )

                    .to(
                        endingFrame,
                        {
                            opacity: 1,
                            scale: 1,

                            duration: 0.65,

                            ease:
                                "power1.out"
                        }
                    );

            }
        );

    }


    // =====================================================
    // AUTHORIZE MESSAGE
    // =====================================================

    function showAuthorizeMessage() {

        if (
            !authorizeMessage
        ) {

            return Promise.resolve();

        }


        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        authorizeMessage,
                        {
                            opacity: 1,

                            y: 0,

                            duration: 0.55,

                            ease:
                                "power1.out"
                        }
                    )

                    .to(
                        authorizeMessage,
                        {
                            opacity: 0.84,

                            duration: 0.035
                        }
                    )

                    .to(
                        authorizeMessage,
                        {
                            opacity: 1,

                            duration: 0.055
                        }
                    )

                    .call(
                        () => {

                            authorizeMessage
                                .classList
                                .add(
                                    "is-stable"
                                );

                        }
                    );

            }
        );

    }


    // =====================================================
    // DENY MESSAGE
    // =====================================================

    function showDenyMessage(
        element,
        number
    ) {

        return new Promise(
            resolve => {

                const timeline =
                    gsap.timeline({
                        onComplete: resolve
                    });


                timeline.fromTo(
                    element,

                    {
                        opacity: 0,

                        y: 3,

                        filter:
                            "brightness(0.8)"
                    },

                    {
                        opacity: 1,

                        y: 0,

                        filter:
                            "brightness(1)",

                        duration: 0.48,

                        ease:
                            "power1.out"
                    }
                );


                /*
                    Segunda línea:
                    flicker pequeñísimo.
                */

                if (
                    number === 2
                ) {

                    timeline
                        .to(
                            element,
                            {
                                opacity: 0.8,
                                duration: 0.035
                            }
                        )

                        .to(
                            element,
                            {
                                opacity: 1,
                                duration: 0.05
                            }
                        );

                }


                /*
                    Integration complete.
                    Aquí ya hay una primera
                    pista de corrupción.
                */

                if (
                    number === 3
                ) {

                    timeline
                        .to(
                            element,
                            {
                                x: -1.5,
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


                /*
                    Welcome back es la línea
                    con mayor peso visual.
                */

                if (
                    number === 4
                ) {

                    timeline
                        .to(
                            element,
                            {
                                filter:
                                    "brightness(1.35)",

                                duration: 0.05
                            }
                        )

                        .to(
                            element,
                            {
                                filter:
                                    "brightness(1)",

                                duration: 0.08
                            }
                        )

                        .call(
                            () => {

                                element
                                    .classList
                                    .add(
                                        "is-stable"
                                    );

                            }
                        );

                }

            }
        );

    }


    // =====================================================
    // CORRUPTION LEVEL
    // =====================================================

    function setCorruptionLevel(
        level
    ) {

        corruptionLevel =
            Math.max(
                corruptionLevel,
                level
            );


        /*
            Quitamos las clases anteriores.
        */

        scene.classList.remove(
            "corruption-1",
            "corruption-2",
            "corruption-3",
            "corruption-4"
        );


        scene.classList.add(
            `corruption-${corruptionLevel}`
        );


        /*
            Reacción inmediata.
        */

        switch (
            corruptionLevel
        ) {

            case 1:

                playSubtleFlicker();

                break;


            case 2:

                playMediumGlitch();

                break;


            case 3:

                playStrongGlitch();

                showGhostText();

                break;


            case 4:

                playStrongGlitch();

                gsap.delayedCall(
                    0.15,
                    playCriticalDropout
                );

                break;

        }

    }


    // =====================================================
    // SUBTLE FLICKER
    // =====================================================

    function playSubtleFlicker() {

        gsap.timeline()

            .to(
                endingFrame,
                {
                    opacity: 0.86,
                    duration: 0.035
                }
            )

            .to(
                endingFrame,
                {
                    opacity: 1,
                    duration: 0.065
                }
            );


        playInterferenceLine(
            0.1
        );

    }


    // =====================================================
    // INTERFERENCE
    // =====================================================

    function playInterferenceLine(
        opacity = 0.25
    ) {

        if (
            interferenceLines.length === 0
        ) {

            return;

        }


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
                        12,
                        88
                    )}%`,

                xPercent: -20,

                height:
                    `${gsap.utils.random(
                        1,
                        corruptionLevel >= 4
                            ? 4
                            : 2
                    )}px`
            }
        );


        gsap.timeline()

            .to(
                line,
                {
                    opacity:
                        opacity,

                    xPercent: 14,

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
    // MEDIUM GLITCH
    // =====================================================

    function playMediumGlitch() {

        if (
            glitchLayers.length === 0
        ) {

            return;

        }


        gsap.timeline()

            .to(
                glitchLayers[0],
                {
                    opacity: 0.26,
                    x: 17,
                    duration: 0.035
                }
            )

            .to(
                glitchLayers[2],
                {
                    opacity: 0.2,
                    x: -20,
                    duration: 0.035
                },
                "<"
            )

            .to(
                endingContent,
                {
                    x: -2,
                    duration: 0.035
                },
                "<"
            )

            .to(
                endingContent,
                {
                    x: 2,
                    duration: 0.035
                }
            )

            .to(
                endingContent,
                {
                    x: 0,
                    duration: 0.055
                }
            )

            .to(
                glitchLayers,
                {
                    opacity: 0,
                    x: 0,
                    duration: 0.055
                },
                "<"
            );


        playInterferenceLine(
            0.24
        );

    }


    // =====================================================
    // STRONG GLITCH
    // =====================================================

    function playStrongGlitch() {

        if (
            glitchLayers.length === 0
        ) {

            return;

        }


        gsap.timeline()

            .to(
                glitchLayers[0],
                {
                    opacity: 0.5,
                    x: 31,
                    duration: 0.03
                }
            )

            .to(
                glitchLayers[1],
                {
                    opacity: 0.4,
                    x: -36,
                    duration: 0.03
                },
                "<"
            )

            .to(
                glitchLayers[3],
                {
                    opacity: 0.32,
                    x: 24,
                    duration: 0.03
                },
                "<"
            )

            .to(
                endingFrame,
                {
                    x: -5,

                    filter:
                        "brightness(1.6)",

                    duration: 0.03
                },
                "<"
            )

            .to(
                endingContent,
                {
                    x: 5,
                    opacity: 0.62,
                    duration: 0.03
                },
                "<"
            )

            .to(
                endingFrame,
                {
                    x: 6,

                    filter:
                        "brightness(0.62)",

                    duration: 0.035
                }
            )

            .to(
                endingContent,
                {
                    x: -4,
                    opacity: 1,
                    duration: 0.035
                },
                "<"
            )

            .to(
                [
                    endingFrame,
                    endingContent
                ],
                {
                    x: 0,
                    opacity: 1,

                    filter:
                        "brightness(1)",

                    duration: 0.065
                }
            )

            .to(
                glitchLayers,
                {
                    opacity: 0,
                    x: 0,
                    duration: 0.055
                },
                "<"
            );


        playInterferenceLine(
            0.45
        );

    }


    // =====================================================
    // GHOST TEXT
    // =====================================================

    function showGhostText() {

        if (
            ghostTexts.length === 0
        ) {

            return;

        }


        ghostTexts.forEach(
            (
                ghost,
                index
            ) => {

                gsap.timeline({
                    delay:
                        index * 0.05
                })

                    .to(
                        ghost,
                        {
                            opacity:
                                gsap.utils.random(
                                    0.08,
                                    0.2
                                ),

                            x:
                                gsap.utils.random(
                                    -4,
                                    4
                                ),

                            duration: 0.035
                        }
                    )

                    .to(
                        ghost,
                        {
                            opacity: 0,
                            x: 0,
                            duration: 0.08
                        }
                    );

            }
        );

    }


    // =====================================================
    // CRITICAL DROPOUT
    // =====================================================

    function playCriticalDropout() {

        gsap.timeline()

            .to(
                endingContent,
                {
                    opacity: 0.08,
                    duration: 0.03
                }
            )

            .to(
                endingFrame,
                {
                    opacity: 0.2,
                    duration: 0.03
                },
                "<"
            )

            .to(
                endingFlash,
                {
                    opacity: 0.08,
                    duration: 0.025
                },
                "<"
            )

            .to(
                endingContent,
                {
                    opacity: 0.82,
                    duration: 0.04
                }
            )

            .to(
                endingFrame,
                {
                    opacity: 0.78,
                    duration: 0.04
                },
                "<"
            )

            .to(
                endingFlash,
                {
                    opacity: 0,
                    duration: 0.04
                },
                "<"
            )

            .to(
                [
                    endingContent,
                    endingFrame
                ],
                {
                    opacity: 1,
                    duration: 0.07
                }
            );

    }


    // =====================================================
    // RANDOM CORRUPTION LOOP
    // =====================================================

    function corruptionLoop() {

        let min;
        let max;


        switch (
            corruptionLevel
        ) {

            case 0:

                min = 5;
                max = 8;

                break;


            case 1:

                min = 2.6;
                max = 4.2;

                break;


            case 2:

                min = 1.5;
                max = 2.8;

                break;


            case 3:

                min = 0.75;
                max = 1.7;

                break;


            default:

                min = 0.3;
                max = 0.8;

        }


        gsap.delayedCall(
            gsap.utils.random(
                min,
                max
            ),

            () => {

                if (
                    endingComplete
                ) {

                    return;

                }


                const random =
                    Math.random();


                if (
                    corruptionLevel === 0
                ) {

                    if (
                        random > 0.78
                    ) {

                        playSubtleFlicker();

                    }

                }


                if (
                    corruptionLevel === 1
                ) {

                    playSubtleFlicker();

                }


                if (
                    corruptionLevel === 2
                ) {

                    if (
                        random > 0.5
                    ) {

                        playMediumGlitch();

                    }
                    else {

                        playSubtleFlicker();

                    }

                }


                if (
                    corruptionLevel === 3
                ) {

                    playMediumGlitch();


                    if (
                        random > 0.48
                    ) {

                        showGhostText();

                    }


                    if (
                        random > 0.75
                    ) {

                        playStrongGlitch();

                    }

                }


                if (
                    corruptionLevel >= 4
                ) {

                    playStrongGlitch();


                    if (
                        random > 0.35
                    ) {

                        showGhostText();

                    }


                    if (
                        random > 0.55
                    ) {

                        playCriticalDropout();

                    }

                }


                corruptionLoop();

            }
        );

    }


    // =====================================================
    // NOISE MOVEMENT
    // =====================================================

    function noiseLoop() {

        gsap.to(
            endingNoise,
            {
                x:
                    gsap.utils.random(
                        -3,
                        3
                    ),

                y:
                    gsap.utils.random(
                        -3,
                        3
                    ),

                duration:
                    0.3,

                repeat: -1,

                repeatRefresh:
                    true,

                ease:
                    "steps(1)"
            }
        );

    }


    // =====================================================
    // FINAL WHITEOUT
    // =====================================================

    function playFinalWhiteout() {

        endingComplete =
            true;


        return new Promise(
            resolve => {

                /*
                    Paramos la respiración CSS
                    antes del colapso final.
                */

                if (
                    authorizeMessage
                ) {

                    authorizeMessage
                        .classList
                        .remove(
                            "is-stable"
                        );

                }


                document
                    .querySelectorAll(
                        ".ending-message-final"
                    )
                    .forEach(
                        element => {

                            element.classList
                                .remove(
                                    "is-stable"
                                );

                        }
                    );


                gsap.timeline({
                    onComplete: resolve
                })


                    // -------------------------------------
                    // TEXTO SE DUPLICA
                    // -------------------------------------

                    .to(
                        ghostTexts,
                        {
                            opacity: 0.3,

                            duration: 0.035
                        }
                    )


                    // -------------------------------------
                    // PRIMER TEAR
                    // -------------------------------------

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.62,
                            x: 38,
                            duration: 0.035
                        },
                        "<"
                    )

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.5,
                            x: -43,
                            duration: 0.035
                        },
                        "<"
                    )

                    .to(
                        endingContent,
                        {
                            x: -7,
                            opacity: 0.48,

                            filter:
                                "brightness(1.7)",

                            duration: 0.035
                        },
                        "<"
                    )


                    // -------------------------------------
                    // REBOTE
                    // -------------------------------------

                    .to(
                        endingContent,
                        {
                            x: 8,
                            opacity: 0.92,

                            filter:
                                "brightness(0.55)",

                            duration: 0.04
                        }
                    )

                    .to(
                        endingFrame,
                        {
                            x: -6,
                            opacity: 0.68,
                            duration: 0.04
                        },
                        "<"
                    )


                    // -------------------------------------
                    // MÁS INTERFERENCIA
                    // -------------------------------------

                    .to(
                        interferenceLines,
                        {
                            opacity: 0.5,
                            duration: 0.025
                        }
                    )


                    // -------------------------------------
                    // FLASH VERDE
                    // -------------------------------------

                    .to(
                        endingFlash,
                        {
                            opacity: 0.18,
                            duration: 0.04
                        }
                    )

                    .to(
                        endingFlash,
                        {
                            opacity: 0.04,
                            duration: 0.055
                        }
                    )


                    // -------------------------------------
                    // PANTALLA SE SOBREEXPONE
                    // -------------------------------------

                    .to(
                        scene,
                        {
                            filter:
                                "brightness(1.8)",

                            duration: 0.12
                        }
                    )


                    // -------------------------------------
                    // WHITEOUT
                    // -------------------------------------

                    .to(
                        endingWhiteout,
                        {
                            opacity: 0.35,

                            duration: 0.12,

                            ease:
                                "power1.in"
                        }
                    )

                    .to(
                        endingWhiteout,
                        {
                            opacity: 0.7,

                            duration: 0.16,

                            ease:
                                "power1.in"
                        }
                    )

                    .to(
                        endingWhiteout,
                        {
                            opacity: 1,

                            duration: 0.4,

                            ease:
                                "power2.in"
                        }
                    )


                    /*
                        Se queda blanco.
                        No navegamos a ningún lado.
                    */

                    .set(
                        endingWhiteout,
                        {
                            opacity: 1
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

        noiseLoop();

        corruptionLoop();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        showAuthorizeMessage,

        showDenyMessage,

        setCorruptionLevel,

        playFinalWhiteout

    };


})();