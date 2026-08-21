// =========================================================
// ESCENA 08 — ANIMACIONES GSAP
// Total Uncertainty / Digital Ruin
// The Lost Ship
// =========================================================


window.Scene08Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const scene =
        document.querySelector(
            "#scene-08"
        );


    const fragments =
        Array.from(
            document.querySelectorAll(
                ".floating-fragment"
            )
        );


    const ghostBoxes =
        document.querySelectorAll(
            ".ghost-box"
        );


    const ghostMessages =
        document.querySelectorAll(
            ".ghost-message"
        );


    const signalBands =
        document.querySelectorAll(
            ".signal-band"
        );


    const collapseNoise =
        document.querySelector(
            "#collapse-noise"
        );


    const collapseScanlines =
        document.querySelector(
            "#collapse-scanlines"
        );


    const floatingError =
        document.querySelector(
            "#floating-error"
        );


    const glitchLayers = [
        document.querySelector("#glitch-layer-01"),
        document.querySelector("#glitch-layer-02"),
        document.querySelector("#glitch-layer-03"),
        document.querySelector("#glitch-layer-04"),
        document.querySelector("#glitch-layer-05")
    ];


    const collapseFlash =
        document.querySelector(
            "#collapse-flash"
        );


    const collapseBlackout =
        document.querySelector(
            "#collapse-blackout"
        );


    const finalFragment =
        document.querySelector(
            "#final-fragment"
        );


    const finalFragmentText =
        document.querySelector(
            "#final-fragment-text"
        );


    const finalFragmentCursor =
        document.querySelector(
            "#final-fragment-cursor"
        );


    const sceneTransition =
        document.querySelector(
            "#scene-transition"
        );


    // =====================================================
    // ESTADO
    // =====================================================

    let collapseLevel = 0;

    let teleportEnabled = false;

    let sceneEnding = false;


    // =====================================================
    // INITIAL STATE
    // =====================================================

    function setInitialState() {

        gsap.set(
            fragments,
            {
                opacity: 0
            }
        );


        gsap.set(
            ghostBoxes,
            {
                opacity: 0
            }
        );


        gsap.set(
            ghostMessages,
            {
                opacity: 0
            }
        );


        gsap.set(
            signalBands,
            {
                opacity: 0
            }
        );


        gsap.set(
            floatingError,
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
            collapseFlash,
            {
                opacity: 0
            }
        );


        gsap.set(
            collapseBlackout,
            {
                opacity: 0
            }
        );


        gsap.set(
            finalFragment,
            {
                opacity: 0
            }
        );


        gsap.set(
            finalFragmentCursor,
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
    // ENTRY
    // =====================================================

    function playSceneEntry() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    /*
                        Scene 07 ya venía con blackout.
                        Aquí volvemos de forma sucia,
                        no limpia.
                    */

                    .to(
                        collapseBlackout,
                        {
                            opacity: 1,

                            duration: 0.08
                        }
                    )

                    .to(
                        collapseBlackout,
                        {
                            opacity: 0.35,

                            duration: 0.05
                        }
                    )

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.45,

                            x: -32,

                            duration: 0.035
                        },

                        "<"
                    )

                    .to(
                        collapseBlackout,
                        {
                            opacity: 0,

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
                    )

                    .to(
                        collapseFlash,
                        {
                            opacity: 0.06,

                            duration: 0.025
                        }
                    )

                    .to(
                        collapseFlash,
                        {
                            opacity: 0,

                            duration: 0.05
                        }
                    );

            }
        );

    }


    // =====================================================
    // COLLAPSE LEVEL
    // =====================================================

    function setCollapseLevel(
        level
    ) {

        collapseLevel =
            Math.max(
                collapseLevel,
                level
            );


        const noiseLevels = {

            0: 0.26,

            1: 0.33,

            2: 0.4,

            3: 0.5,

            4: 0.62

        };


        const scanLevels = {

            0: 0.22,

            1: 0.28,

            2: 0.34,

            3: 0.42,

            4: 0.5

        };


        gsap.to(
            collapseNoise,
            {
                opacity:
                    noiseLevels[
                        collapseLevel
                    ],

                duration: 0.35
            }
        );


        gsap.to(
            collapseScanlines,
            {
                opacity:
                    scanLevels[
                        collapseLevel
                    ],

                duration: 0.35
            }
        );


        /*
            Cada nivel causa un impacto
            más fuerte.
        */

        if (
            collapseLevel === 1
        ) {

            playMinorTear();

        }


        if (
            collapseLevel === 2
        ) {

            playMediumTear();

        }


        if (
            collapseLevel === 3
        ) {

            playStrongTear();

        }


        if (
            collapseLevel >= 4
        ) {

            playStrongTear();


            gsap.delayedCall(
                0.18,
                playDropout
            );

        }

    }


    // =====================================================
