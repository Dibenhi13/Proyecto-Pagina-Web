// =========================================================
// ESCENA 09 — ANIMACIONES GSAP
// Final Decision / Authorization Required
// The Lost Ship
// =========================================================


window.Scene09Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const scene =
        document.querySelector(
            "#scene-09"
        );


    const systemFrame =
        document.querySelector(
            "#system-frame"
        );


    const systemContent =
        document.querySelector(
            "#system-content"
        );


    const authorizationSection =
        document.querySelector(
            "#authorization-section"
        );


    const authorizationTitle =
        document.querySelector(
            "#authorization-title"
        );


    const decisionOptions =
        document.querySelector(
            "#decision-options"
        );


    const decisionButtons =
        Array.from(
            document.querySelectorAll(
                ".decision-button"
            )
        );


    const decisionCursor =
        document.querySelector(
            "#decision-cursor"
        );


    const cursorBlock =
        document.querySelector(
            "#cursor-block"
        );


    const resultSection =
        document.querySelector(
            "#result-section"
        );


    const resultTitle =
        document.querySelector(
            "#result-title"
        );


    const resultSubtitle =
        document.querySelector(
            "#result-subtitle"
        );


    const sceneNoise =
        document.querySelector(
            "#scene-noise"
        );


    const sceneScanlines =
        document.querySelector(
            "#scene-scanlines"
        );


    const interferenceLines = [
        document.querySelector(
            "#interference-line-01"
        ),
        document.querySelector(
            "#interference-line-02"
        )
    ];


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

    let sceneEnding = false;


    // =====================================================
    // INITIAL STATE
    // =====================================================

    function setInitialState() {

        gsap.set(
            systemFrame,
            {
                opacity: 0,

                scale: 0.999
            }
        );


        gsap.set(
            authorizationTitle,
            {
                opacity: 0,

                y: 2
            }
        );


        gsap.set(
            decisionOptions,
            {
                opacity: 0,

                pointerEvents:
                    "none"
            }
        );


        gsap.set(
            decisionButtons,
            {
                opacity: 0,

                x: -3
            }
        );


        gsap.set(
            decisionCursor,
            {
                opacity: 0
            }
        );


        gsap.set(
            resultSection,
            {
                opacity: 0
            }
        );


        gsap.set(
            resultTitle,
            {
                opacity: 0
            }
        );


        gsap.set(
            resultSubtitle,
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
    // SCENE ENTRY
    // =====================================================

    function playSceneEntry() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    /*
                        Negro absoluto después
                        de Scene 08.
                    */

                    .to(
                        {},
                        {
                            duration: 0.75
                        }
                    )


                    /*
                        El borde intenta aparecer.
                    */

                    .to(
                        systemFrame,
                        {
                            opacity: 0.18,

                            duration: 0.04
                        }
                    )

                    .to(
                        systemFrame,
                        {
                            opacity: 0,

                            duration: 0.04
                        }
                    )

                    .to(
                        {},
                        {
                            duration: 0.15
                        }
                    )


                    /*
                        Ahora sí queda estable.
                    */

                    .to(
                        systemFrame,
                        {
                            opacity: 1,

                            scale: 1,

                            duration: 0.72,

                            ease:
                                "power1.out"
                        }
                    );

            }
        );

    }


    // =====================================================
    // AUTHORIZATION TITLE
    // =====================================================

    function showAuthorizationTitle() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        authorizationTitle,
                        {
                            opacity: 1,

                            y: 0,

                            duration: 0.65,

                            ease:
                                "power1.out"
                        }
                    )

                    /*
                        Un flicker minúsculo.

                        Es importante que NO se
                        sienta corrupta otra vez.
                    */

                    .to(
                        authorizationTitle,
                        {
                            opacity: 0.82,

                            duration: 0.035
                        }
                    )

                    .to(
                        authorizationTitle,
                        {
                            opacity: 1,

                            duration: 0.055
                        }
                    )

                    .call(
                        () => {

                            authorizationTitle
                                .classList
                                .add(
                                    "is-waiting"
                                );

                        }
                    );

            }
        );

    }


    // =====================================================
    // DECISION OPTIONS
    // =====================================================

    function showDecisionOptions() {

        return new Promise(
            resolve => {

                gsap.set(
                    decisionOptions,
                    {
                        pointerEvents:
                            "auto"
                    }
                );


                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        decisionOptions,
                        {
                            opacity: 1,

                            duration: 0.15
                        }
                    )

                    .to(
                        decisionButtons,
                        {
                            opacity: 1,

                            x: 0,

                            duration: 0.25,

                            stagger: 0.22,

                            ease:
                                "power1.out"
                        }
                    )

                    .to(
                        decisionCursor,
                        {
                            opacity: 1,

                            duration: 0.12
                        }
                    )

                    .call(
                        startCursorBlink
                    );

            }
        );

    }


    // =====================================================
    // CURSOR
    // =====================================================

    function startCursorBlink() {

        if (
            !cursorBlock
        ) {

            return;

        }


        gsap.killTweensOf(
            cursorBlock
        );


        gsap.to(
            cursorBlock,
            {
                opacity: 0.08,

                duration: 0.46,

                repeat: -1,

                yoyo: true,

                ease:
                    "steps(1)"
            }
        );

    }


    // =====================================================
    // HOVER
    // =====================================================

    function playDecisionHover(
        button
    ) {

        if (
            sceneEnding ||
            button.disabled
        ) {

            return;

        }


        const arrow =
            button.querySelector(
                ".decision-arrow"
            );


        gsap.killTweensOf(
            [
                button,
                arrow
            ]
        );


        gsap.timeline()

            .to(
                arrow,
                {
                    opacity: 0.3,

                    duration: 0.035
                }
            )

            .to(
                arrow,
                {
                    opacity: 1,

                    duration: 0.055
                }
            )

            .to(
                button,
                {
                    x: 1.5,

                    duration: 0.06
                },
                "<"
            )

            .to(
                button,
                {
                    x: 0,

                    duration: 0.08
                }
            );

    }


    // =====================================================
    // DECISION SELECTION
    // =====================================================

    function playDecisionSelection(
        selectedButton
    ) {

        return new Promise(
            resolve => {

                const arrow =
                    selectedButton
                        .querySelector(
                            ".decision-arrow"
                        );


                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        selectedButton,
                        {
                            textShadow:
                                "0 0 9px rgba(0,255,56,0.7)",

                            duration: 0.08
                        }
                    )

                    .to(
                        arrow,
                        {
                            opacity: 0.18,

                            duration: 0.035
                        },
                        "<"
                    )

                    .to(
                        arrow,
                        {
                            opacity: 1,

                            duration: 0.045
                        }
                    )

                    .to(
                        selectedButton,
                        {
                            x: 2,

                            duration: 0.04
                        }
                    )

                    .to(
                        selectedButton,
                        {
                            x: 0,

                            duration: 0.07
                        }
                    );

            }
        );

    }


    // =====================================================
    // HIDE OPTIONS
    // =====================================================

    function hideDecisionOptions(
        selectedButton
    ) {

        return new Promise(
            resolve => {

                gsap.set(
                    decisionOptions,
                    {
                        pointerEvents:
                            "none"
                    }
                );


                const otherButtons =
                    decisionButtons.filter(
                        button =>
                            button !==
                            selectedButton
                    );


                const timeline =
                    gsap.timeline({
                        onComplete: resolve
                    });


                /*
                    Primero desaparece
                    la opción NO elegida.
                */

                timeline.to(
                    otherButtons,
                    {
                        opacity: 0,

                        x: 3,

                        duration: 0.15
                    }
                );


                /*
                    Cursor desaparece.
                */

                timeline.to(
                    decisionCursor,
                    {
                        opacity: 0,

                        duration: 0.08
                    },
                    "<"
                );


                /*
                    La elegida permanece
                    brevemente sola.
                */

                timeline.to(
                    {},
                    {
                        duration: 0.38
                    }
                );


                timeline.to(
                    selectedButton,
                    {
                        opacity: 0,

                        duration: 0.2
                    }
                );


                timeline.to(
                    authorizationSection,
                    {
                        opacity: 0,

                        duration: 0.2
                    },
                    "-=0.08"
                );

            }
        );

    }


    // =====================================================
    // SHOW RESULT
    // =====================================================

    function showDecisionResult(
        decision
    ) {

        return new Promise(
            resolve => {

                gsap.set(
                    resultSection,
                    {
                        opacity: 1
                    }
                );


                const timeline =
                    gsap.timeline({
                        onComplete: resolve
                    });


                timeline.fromTo(
                    resultTitle,

                    {
                        opacity: 0,

                        y: 2
                    },

                    {
                        opacity: 1,

                        y: 0,

                        duration: 0.42
                    }
                );


                timeline.fromTo(
                    resultSubtitle,

                    {
                        opacity: 0,

                        y: 2
                    },

                    {
                        opacity: 0.65,

                        y: 0,

                        duration: 0.32
                    },

                    "+=0.3"
                );


                /*
                    AUTHORIZE y DENY siguen
                    viéndose casi iguales.

                    Solo cambia ligeramente
                    el ritmo de la confirmación.
                */

                if (
                    decision === "authorize"
                ) {

                    timeline
                        .to(
                            resultTitle,
                            {
                                opacity: 0.82,

                                duration: 0.035
                            }
                        )

                        .to(
                            resultTitle,
                            {
                                opacity: 1,

                                duration: 0.055
                            }
                        );

                }


                if (
                    decision === "deny"
                ) {

                    timeline
                        .to(
                            resultSubtitle,
                            {
                                opacity: 0.25,

                                duration: 0.04
                            }
                        )

                        .to(
                            resultSubtitle,
                            {
                                opacity: 0.65,

                                duration: 0.06
                            }
                        );

                }

            }
        );

    }


    // =====================================================
    // AUTHORIZE TRANSITION
    // =====================================================

    function playAuthorizeTransition() {

        sceneEnding =
            true;


        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    /*
                        Confirmación limpia.
                    */

                    .to(
                        resultTitle,
                        {
                            opacity: 0.65,

                            duration: 0.05
                        }
                    )

                    .to(
                        resultTitle,
                        {
                            opacity: 1,

                            duration: 0.06
                        }
                    )


                    /*
                        Una sola línea de señal.
                    */

                    .call(
                        () => {

                            playInterferenceLine(
                                0.2
                            );

                        }
                    )


                    .to(
                        {},
                        {
                            duration: 0.35
                        }
                    )


                    /*
                        El borde desaparece
                        como si la orden ya
                        hubiera sido aceptada.
                    */

                    .to(
                        systemFrame,
                        {
                            opacity: 0.25,

                            duration: 0.16
                        }
                    )


                    /*
                        Blackout.
                    */

                    .to(
                        sceneTransition,
                        {
                            opacity: 1,

                            duration: 0.32,

                            ease:
                                "power2.in"
                        }
                    );

            }
        );

    }


    // =====================================================
    // DENY TRANSITION
    // =====================================================

    function playDenyTransition() {

        sceneEnding =
            true;


        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    /*
                        Sigue siendo estable,
                        pero la desconexión
                        tiene un corte más seco.
                    */

                    .to(
                        resultSubtitle,
                        {
                            opacity: 0.2,

                            duration: 0.05
                        }
                    )

                    .to(
                        resultSubtitle,
                        {
                            opacity: 0.65,

                            duration: 0.05
                        }
                    )


                    /*
                        Borde pierde señal.
                    */

                    .to(
                        systemFrame,
                        {
                            opacity: 0.45,

                            duration: 0.05
                        }
                    )

                    .to(
                        systemFrame,
                        {
                            opacity: 1,

                            duration: 0.06
                        }
                    )


                    /*
                        Pequeño glitch.
                    */

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.22,

                            x: -14,

                            duration: 0.035
                        }
                    )

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0,

                            x: 0,

                            duration: 0.055
                        }
                    )


                    /*
                        Corte negro más rápido.
                    */

                    .to(
                        sceneTransition,
                        {
                            opacity: 1,

                            duration: 0.2,

                            ease:
                                "power2.in"
                        }
                    );

            }
        );

    }


    // =====================================================
    // SUBTLE INTERFERENCE
    // =====================================================

    function playInterferenceLine(
        opacity = 0.16
    ) {

        if (
            sceneEnding
        ) {

            /*
                Todavía permitimos el efecto
                llamado explícitamente por
                una transición.
            */

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
                        20,
                        80
                    )}%`,

                xPercent: -15
            }
        );


        gsap.timeline()

            .to(
                line,
                {
                    opacity:
                        opacity,

                    xPercent:
                        10,

                    duration:
                        0.035
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
    // SUBTLE FRAME LOOP
    // =====================================================

    function subtleFrameLoop() {

        gsap.delayedCall(
            gsap.utils.random(
                4,
                7
            ),

            () => {

                if (
                    !sceneEnding
                ) {

                    /*
                        Algo casi imperceptible.
                        Nada parecido a Scene 08.
                    */

                    gsap.timeline()

                        .to(
                            systemFrame,
                            {
                                opacity: 0.92,

                                duration: 0.04
                            }
                        )

                        .to(
                            systemFrame,
                            {
                                opacity: 1,

                                duration: 0.07
                            }
                        );


                    if (
                        Math.random() > 0.72
                    ) {

                        playInterferenceLine(
                            0.09
                        );

                    }


                    subtleFrameLoop();

                }

            }
        );

    }


    // =====================================================
    // NOISE LOOP
    // =====================================================

    function noiseLoop() {

        gsap.to(
            sceneNoise,
            {
                x:
                    gsap.utils.random(
                        -1,
                        1
                    ),

                y:
                    gsap.utils.random(
                        -1,
                        1
                    ),

                duration: 1.4,

                repeat: -1,

                repeatRefresh:
                    true,

                ease:
                    "steps(1)"
            }
        );

    }


    // =====================================================
    // INIT
    // =====================================================

    function init() {

        setInitialState();

        noiseLoop();

        subtleFrameLoop();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        showAuthorizationTitle,

        showDecisionOptions,

        playDecisionHover,

        playDecisionSelection,

        hideDecisionOptions,

        showDecisionResult,

        playAuthorizeTransition,

        playDenyTransition

    };


})();