// =========================================================
// ESCENA 07 — ANIMACIONES GSAP
// Narrative Break / Direct System Contact
// The Lost Ship
// =========================================================


window.Scene07Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const scene =
        document.querySelector(
            "#scene-07"
        );


    const systemFrame =
        document.querySelector(
            "#system-frame"
        );


    const systemContent =
        document.querySelector(
            "#system-content"
        );


    const systemDivider =
        document.querySelector(
            "#system-divider"
        );


    const questionSection =
        document.querySelector(
            "#question-section"
        );


    const questionOptions =
        document.querySelectorAll(
            ".question-option"
        );


    const questionCursor =
        document.querySelector(
            "#question-cursor"
        );


    const cursorBlock =
        document.querySelector(
            "#cursor-block"
        );


    const selectedQuestionSection =
        document.querySelector(
            "#selected-question-section"
        );


    const selectedQuestion =
        document.querySelector(
            "#selected-question"
        );


    const processingMessage =
        document.querySelector(
            "#processing-message"
        );


    const systemResponseSection =
        document.querySelector(
            "#system-response-section"
        );


    const systemResponse =
        document.querySelector(
            "#system-response"
        );


    const responseCursor =
        document.querySelector(
            "#response-cursor"
        );


    const responseCursorBlock =
        responseCursor
            ? responseCursor.querySelector(
                ".cursor-block"
            )
            : null;


    const controlLossSection =
        document.querySelector(
            "#control-loss-section"
        );


    const sceneNoise =
        document.querySelector(
            "#scene-noise"
        );


    const sceneScanlines =
        document.querySelector(
            "#scene-scanlines"
        );


    const systemErrorText =
        document.querySelector(
            "#system-error-text"
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

    let corruptionLevel = 0;

    let sceneEnding = false;


    // =====================================================
    // ESTADO INICIAL
    // =====================================================

    function setInitialState() {

        gsap.set(
            systemFrame,
            {
                opacity: 0,

                scale: 0.998
            }
        );


        gsap.set(
            systemContent,
            {
                opacity: 1
            }
        );


        gsap.set(
            systemDivider,
            {
                opacity: 0,

                scaleX: 0
            }
        );


        gsap.set(
            questionSection,
            {
                opacity: 0,

                pointerEvents: "none"
            }
        );


        gsap.set(
            questionOptions,
            {
                opacity: 0,

                x: -3
            }
        );


        gsap.set(
            questionCursor,
            {
                opacity: 0
            }
        );


        gsap.set(
            selectedQuestionSection,
            {
                opacity: 0
            }
        );


        gsap.set(
            processingMessage,
            {
                opacity: 0
            }
        );


        gsap.set(
            systemResponseSection,
            {
                opacity: 0
            }
        );


        gsap.set(
            systemResponse,
            {
                opacity: 0
            }
        );


        gsap.set(
            responseCursor,
            {
                opacity: 0
            }
        );


        gsap.set(
            controlLossSection,
            {
                opacity: 0
            }
        );


        gsap.set(
            systemErrorText,
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
    // ENTRADA
    // =====================================================

    function playSceneEntry() {

        return new Promise(
            resolve => {

                /*
                    Silencio visual:
                    solo negro durante un momento.
                */

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        {},
                        {
                            duration: 0.7
                        }
                    )

                    /*
                        Aparece el borde muy lentamente.
                    */

                    .to(
                        systemFrame,
                        {
                            opacity: 0.32,

                            duration: 0.08
                        }
                    )

                    .to(
                        systemFrame,
                        {
                            opacity: 0,

                            duration: 0.05
                        }
                    )

                    .to(
                        {},
                        {
                            duration: 0.15
                        }
                    )

                    .to(
                        systemFrame,
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
    // MOSTRAR MENSAJE
    // =====================================================

    function showSystemMessage(
        element,
        number
    ) {

        return new Promise(
            resolve => {

                const timeline =
                    gsap.timeline({
                        onComplete: resolve
                    });


                /*
                    Cada frase se vuelve apenas
                    más inestable que la anterior.
                */

                timeline.fromTo(
                    element,

                    {
                        opacity: 0,

                        y: 2,

                        filter:
                            "brightness(0.75)"
                    },

                    {
                        opacity: 1,

                        y: 0,

                        filter:
                            "brightness(1)",

                        duration: 0.55,

                        ease:
                            "power1.out"
                    }
                );


                if (
                    number === 2
                ) {

                    timeline
                        .to(
                            element,
                            {
                                opacity: 0.72,

                                duration: 0.035
                            }
                        )

                        .to(
                            element,
                            {
                                opacity: 1,

                                duration: 0.06
                            }
                        );

                }


                if (
                    number === 3
                ) {

                    timeline
                        .to(
                            element,
                            {
                                x: -2,

                                opacity: 0.6,

                                duration: 0.035
                            }
                        )

                        .to(
                            element,
                            {
                                x: 2,

                                opacity: 1,

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


                    timeline.call(
                        playSoftGlitch
                    );

                }

            }
        );

    }


    // =====================================================
    // DIVIDER
    // =====================================================

    function showDivider() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        systemDivider,
                        {
                            opacity: 1,

                            scaleX: 1,

                            duration: 0.55,

                            ease:
                                "power1.out"
                        }
                    );

            }
        );

    }


    // =====================================================
    // QUESTIONS
    // =====================================================

    function showQuestions() {

        return new Promise(
            resolve => {

                gsap.set(
                    questionSection,
                    {
                        pointerEvents:
                            "auto"
                    }
                );


                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        questionSection,
                        {
                            opacity: 1,

                            duration: 0.18
                        }
                    )

                    .to(
                        questionOptions,
                        {
                            opacity: 1,

                            x: 0,

                            duration: 0.22,

                            stagger: 0.18
                        }
                    )

                    .to(
                        questionCursor,
                        {
                            opacity: 1,

                            duration: 0.12
                        }
                    );


                startCursorBlink();

            }
        );

    }


    // =====================================================
    // CURSOR
    // =====================================================

    function startCursorBlink() {

        if (!cursorBlock) {
            return;
        }


        gsap.killTweensOf(
            cursorBlock
        );


        gsap.to(
            cursorBlock,
            {
                opacity: 0.1,

                duration: 0.42,

                repeat: -1,

                yoyo: true,

                ease: "steps(1)"
            }
        );

    }


    // =====================================================
    // HIDE QUESTIONS
    // =====================================================

    function hideQuestions() {

        return new Promise(
            resolve => {

                gsap.set(
                    questionSection,
                    {
                        pointerEvents:
                            "none"
                    }
                );


                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        questionOptions,
                        {
                            opacity: 0,

                            x: 3,

                            duration: 0.13,

                            stagger: 0.035
                        }
                    )

                    .to(
                        questionCursor,
                        {
                            opacity: 0,

                            duration: 0.08
                        },
                        "<"
                    )

                    .to(
                        questionSection,
                        {
                            opacity: 0,

                            duration: 0.12
                        }
                    );

            }
        );

    }


    // =====================================================
    // SELECTED QUESTION
    // =====================================================

    function showSelectedQuestion() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        selectedQuestionSection,
                        {
                            opacity: 1,

                            duration: 0.15
                        }
                    )

                    .fromTo(
                        selectedQuestion,

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

            }
        );

    }


    // =====================================================
    // PROCESSING
    // =====================================================

    function showProcessing() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .fromTo(
                        processingMessage,

                        {
                            opacity: 0
                        },

                        {
                            opacity: 0.7,

                            duration: 0.18
                        }
                    );

            }
        );

    }


    // =====================================================
    // PROCESSING FAILURE
    // =====================================================

    function playProcessingFailure() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    .to(
                        processingMessage,
                        {
                            x: -3,

                            opacity: 0.25,

                            duration: 0.035
                        }
                    )

                    .to(
                        processingMessage,
                        {
                            x: 4,

                            opacity: 0.9,

                            duration: 0.035
                        }
                    )

                    .to(
                        processingMessage,
                        {
                            x: 0,

                            duration: 0.055
                        }
                    )

                    .call(
                        playInterferenceLine
                    );

            }
        );

    }


    // =====================================================
    // HIDE PROCESSING
    // =====================================================

    function hideProcessing() {

        return new Promise(
            resolve => {

                gsap.to(
                    processingMessage,
                    {
                        opacity: 0,

                        duration: 0.15,

                        onComplete: resolve
                    }
                );

            }
        );

    }


    // =====================================================
    // SYSTEM RESPONSE
    // =====================================================

    function showSystemResponse() {

        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })

                    /*
                        El resto de la interfaz
                        baja ligeramente.
                    */

                    .to(
                        [
                            selectedQuestionSection,
                            systemDivider
                        ],
                        {
                            opacity: 0.18,

                            duration: 0.2
                        }
                    )


                    /*
                        Pequeño blackout.
                    */

                    .to(
                        systemFrame,
                        {
                            opacity: 0.5,

                            duration: 0.04
                        }
                    )

                    .to(
                        systemFrame,
                        {
                            opacity: 1,

                            duration: 0.07
                        }
                    )


                    /*
                        La respuesta aparece.
                    */

                    .to(
                        systemResponseSection,
                        {
                            opacity: 1,

                            duration: 0.12
                        }
                    )

                    .fromTo(
                        systemResponse,

                        {
                            opacity: 0,

                            scale: 0.985,

                            filter:
                                "brightness(1.8)"
                        },

                        {
                            opacity: 1,

                            scale: 1,

                            filter:
                                "brightness(1)",

                            duration: 0.28,

                            ease:
                                "power2.out"
                        }
                    )


                    /*
                        Glitch breve.
                    */

                    .to(
                        systemResponse,
                        {
                            x: -3,

                            duration: 0.035
                        }
                    )

                    .to(
                        systemResponse,
                        {
                            x: 4,

                            duration: 0.035
                        }
                    )

                    .to(
                        systemResponse,
                        {
                            x: 0,

                            duration: 0.06
                        }
                    )

                    .to(
                        responseCursor,
                        {
                            opacity: 1,

                            duration: 0.12
                        }
                    )

                    .call(
                        startResponseCursorBlink
                    )

                    .call(
                        playMediumGlitch
                    );

            }
        );

    }


    // =====================================================
    // RESPONSE CURSOR
    // =====================================================

    function startResponseCursorBlink() {

        if (!responseCursorBlock) {
            return;
        }


        gsap.killTweensOf(
            responseCursorBlock
        );


        gsap.to(
            responseCursorBlock,
            {
                opacity: 0.08,

                duration: 0.3,

                repeat: -1,

                yoyo: true,

                ease: "steps(1)"
            }
        );

    }


    // =====================================================
    // CONTROL MESSAGE
    // =====================================================

    function showControlMessage(
        element,
        number
    ) {

        return new Promise(
            resolve => {

                gsap.to(
                    controlLossSection,
                    {
                        opacity: 1,

                        duration: 0.12
                    }
                );


                const timeline =
                    gsap.timeline({
                        onComplete: resolve
                    });


                timeline.fromTo(
                    element,

                    {
                        opacity: 0,

                        x: -3
                    },

                    {
                        opacity:
                            number >= 3
                                ? 1
                                : 0.72,

                        x: 0,

                        duration: 0.2
                    }
                );


                if (
                    number >= 2
                ) {

                    timeline
                        .to(
                            element,
                            {
                                x: 2,

                                opacity: 0.35,

                                duration: 0.035
                            }
                        )

                        .to(
                            element,
                            {
                                x: 0,

                                opacity:
                                    number >= 3
                                        ? 1
                                        : 0.72,

                                duration: 0.055
                            }
                        );

                }


                if (
                    number === 3
                ) {

                    timeline.call(
                        playMediumGlitch
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


        const noiseLevels = {

            0: 0.02,

            1: 0.04,

            2: 0.08,

            3: 0.14,

            4: 0.22

        };


        const scanLevels = {

            0: 0.11,

            1: 0.14,

            2: 0.19,

            3: 0.26,

            4: 0.36

        };


        gsap.to(
            sceneNoise,
            {
                opacity:
                    noiseLevels[
                        corruptionLevel
                    ],

                duration: 0.35
            }
        );


        gsap.to(
            sceneScanlines,
            {
                opacity:
                    scanLevels[
                        corruptionLevel
                    ],

                duration: 0.35
            }
        );


        /*
            Cada aumento produce una
            reacción inmediata.
        */

        if (
            corruptionLevel === 1
        ) {

            playSoftGlitch();

        }


        if (
            corruptionLevel === 2
        ) {

            playMediumGlitch();

        }


        if (
            corruptionLevel === 3
        ) {

            playStrongGlitch();

        }


        if (
            corruptionLevel >= 4
        ) {

            playStrongGlitch();

            gsap.delayedCall(
                0.22,
                playFrameFailure
            );

        }

    }


    // =====================================================
    // SOFT GLITCH
    // =====================================================

    function playSoftGlitch() {

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
                    opacity: 0.16,

                    x:
                        gsap.utils.random(
                            -9,
                            9
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
    // MEDIUM GLITCH
    // =====================================================

    function playMediumGlitch() {

        gsap.timeline()

            .to(
                glitchLayers[0],
                {
                    opacity: 0.3,

                    x: 18,

                    duration: 0.035
                }
            )

            .to(
                glitchLayers[2],
                {
                    opacity: 0.23,

                    x: -20,

                    duration: 0.035
                },

                "<"
            )

            .to(
                systemContent,
                {
                    x: -3,

                    duration: 0.035
                },

                "<"
            )

            .to(
                systemContent,
                {
                    x: 3,

                    duration: 0.035
                }
            )

            .to(
                systemContent,
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


        playInterferenceLine();

    }


    // =====================================================
    // STRONG GLITCH
    // =====================================================

    function playStrongGlitch() {

        gsap.timeline()

            .to(
                glitchLayers[0],
                {
                    opacity: 0.5,

                    x: 28,

                    duration: 0.035
                }
            )

            .to(
                glitchLayers[1],
                {
                    opacity: 0.4,

                    x: -34,

                    duration: 0.035
                },

                "<"
            )

            .to(
                glitchLayers[2],
                {
                    opacity: 0.34,

                    x: 23,

                    duration: 0.035
                },

                "<"
            )

            .to(
                systemFrame,
                {
                    x: -5,

                    filter:
                        "brightness(1.5)",

                    duration: 0.035
                },

                "<"
            )

            .to(
                systemContent,
                {
                    x: 5,

                    opacity: 0.62,

                    duration: 0.035
                },

                "<"
            )

            .to(
                systemFrame,
                {
                    x: 6,

                    filter:
                        "brightness(0.65)",

                    duration: 0.04
                }
            )

            .to(
                systemContent,
                {
                    x: -4,

                    opacity: 1,

                    duration: 0.04
                },

                "<"
            )

            .to(
                [
                    systemFrame,
                    systemContent
                ],
                {
                    x: 0,

                    opacity: 1,

                    filter:
                        "brightness(1)",

                    duration: 0.07
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


        playInterferenceLine();

    }


    // =====================================================
    // FRAME FAILURE
    // =====================================================

    function playFrameFailure() {

        gsap.timeline()

            .to(
                systemFrame,
                {
                    opacity: 0.18,

                    borderColor:
                        "rgba(0,255,56,0.2)",

                    duration: 0.035
                }
            )

            .to(
                systemFrame,
                {
                    opacity: 1,

                    borderColor:
                        "#00ff38",

                    duration: 0.055
                }
            )

            .to(
                systemFrame,
                {
                    opacity: 0.42,

                    duration: 0.025
                }
            )

            .to(
                systemFrame,
                {
                    opacity: 1,

                    duration: 0.06
                }
            );

    }


    // =====================================================
    // INTERFERENCE
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

                xPercent: -24
            }
        );


        gsap.timeline()

            .to(
                line,
                {
                    opacity:
                        0.2 +
                        corruptionLevel *
                        0.1,

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

                min = 3;
                max = 5;

                break;


            case 2:

                min = 1.8;
                max = 3.2;

                break;


            case 3:

                min = 0.9;
                max = 1.8;

                break;


            default:

                min = 0.32;
                max = 0.85;

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


                if (
                    corruptionLevel === 0
                ) {

                    if (
                        random > 0.75
                    ) {

                        playSoftGlitch();

                    }

                }


                if (
                    corruptionLevel === 1
                ) {

                    playSoftGlitch();


                    if (
                        random > 0.7
                    ) {

                        playInterferenceLine();

                    }

                }


                if (
                    corruptionLevel === 2
                ) {

                    if (
                        random > 0.4
                    ) {

                        playMediumGlitch();

                    }
                    else {

                        playSoftGlitch();

                    }

                }


                if (
                    corruptionLevel === 3
                ) {

                    playMediumGlitch();


                    if (
                        random > 0.5
                    ) {

                        playFrameFailure();

                    }


                    if (
                        random > 0.72
                    ) {

                        showRandomError();

                    }

                }


                if (
                    corruptionLevel >= 4
                ) {

                    if (
                        random > 0.42
                    ) {

                        playStrongGlitch();

                    }
                    else {

                        playMediumGlitch();

                    }


                    if (
                        random > 0.55
                    ) {

                        playFrameFailure();

                    }


                    if (
                        random > 0.65
                    ) {

                        showRandomError();

                    }

                }


                corruptionLoop();

            }
        );

    }


    // =====================================================
    // RANDOM ERROR
    // =====================================================

    function showRandomError() {

        const errors = [
            "ERR_██",
            "INPUT_NULL",
            "CTRL_▒▒",
            "SESSION_ACTIVE",
            "ACCESS_REVOKED"
        ];


        systemErrorText.textContent =
            errors[
                Math.floor(
                    Math.random() *
                    errors.length
                )
            ];


        gsap.timeline()

            .to(
                systemErrorText,
                {
                    opacity: 0.72,

                    x:
                        gsap.utils.random(
                            -12,
                            12
                        ),

                    y:
                        gsap.utils.random(
                            -6,
                            6
                        ),

                    duration: 0.035
                }
            )

            .to(
                systemErrorText,
                {
                    opacity: 0,

                    x: 0,
                    y: 0,

                    duration: 0.07
                }
            );

    }


    // =====================================================
    // MICRO SHAKE
    // =====================================================

    function microShakeLoop() {

        gsap.delayedCall(
            corruptionLevel >= 3
                ? 0.42
                : 1.2,

            () => {

                if (
                    !sceneEnding &&
                    corruptionLevel >= 3
                ) {

                    gsap.to(
                        systemContent,
                        {
                            x:
                                gsap.utils.random(
                                    -1.2,
                                    1.2
                                ),

                            y:
                                gsap.utils.random(
                                    -0.5,
                                    0.5
                                ),

                            duration: 0.025,

                            onComplete:
                                () => {

                                    gsap.set(
                                        systemContent,
                                        {
                                            x: 0,
                                            y: 0
                                        }
                                    );

                                }
                        }
                    );

                }


                microShakeLoop();

            }
        );

    }


    // =====================================================
    // SCENE 08 TRANSITION
    // =====================================================

    function playScene08Transition() {

        sceneEnding =
            true;


        return new Promise(
            resolve => {

                gsap.timeline({
                    onComplete: resolve
                })


                    // -------------------------------------
                    // ÚLTIMO MENSAJE PARPADEA
                    // -------------------------------------

                    .to(
                        systemContent,
                        {
                            opacity: 0.28,

                            duration: 0.05
                        }
                    )

                    .to(
                        systemContent,
                        {
                            opacity: 1,

                            duration: 0.06
                        }
                    )


                    // -------------------------------------
                    // MARCO EMPIEZA A FALLAR
                    // -------------------------------------

                    .to(
                        systemFrame,
                        {
                            x: -7,

                            filter:
                                "brightness(1.7)",

                            duration: 0.04
                        }
                    )

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.62,

                            x: 32,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.5,

                            x: -38,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        glitchLayers[2],
                        {
                            opacity: 0.4,

                            x: 24,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        systemFrame,
                        {
                            x: 8,

                            filter:
                                "brightness(0.45)",

                            duration: 0.04
                        }
                    )

                    .to(
                        systemContent,
                        {
                            x: -8,

                            opacity: 0.6,

                            duration: 0.04
                        },

                        "<"
                    )


                    // -------------------------------------
                    // ERROR FLASH
                    // -------------------------------------

                    .to(
                        systemErrorText,
                        {
                            opacity: 1,

                            duration: 0.04
                        }
                    )

                    .to(
                        systemErrorText,
                        {
                            opacity: 0,

                            duration: 0.05
                        }
                    )


                    // -------------------------------------
                    // GREEN FLASH
                    // -------------------------------------

                    .to(
                        systemFlash,
                        {
                            opacity: 0.13,

                            duration: 0.035
                        }
                    )

                    .to(
                        systemFlash,
                        {
                            opacity: 0,

                            duration: 0.05
                        }
                    )


                    // -------------------------------------
                    // ÚLTIMO TEAR
                    // -------------------------------------

                    .to(
                        systemFrame,
                        {
                            opacity: 0.25,

                            x: -13,

                            duration: 0.04
                        }
                    )

                    .to(
                        systemContent,
                        {
                            opacity: 0.18,

                            x: 11,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        glitchLayers,
                        {
                            opacity: 0.8,

                            duration: 0.04
                        },

                        "<"
                    )


                    // -------------------------------------
                    // BLACKOUT
                    // -------------------------------------

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
    // INIT
    // =====================================================

    function init() {

        setInitialState();

        corruptionLoop();

        microShakeLoop();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        showSystemMessage,

        showDivider,

        showQuestions,

        hideQuestions,

        showSelectedQuestion,

        showProcessing,

        playProcessingFailure,

        hideProcessing,

        showSystemResponse,

        showControlMessage,

        setCorruptionLevel,

        playScene08Transition

    };


})();