// REVEAL FRAGMENT GROUP
// =====================================================

function revealFragmentGroup(
    start,
    end
) {

    return new Promise(
        resolve => {

            const group =
                fragments.slice(
                    start,
                    end
                );


            if (
                group.length === 0
            ) {

                resolve();

                return;

            }


            gsap.timeline({
                onComplete: resolve
            })

                .to(
                    group,
                    {
                        opacity:
                            (
                                index,
                                element
                            ) => {

                                /*
                                    GSAP manda:

                                    index = posición
                                    element = elemento HTML

                                    Antes estábamos tratando
                                    index como si fuera el elemento,
                                    y eso rompía la secuencia.
                                */


                                if (
                                    element.classList
                                        .contains(
                                            "fragment-dim"
                                        )
                                ) {

                                    return 0.42;

                                }


                                if (
                                    element.classList
                                        .contains(
                                            "broken-fragment"
                                        )
                                ) {

                                    return 0.5;

                                }


                                if (
                                    element.classList
                                        .contains(
                                            "fragment-bright"
                                        )
                                ) {

                                    return 0.9;

                                }


                                return 0.72;

                            },

                        duration:
                            0.12,

                        stagger: {
                            each: 0.09,
                            from: "random"
                        }
                    }
                );

        }
    );

}


    // =====================================================
    // GHOST UI
    // =====================================================

    function showGhostUI() {

        ghostBoxes.forEach(
            box => {

                gsap.timeline({
                    repeat: -1,
                    repeatDelay:
                        gsap.utils.random(
                            0.8,
                            2
                        )
                })

                    .to(
                        box,
                        {
                            opacity:
                                gsap.utils.random(
                                    0.04,
                                    0.16
                                ),

                            duration:
                                gsap.utils.random(
                                    0.08,
                                    0.25
                                )
                        }
                    )

                    .to(
                        box,
                        {
                            opacity: 0,

                            duration:
                                gsap.utils.random(
                                    0.1,
                                    0.3
                                )
                        },

                        `+=${gsap.utils.random(
                            0.3,
                            1
                        )}`
                    );

            }
        );

    }


    // =====================================================
    // GHOST MESSAGES
    // =====================================================

    function showGhostMessages() {

        ghostMessages.forEach(
            (
                message,
                index
            ) => {

                gsap.timeline({
                    delay:
                        index * 0.2
                })

                    .to(
                        message,
                        {
                            opacity:
                                gsap.utils.random(
                                    0.04,
                                    0.09
                                ),

                            duration: 0.18
                        }
                    )

                    .to(
                        message,
                        {
                            opacity:
                                gsap.utils.random(
                                    0.015,
                                    0.04
                                ),

                            x:
                                gsap.utils.random(
                                    -6,
                                    6
                                ),

                            duration: 0.08
                        }
                    );

            }
        );

    }


    // =====================================================
    // ENABLE TELEPORTING
    // =====================================================

    function enableFragmentTeleporting() {

        teleportEnabled =
            true;

    }


    // =====================================================
    // TELEPORT RANDOM FRAGMENT
    // =====================================================

    function teleportRandomFragment() {

        if (
            !teleportEnabled ||
            sceneEnding
        ) {

            return;

        }


        const visibleFragments =
            fragments.filter(
                fragment => {

                    return (
                        gsap.getProperty(
                            fragment,
                            "opacity"
                        ) > 0.1
                    );

                }
            );


        if (
            visibleFragments.length === 0
        ) {

            return;

        }


        const fragment =
            visibleFragments[
                Math.floor(
                    Math.random() *
                    visibleFragments.length
                )
            ];


        const newX =
            gsap.utils.random(
                6,
                94
            );


        const newY =
            gsap.utils.random(
                6,
                94
            );


        /*
            No hay movimiento suave.

            Desaparece, cambia posición
            y reaparece.
        */

        gsap.timeline()

            .to(
                fragment,
                {
                    opacity: 0,

                    x:
                        gsap.utils.random(
                            -8,
                            8
                        ),

                    duration: 0.025
                }
            )

            .set(
                fragment,
                {
                    left:
                        `${newX}%`,

                    top:
                        `${newY}%`,

                    x: 0
                }
            )

            .to(
                fragment,
                {
                    opacity:
                        fragment.classList
                            .contains(
                                "fragment-dim"
                            )
                            ? 0.4
                            : 0.75,

                    duration: 0.04
                }
            )

            .to(
                fragment,
                {
                    opacity:
                        gsap.utils.random(
                            0.35,
                            0.78
                        ),

                    duration: 0.05
                }
            );

    }


    // =====================================================
    // FRAGMENT FLICKER
    // =====================================================

    function flickerRandomFragment() {

        const visibleFragments =
            fragments.filter(
                fragment => {

                    return (
                        gsap.getProperty(
                            fragment,
                            "opacity"
                        ) > 0.1
                    );

                }
            );


        if (
            visibleFragments.length === 0
        ) {

            return;

        }


        const amount =
            collapseLevel >= 4
                ? Math.min(
                    5,
                    visibleFragments.length
                )
                : collapseLevel >= 3
                    ? Math.min(
                        3,
                        visibleFragments.length
                    )
                    : 1;


        const selected =
            gsap.utils.shuffle(
                visibleFragments
            )
                .slice(
                    0,
                    amount
                );


        gsap.timeline()

            .to(
                selected,
                {
                    opacity: 0.08,

                    x: () =>
                        gsap.utils.random(
                            -4,
                            4
                        ),

                    filter:
                        "brightness(1.7)",

                    duration: 0.025
                }
            )

            .to(
                selected,
                {
                    opacity: () =>
                        gsap.utils.random(
                            0.35,
                            0.8
                        ),

                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.055
                }
            );

    }


    // =====================================================
    // SIGNAL BAND
    // =====================================================

    function playSignalBand() {

        const band =
            signalBands[
                Math.floor(
                    Math.random() *
                    signalBands.length
                )
            ];


        gsap.set(
            band,
            {
                top:
                    `${gsap.utils.random(
                        5,
                        94
                    )}%`,

                height:
                    `${gsap.utils.random(
                        1,
                        collapseLevel >= 4
                            ? 5
                            : 3
                    )}px`,

                xPercent:
                    -20
            }
        );


        gsap.timeline()

            .to(
                band,
                {
                    opacity:
                        gsap.utils.random(
                            0.25,
                            collapseLevel >= 4
                                ? 0.75
                                : 0.5
                        ),

                    xPercent:
                        14,

                    duration:
                        0.035
                }
            )

            .to(
                band,
                {
                    opacity: 0,

                    xPercent: 0,

                    duration:
                        0.055
                }
            );

    }


    // =====================================================
    // MINOR TEAR
    // =====================================================

    function playMinorTear() {

        const layer =
            glitchLayers[
                Math.floor(
                    Math.random() *
                    glitchLayers.length
                )
            ];


        gsap.timeline()

            .to(
                layer,
                {
                    opacity: 0.22,

                    x:
                        gsap.utils.random(
                            -15,
                            15
                        ),

                    duration: 0.03
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


        playSignalBand();

    }


    // =====================================================
    // MEDIUM TEAR
    // =====================================================

    function playMediumTear() {

        gsap.timeline()

            .to(
                glitchLayers[0],
                {
                    opacity: 0.36,
                    x: 23,

                    duration: 0.03
                }
            )

            .to(
                glitchLayers[2],
                {
                    opacity: 0.3,
                    x: -27,

                    duration: 0.03
                },

                "<"
            )

            .to(
                fragments,
                {
                    x: index => {

                        return (
                            index % 2 === 0
                                ? -2
                                : 2
                        );

                    },

                    duration: 0.03
                },

                "<"
            )

            .to(
                fragments,
                {
                    x: 0,

                    duration: 0.05
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


        playSignalBand();

    }


    // =====================================================
    // STRONG TEAR
    // =====================================================

    function playStrongTear() {

        gsap.timeline()

            .to(
                glitchLayers[0],
                {
                    opacity: 0.55,
                    x: 34,

                    duration: 0.03
                }
            )

            .to(
                glitchLayers[1],
                {
                    opacity: 0.46,
                    x: -42,

                    duration: 0.03
                },

                "<"
            )

            .to(
                glitchLayers[3],
                {
                    opacity: 0.4,
                    x: 29,

                    duration: 0.03
                },

                "<"
            )

            .to(
                scene,
                {
                    x: -4,

                    filter:
                        "brightness(1.35)",

                    duration: 0.03
                },

                "<"
            )

            .to(
                scene,
                {
                    x: 5,

                    filter:
                        "brightness(0.68)",

                    duration: 0.035
                }
            )

            .to(
                scene,
                {
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.06
                }
            )

            .to(
                glitchLayers,
                {
                    opacity: 0,

                    x: 0,

                    duration: 0.05
                },

                "<"
            );


        playSignalBand();

        flickerRandomFragment();

    }


    // =====================================================
    // DROPOUT
    // =====================================================

    function playDropout() {

        gsap.timeline()

            .to(
                collapseBlackout,
                {
                    opacity:
                        gsap.utils.random(
                            0.65,
                            0.9
                        ),

                    duration: 0.025
                }
            )

            .to(
                collapseBlackout,
                {
                    opacity: 0.18,

                    duration: 0.035
                }
            )

            .to(
                collapseBlackout,
                {
                    opacity: 0,

                    duration: 0.05
                }
            );

    }


    // =====================================================
    // FLOATING ERROR
    // =====================================================

    function showFloatingError() {

        const errors = [
            "ERR_██",
            "SIGNAL_NULL",
            "IDENTITY_ERR",
            "PLAYBACK_FAIL",
            "DATA_OVERFLOW",
            "SESSION_▒▒",
            "NO_SOURCE",
            "UNKNOWN_INPUT"
        ];


        floatingError.textContent =
            errors[
                Math.floor(
                    Math.random() *
                    errors.length
                )
            ];


        gsap.set(
            floatingError,
            {
                left:
                    `${gsap.utils.random(
                        8,
                        90
                    )}%`,

                top:
                    `${gsap.utils.random(
                        8,
                        90
                    )}%`
            }
        );


        gsap.timeline()

            .to(
                floatingError,
                {
                    opacity:
                        gsap.utils.random(
                            0.35,
                            0.78
                        ),

                    x:
                        gsap.utils.random(
                            -8,
                            8
                        ),

                    duration: 0.025
                }
            )

            .to(
                floatingError,
                {
                    opacity: 0,

                    x: 0,

                    duration: 0.06
                }
            );

    }


    // =====================================================
    // DECAY
    // =====================================================

    function beginFragmentDecay() {

        return new Promise(
            resolve => {

                const shuffled =
                    gsap.utils.shuffle(
                        [...fragments]
                    );


                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        shuffled,
                        {
                            opacity: 0,

                            x: () =>
                                gsap.utils.random(
                                    -12,
                                    12
                                ),

                            filter:
                                "brightness(1.7)",

                            duration:
                                0.08,

                            stagger: {
                                each:
                                    0.035,

                                from:
                                    "random"
                            }
                        }
                    )

                    .to(
                        ghostBoxes,
                        {
                            opacity: 0,

                            duration: 0.15
                        },

                        "<"
                    )

                    .to(
                        ghostMessages,
                        {
                            opacity: 0,

                            duration: 0.12
                        },

                        "<"
                    );


                playStrongTear();

            }
        );

    }


    // =====================================================
    // FINAL FRAGMENT
    // =====================================================

    function showFinalFragment() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        collapseBlackout,
                        {
                            opacity: 0.72,

                            duration: 0.15
                        }
                    )

                    .to(
                        finalFragment,
                        {
                            opacity: 1,

                            duration: 0.18
                        }
                    )

                    .fromTo(
                        finalFragmentText,

                        {
                            opacity: 0,

                            filter:
                                "brightness(1.7)"
                        },

                        {
                            opacity: 1,

                            filter:
                                "brightness(1)",

                            duration: 0.28
                        }
                    )

                    .to(
                        finalFragmentText,
                        {
                            x: -2,

                            duration: 0.035
                        }
                    )

                    .to(
                        finalFragmentText,
                        {
                            x: 3,

                            duration: 0.035
                        }
                    )

                    .to(
                        finalFragmentText,
                        {
                            x: 0,

                            duration: 0.055
                        }
                    )

                    .to(
                        finalFragmentCursor,
                        {
                            opacity: 1,

                            duration: 0.08
                        }
                    )

                    .call(
                        startFinalCursorBlink
                    );

            }
        );

    }


    // =====================================================
    // FINAL CURSOR
    // =====================================================

    function startFinalCursorBlink() {

        gsap.killTweensOf(
            finalFragmentCursor
        );


        gsap.to(
            finalFragmentCursor,
            {
                opacity: 0.08,

                duration: 0.26,

                repeat: -1,

                yoyo: true,

                ease:
                    "steps(1)"
            }
        );

    }


    // =====================================================
    // RANDOM LOOP
    // =====================================================

    function corruptionLoop() {

        let min;
        let max;


        switch (
            collapseLevel
        ) {

            case 0:

                min = 1.8;
                max = 3;

                break;


            case 1:

                min = 1.2;
                max = 2;

                break;


            case 2:

                min = 0.75;
                max = 1.4;

                break;


            case 3:

                min = 0.35;
                max = 0.85;

                break;


            default:

                min = 0.16;
                max = 0.45;

        }


        gsap.delayedCall(
            gsap.utils.random(
                min,
                max
            ),

            () => {

                if (
                    sceneEnding
                ) {

                    return;

                }


                const random =
                    Math.random();


                if (
                    collapseLevel <= 1
                ) {

                    playMinorTear();


                    if (
                        random > 0.6
                    ) {

                        flickerRandomFragment();

                    }

                }


                if (
                    collapseLevel === 2
                ) {

                    if (
                        random > 0.45
                    ) {

                        playMediumTear();

                    }
                    else {

                        playMinorTear();

                    }


                    flickerRandomFragment();


                    if (
                        random > 0.7
                    ) {

                        showFloatingError();

                    }

                }


                if (
                    collapseLevel === 3
                ) {

                    playMediumTear();

                    flickerRandomFragment();


                    if (
                        random > 0.35
                    ) {

                        teleportRandomFragment();

                    }


                    if (
                        random > 0.55
                    ) {

                        showFloatingError();

                    }


                    if (
                        random > 0.78
                    ) {

                        playDropout();

                    }

                }


                if (
                    collapseLevel >= 4
                ) {

                    if (
                        random > 0.45
                    ) {

                        playStrongTear();

                    }
                    else {

                        playMediumTear();

                    }


                    flickerRandomFragment();

                    teleportRandomFragment();


                    if (
                        random > 0.35
                    ) {

                        showFloatingError();

                    }


                    if (
                        random > 0.62
                    ) {

                        playDropout();

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
            collapseNoise,
            {
                x:
                    gsap.utils.random(
                        -6,
                        6
                    ),

                y:
                    gsap.utils.random(
                        -5,
                        5
                    ),

                scale:
                    gsap.utils.random(
                        1,
                        1.025
                    ),

                duration:
                    0.08,

                repeat: -1,

                repeatRefresh:
                    true,

                ease:
                    "steps(2)"
            }
        );

    }


    // =====================================================
    // RANDOM GHOST SHIFT
    // =====================================================

    function ghostShiftLoop() {

        gsap.delayedCall(
            gsap.utils.random(
                1,
                2.2
            ),

            () => {

                if (
                    !sceneEnding &&
                    collapseLevel >= 2
                ) {

                    const target =
                        ghostMessages[
                            Math.floor(
                                Math.random() *
                                ghostMessages.length
                            )
                        ];


                    gsap.timeline()

                        .to(
                            target,
                            {
                                opacity: 0.11,

                                x:
                                    gsap.utils.random(
                                        -14,
                                        14
                                    ),

                                duration: 0.035
                            }
                        )

                        .to(
                            target,
                            {
                                opacity:
                                    gsap.utils.random(
                                        0.01,
                                        0.05
                                    ),

                                x:
                                    gsap.utils.random(
                                        -5,
                                        5
                                    ),

                                duration: 0.055
                            }
                        );

                }


                ghostShiftLoop();

            }
        );

    }


    // =====================================================
    // TRANSITION TO SCENE 09
    // =====================================================

    function playScene09Transition() {

        sceneEnding =
            true;


        return new Promise(
            resolve => {

                gsap.killTweensOf(
                    finalFragmentCursor
                );


                gsap.timeline({
                    onComplete: resolve
                })

                    // -------------------------------------
                    // FRAGMENTO FINAL SE ROMPE
                    // -------------------------------------

                    .to(
                        finalFragmentText,
                        {
                            x: -5,

                            opacity: 0.55,

                            filter:
                                "brightness(1.8)",

                            duration: 0.035
                        }
                    )

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.65,

                            x: 38,

                            duration: 0.035
                        },

                        "<"
                    )

                    .to(
                        glitchLayers[2],
                        {
                            opacity: 0.55,

                            x: -42,

                            duration: 0.035
                        },

                        "<"
                    )

                    .to(
                        finalFragmentText,
                        {
                            x: 6,

                            opacity: 1,

                            duration: 0.035
                        }
                    )

                    .to(
                        finalFragment,
                        {
                            opacity: 0.18,

                            duration: 0.045
                        }
                    )


                    // -------------------------------------
                    // VUELVE TODA LA CORRUPCIÓN
                    // UN ÚLTIMO FRAME
                    // -------------------------------------

                    .to(
                        fragments,
                        {
                            opacity:
                                () =>
                                    gsap.utils.random(
                                        0.15,
                                        0.55
                                    ),

                            duration: 0.035
                        }
                    )

                    .to(
                        signalBands,
                        {
                            opacity: 0.65,

                            duration: 0.025
                        },

                        "<"
                    )

                    .to(
                        collapseFlash,
                        {
                            opacity: 0.12,

                            duration: 0.025
                        },

                        "<"
                    )


                    // -------------------------------------
                    // FULL TEAR
                    // -------------------------------------

                    .to(
                        scene,
                        {
                            x: -8,

                            opacity: 0.55,

                            filter:
                                "brightness(1.8)",

                            duration: 0.035
                        }
                    )

                    .to(
                        scene,
                        {
                            x: 10,

                            opacity: 0.86,

                            filter:
                                "brightness(0.42)",

                            duration: 0.035
                        }
                    )


                    // -------------------------------------
                    // BLACKOUT
                    // -------------------------------------

                    .to(
                        sceneTransition,
                        {
                            opacity: 1,

                            duration: 0.18,

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

        noiseLoop();

        corruptionLoop();

        ghostShiftLoop();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        setCollapseLevel,

        revealFragmentGroup,

        showGhostUI,

        showGhostMessages,

        enableFragmentTeleporting,

        beginFragmentDecay,

        showFinalFragment,

        playScene09Transition

    };


})();