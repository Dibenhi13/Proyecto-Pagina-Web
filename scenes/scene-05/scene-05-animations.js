// =========================================================
// ESCENA 05 — ANIMACIONES
// Progressive System Corruption
// The Lost Ship
// =========================================================


window.Scene05Animations = (() => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const interfaceElement =
        document.querySelector(
            "#archive-interface"
        );


    const header =
        document.querySelector(
            "#system-header"
        );


    const cameraPanel =
        document.querySelector(
            "#camera-panel"
        );


    const archivePanel =
        document.querySelector(
            "#archive-panel"
        );


    const logsPanel =
        document.querySelector(
            "#logs-panel"
        );


    const archiveFiles =
        document.querySelectorAll(
            ".archive-file"
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


    const recoveryProgressValue =
        document.querySelector(
            "#recovery-progress-value"
        );


    const fileModal =
        document.querySelector(
            "#file-modal"
        );


    const fileWindow =
        document.querySelector(
            "#file-window"
        );


    const audioVisualizer =
        document.querySelector(
            "#audio-visualizer"
        );


    const audioBars =
        document.querySelectorAll(
            "#audio-visualizer span"
        );


    const recoveredVideoStatic =
        document.querySelector(
            "#recovered-video-static"
        );


    const securityAlert =
        document.querySelector(
            "#security-alert"
        );


    const securityAlertWindow =
        document.querySelector(
            "#security-alert-window"
        );


    const glitchLayers = [
        document.querySelector("#glitch-layer-01"),
        document.querySelector("#glitch-layer-02"),
        document.querySelector("#glitch-layer-03")
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
            archivePanel,
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
            fileModal,
            {
                opacity: 0,
                visibility: "hidden",
                pointerEvents: "none"
            }
        );


        gsap.set(
            fileWindow,
            {
                opacity: 0,
                y: 8
            }
        );


        gsap.set(
            securityAlert,
            {
                opacity: 0,
                visibility: "hidden",
                pointerEvents: "none"
            }
        );


        gsap.set(
            securityAlertWindow,
            {
                opacity: 0,
                scale: 0.98
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

                    .to(
                        {},
                        {
                            duration: 0.18
                        }
                    )

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.35,
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
                            x: 0,

                            duration: 0.06
                        }
                    )

                    .to(
                        interfaceElement,
                        {
                            opacity: 1,

                            duration: 0.16
                        }
                    )

                    .to(
                        [
                            header,
                            cameraPanel,
                            archivePanel,
                            logsPanel
                        ],
                        {
                            opacity: 1,
                            x: 0,
                            y: 0,

                            duration: 0.25,

                            stagger: 0.05
                        }
                    );

            }
        );

    }


    // =====================================================
    // LOG
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

                duration: 0.18
            }
        );

    }


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

                duration: 0.35,

                repeat: -1,
                yoyo: true,

                ease: "steps(1)"
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
                        8,
                        92
                    )}%`,

                xPercent: -30
            }
        );


        gsap.timeline()

            .to(
                line,
                {
                    opacity:
                        instabilityLevel >= 3
                            ? 0.7
                            : 0.45,

                    xPercent: 20,

                    duration: 0.035
                }
            )

            .to(
                line,
                {
                    opacity: 0,

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
            instabilityLevel * 7;


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
                        instabilityLevel >= 3
                            ? 0.5
                            : 0.3,

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
    // PANEL FAILURE
    // =====================================================

    function playPanelFailure() {

        const panels = [
            cameraPanel,
            archivePanel,
            logsPanel
        ];


        const panel =
            panels[
                Math.floor(
                    Math.random() *
                    panels.length
                )
            ];


        gsap.timeline()

            .to(
                panel,
                {
                    opacity:
                        instabilityLevel >= 3
                            ? 0.25
                            : 0.55,

                    x:
                        gsap.utils.random(
                            -5,
                            5
                        ),

                    filter:
                        "brightness(1.7)",

                    duration: 0.04
                }
            )

            .to(
                panel,
                {
                    opacity: 1,
                    x: 0,

                    filter:
                        "brightness(1)",

                    duration: 0.08
                }
            );

    }


    // =====================================================
    // GRID FLICKER
    // =====================================================

    function playGridFlicker() {

        const unlocked =
            Array.from(
                archiveFiles
            )
                .filter(
                    file =>
                        !file.disabled
                );


        if (
            unlocked.length === 0
        ) {

            return;

        }


        const amount =
            instabilityLevel >= 3
                ? Math.min(
                    3,
                    unlocked.length
                )
                : 1;


        const selected =
            gsap.utils.shuffle(
                unlocked
            )
                .slice(
                    0,
                    amount
                );


        gsap.timeline()

            .to(
                selected,
                {
                    opacity: 0.18,

                    filter:
                        "brightness(1.8)",

                    x: () =>
                        gsap.utils.random(
                            -3,
                            3
                        ),

                    duration: 0.035
                }
            )

            .to(
                selected,
                {
                    opacity: index => {

                        return selected[index]
                            .classList
                            .contains("visited")
                                ? 0.72
                                : 1;

                    },

                    filter:
                        "brightness(1)",

                    x: 0,

                    duration: 0.08
                }
            );

    }


    // =====================================================
    // FULL INTERFACE TEAR
    // =====================================================

    function playInterfaceTear() {

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    x:
                        gsap.utils.random(
                            -7,
                            7
                        ),

                    skewX:
                        gsap.utils.random(
                            -0.4,
                            0.4
                        ),

                    filter:
                        "brightness(1.4)",

                    duration: 0.035
                }
            )

            .to(
                interfaceElement,
                {
                    x:
                        gsap.utils.random(
                            -4,
                            4
                        ),

                    skewX: 0,

                    filter:
                        "brightness(0.65)",

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

        playInterferenceLine();

    }


    // =====================================================
    // DROPOUT
    // =====================================================

    function playDropout() {

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    opacity: 0.08,

                    duration: 0.035
                }
            )

            .to(
                interfaceElement,
                {
                    opacity: 0.6,

                    duration: 0.045
                }
            )

            .to(
                interfaceElement,
                {
                    opacity: 0.15,

                    duration: 0.025
                }
            )

            .to(
                interfaceElement,
                {
                    opacity: 1,

                    duration: 0.07
                }
            );

    }


    // =====================================================
    // CAMBIO DE NIVEL
    // =====================================================

    function setInstabilityLevel(
        level
    ) {

        instabilityLevel =
            level;


        /*
            Cambio de fase MUY visible.
        */

        gsap.timeline()

            .to(
                interfaceElement,
                {
                    x: -7,

                    filter:
                        "brightness(1.8)",

                    duration: 0.045
                }
            )

            .to(
                glitchLayers,
                {
                    opacity: 0.45,

                    duration: 0.035
                },

                "<"
            )

            .to(
                interfaceElement,
                {
                    x: 8,

                    filter:
                        "brightness(0.55)",

                    duration: 0.045
                }
            )

            .to(
                systemFlash,
                {
                    opacity:
                        level >= 3
                            ? 0.13
                            : 0.07,

                    duration: 0.035
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


        /*
            Ruido persistente diferente
            por fase.
        */

        const noise = {

            1: 0.055,

            2: 0.11,

            3: 0.17,

            4: 0.25

        };


        gsap.to(
            systemNoise,
            {
                opacity:
                    noise[level],

                duration: 0.3
            }
        );


        /*
            Nivel 2.
        */

        if (
            level >= 2
        ) {

            playPanelFailure();

            playGridFlicker();

        }


        /*
            Nivel 3.
        */

        if (
            level >= 3
        ) {

            playInterfaceTear();

            gsap.delayedCall(
                0.18,
                playDropout
            );

        }


        /*
            Nivel 4.
        */

        if (
            level >= 4
        ) {

            gsap.delayedCall(
                0.25,

                () => {

                    playInterfaceTear();

                    playGridFlicker();

                }
            );

        }

    }


    // =====================================================
    // CORRUPCIÓN CONSTANTE
    // =====================================================

    function corruptionLoop() {

        let min;
        let max;


        switch (
            instabilityLevel
        ) {

            case 1:

                min = 2.2;
                max = 4.5;

                break;


            case 2:

                min = 1.1;
                max = 2.2;

                break;


            case 3:

                min = 0.45;
                max = 1.15;

                break;


            case 4:

                min = 0.18;
                max = 0.55;

                break;

        }


        gsap.delayedCall(
            gsap.utils.random(
                min,
                max
            ),

            () => {

                const random =
                    Math.random();


                // -------------------------------------
                // NIVEL 1
                // -------------------------------------

                if (
                    instabilityLevel === 1
                ) {

                    if (
                        random > 0.45
                    ) {

                        playInterferenceLine();

                    }

                    if (
                        random > 0.72
                    ) {

                        playGlitchSlice();

                    }

                }


                // -------------------------------------
                // NIVEL 2
                // -------------------------------------

                if (
                    instabilityLevel === 2
                ) {

                    playGlitchSlice();


                    if (
                        random > 0.35
                    ) {

                        playPanelFailure();

                    }


                    if (
                        random > 0.5
                    ) {

                        playGridFlicker();

                    }


                    if (
                        random > 0.65
                    ) {

                        playInterferenceLine();

                    }

                }


                // -------------------------------------
                // NIVEL 3
                // -------------------------------------

                if (
                    instabilityLevel === 3
                ) {

                    playGlitchSlice();

                    playInterferenceLine();


                    if (
                        random > 0.25
                    ) {

                        playGridFlicker();

                    }


                    if (
                        random > 0.45
                    ) {

                        playPanelFailure();

                    }


                    if (
                        random > 0.64
                    ) {

                        playInterfaceTear();

                    }


                    if (
                        random > 0.82
                    ) {

                        playDropout();

                    }

                }


                // -------------------------------------
                // NIVEL 4
                // -------------------------------------

                if (
                    instabilityLevel >= 4
                ) {

                    playGlitchSlice();

                    playInterferenceLine();

                    playGridFlicker();


                    if (
                        random > 0.25
                    ) {

                        playPanelFailure();

                    }


                    if (
                        random > 0.4
                    ) {

                        playInterfaceTear();

                    }


                    if (
                        random > 0.64
                    ) {

                        playDropout();

                    }

                }


                corruptionLoop();

            }
        );

    }


    // =====================================================
    // MICRO SHAKE CONSTANTE
    // =====================================================

    function microShakeLoop() {

        gsap.delayedCall(
            instabilityLevel >= 3
                ? 0.28
                : 0.8,

            () => {

                if (
                    instabilityLevel >= 3
                ) {

                    gsap.to(
                        interfaceElement,
                        {
                            x:
                                gsap.utils.random(
                                    -1.5,
                                    1.5
                                ),

                            y:
                                gsap.utils.random(
                                    -0.7,
                                    0.7
                                ),

                            duration:
                                0.035,

                            onComplete:
                                () => {

                                    gsap.set(
                                        interfaceElement,
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
    // SIGNAL
    // =====================================================

    function signalLoop() {

        let min;
        let max;
        let interval;


        switch (
            instabilityLevel
        ) {

            case 1:

                min = 67;
                max = 79;
                interval = 1.8;

                break;


            case 2:

                min = 53;
                max = 74;
                interval = 1.1;

                break;


            case 3:

                min = 36;
                max = 68;
                interval = 0.65;

                break;


            case 4:

                min = 18;
                max = 61;
                interval = 0.35;

                break;

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
                0.08,

                () => {

                    signalStrength.textContent =
                        `${value}%`;

                }
            );

        }


        gsap.delayedCall(
            interval,
            signalLoop
        );

    }


    // =====================================================
    // CONNECTION STATUS CORRUPTION
    // =====================================================

    function connectionLoop() {

        gsap.delayedCall(
            1.1,

            () => {

                if (
                    instabilityLevel >= 3 &&
                    Math.random() > 0.65
                ) {

                    const original =
                        connectionStatus.textContent;


                    connectionStatus.textContent =
                        Math.random() > 0.5
                            ? "CONNEC▒ED"
                            : "ERR_██";


                    gsap.delayedCall(
                        0.1,

                        () => {

                            connectionStatus.textContent =
                                original;

                        }
                    );

                }


                connectionLoop();

            }
        );

    }


    // =====================================================
    // DATA STREAM
    // =====================================================

    function dataStreamLoop() {

        gsap.delayedCall(
            1,

            () => {

                if (
                    instabilityLevel >= 3 &&
                    Math.random() > 0.6
                ) {

                    const original =
                        dataStatus.textContent;


                    dataStatus.textContent =
                        "UNSTABLE";


                    gsap.delayedCall(
                        0.18,

                        () => {

                            dataStatus.textContent =
                                original;

                        }
                    );

                }


                dataStreamLoop();

            }
        );

    }


    // =====================================================
    // DENIED
    // =====================================================

    function playDeniedControl(
        button,
        message
    ) {

        const original =
            button.textContent;


        gsap.timeline()

            .to(
                button,
                {
                    x: -3,
                    opacity: 0.35,

                    duration: 0.04
                }
            )

            .call(
                () => {

                    button.textContent =
                        message;

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
                {},
                {
                    duration: 0.7
                }
            )

            .call(
                () => {

                    button.textContent =
                        original;

                }
            )

            .to(
                button,
                {
                    x: 0,

                    duration: 0.05
                }
            );


        playGlitchSlice();

    }


    // =====================================================
    // MODAL
    // =====================================================

    function openFileModal() {

        gsap.set(
            fileModal,
            {
                visibility: "visible",
                pointerEvents: "auto"
            }
        );


        gsap.timeline()

            .to(
                fileModal,
                {
                    opacity: 1,

                    duration: 0.15
                }
            )

            .to(
                fileWindow,
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.18
                }
            );

    }


    function closeFileModal(
        onComplete
    ) {

        gsap.timeline({
            onComplete
        })

            .to(
                fileWindow,
                {
                    opacity: 0,
                    y: 6,

                    duration: 0.13
                }
            )

            .to(
                fileModal,
                {
                    opacity: 0,

                    duration: 0.1
                }
            )

            .set(
                fileModal,
                {
                    visibility: "hidden",
                    pointerEvents: "none"
                }
            );

    }


    // =====================================================
    // CONTENT
    // =====================================================

    function showFileContent(
        element
    ) {

        gsap.fromTo(
            element,

            {
                opacity: 0,
                y: 4
            },

            {
                opacity: 1,
                y: 0,

                duration: 0.2
            }
        );

    }


    function showChatContent(
        element
    ) {

        gsap.set(
            element,
            {
                opacity: 1
            }
        );


        const messages =
            element.querySelectorAll(
                ".chat-message"
            );


        gsap.fromTo(
            messages,

            {
                opacity: 0,
                x: -4
            },

            {
                opacity: 1,
                x: 0,

                duration: 0.22,

                stagger: 0.55
            }
        );

    }


    function showVideoContent(
        element
    ) {

        showFileContent(
            element
        );


        gsap.timeline()

            .to(
                recoveredVideoStatic,
                {
                    opacity: 0.5,

                    duration: 0.04
                }
            )

            .to(
                recoveredVideoStatic,
                {
                    opacity: 0,

                    duration: 0.08
                }
            );

    }


    function showImageContent(
        element
    ) {

        showFileContent(
            element
        );


        playGlitchSlice();

    }


    function showArchiveContent(
        element
    ) {

        showFileContent(
            element
        );


        const lines =
            element.querySelectorAll(
                "p"
            );


        gsap.fromTo(
            lines,

            {
                opacity: 0,
                x: -3
            },

            {
                opacity: 1,
                x: 0,

                duration: 0.15,

                stagger: 0.14
            }
        );

    }


    // =====================================================
    // UNLOCK
    // =====================================================

    function animateFileUnlock(
        file
    ) {

        gsap.timeline()

            .set(
                file,
                {
                    opacity: 0.1
                }
            )

            .to(
                file,
                {
                    opacity: 1,

                    filter:
                        "brightness(2)",

                    boxShadow:
                        "0 0 22px rgba(0,255,56,0.55)",

                    duration: 0.08
                }
            )

            .to(
                file,
                {
                    x: -4,

                    duration: 0.04
                }
            )

            .to(
                file,
                {
                    x: 4,

                    duration: 0.04
                }
            )

            .to(
                file,
                {
                    x: 0,

                    filter:
                        "brightness(1)",

                    boxShadow:
                        "0 0 10px rgba(0,255,56,0.2)",

                    duration: 0.15
                }
            );

    }


    // =====================================================
    // PROGRESS
    // =====================================================

    function pulseRecoveryProgress() {

        gsap.fromTo(
            recoveryProgressValue,

            {
                opacity: 0.2
            },

            {
                opacity: 1,

                duration: 0.15
            }
        );

    }


    // =====================================================
    // AUDIO
    // =====================================================

    function startAudioVisualizer() {

        gsap.to(
            audioVisualizer,
            {
                opacity: 1,

                duration: 0.1
            }
        );


        audioBars.forEach(
            bar => {

                gsap.to(
                    bar,
                    {
                        scaleY:
                            gsap.utils.random(
                                1,
                                4
                            ),

                        opacity:
                            gsap.utils.random(
                                0.4,
                                1
                            ),

                        duration:
                            gsap.utils.random(
                                0.1,
                                0.28
                            ),

                        repeat: -1,

                        yoyo: true
                    }
                );

            }
        );

    }


    function stopAudioVisualizer() {

        audioBars.forEach(
            bar => {

                gsap.killTweensOf(
                    bar
                );


                gsap.to(
                    bar,
                    {
                        scaleY: 1,

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


    function playAudioDamageGlitch() {

        playInterfaceTear();

    }


    function playAudioEndGlitch() {

        playGlitchSlice();

        playInterferenceLine();

    }


    function playLockedModalFeedback() {

        gsap.timeline()

            .to(
                fileWindow,
                {
                    x: -4,

                    duration: 0.04
                }
            )

            .to(
                fileWindow,
                {
                    x: 4,

                    duration: 0.04
                }
            )

            .to(
                fileWindow,
                {
                    x: 0,

                    duration: 0.07
                }
            );

    }


    // =====================================================
    // SCENE 06 TRANSITION
    // =====================================================

    function playScene06Transition() {

        return new Promise(
            resolve => {


                /*
                    Mostrar alerta.
                */

                gsap.set(
                    securityAlert,
                    {
                        visibility:
                            "visible",

                        pointerEvents:
                            "auto"
                    }
                );


                gsap.timeline({
                    onComplete: resolve
                })


                    // -------------------------------------
                    // EL ARCHIVO FINAL COLAPSA
                    // -------------------------------------

                    .to(
                        fileWindow,
                        {
                            x: -8,

                            filter:
                                "brightness(2)",

                            duration: 0.04
                        }
                    )

                    .to(
                        glitchLayers[0],
                        {
                            opacity: 0.6,
                            x: 30,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        glitchLayers[1],
                        {
                            opacity: 0.5,
                            x: -35,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        fileWindow,
                        {
                            x: 10,

                            opacity: 0.35,

                            duration: 0.04
                        }
                    )


                    // -------------------------------------
                    // MODAL DESAPARECE
                    // -------------------------------------

                    .to(
                        fileModal,
                        {
                            opacity: 0,

                            duration: 0.08
                        }
                    )


                    // -------------------------------------
                    // INTERFAZ SE ROMPE
                    // -------------------------------------

                    .to(
                        interfaceElement,
                        {
                            x: -8,

                            opacity: 0.5,

                            filter:
                                "brightness(1.8)",

                            duration: 0.04
                        }
                    )

                    .to(
                        interfaceElement,
                        {
                            x: 9,

                            opacity: 0.9,

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

                            duration: 0.06
                        }
                    )


                    // -------------------------------------
                    // ALERTA
                    // -------------------------------------

                    .to(
                        securityAlert,
                        {
                            opacity: 1,

                            duration: 0.08
                        }
                    )

                    .to(
                        securityAlertWindow,
                        {
                            opacity: 1,

                            scale: 1,

                            duration: 0.1
                        }
                    )


                    // -------------------------------------
                    // ALERTA GLITCHEA
                    // -------------------------------------

                    .to(
                        securityAlertWindow,
                        {
                            x: -5,

                            duration: 0.04
                        }
                    )

                    .to(
                        securityAlertWindow,
                        {
                            x: 5,

                            duration: 0.04
                        }
                    )

                    .to(
                        securityAlertWindow,
                        {
                            x: 0,

                            duration: 0.06
                        }
                    )


                    // -------------------------------------
                    // LE DAMOS TIEMPO PARA LEER
                    // -------------------------------------

                    .to(
                        {},
                        {
                            duration: 0.9
                        }
                    )


                    // -------------------------------------
                    // GLITCH FINAL
                    // -------------------------------------

                    .to(
                        glitchLayers,
                        {
                            opacity: 0.7,

                            duration: 0.04
                        }
                    )

                    .to(
                        systemFlash,
                        {
                            opacity: 0.14,

                            duration: 0.035
                        },

                        "<"
                    )

                    .to(
                        interfaceElement,
                        {
                            x: -12,

                            opacity: 0.2,

                            duration: 0.04
                        },

                        "<"
                    )

                    .to(
                        interfaceElement,
                        {
                            x: 10,

                            opacity: 0.8,

                            duration: 0.04
                        }
                    )


                    // -------------------------------------
                    // BLACKOUT
                    // -------------------------------------

                    .to(
                        sceneTransition,
                        {
                            opacity: 1,

                            duration: 0.16,

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


        /*
            Lo importante ahora es que
            estos loops SIEMPRE revisan
            el nivel actual.
        */

        corruptionLoop();

        microShakeLoop();

        signalLoop();

        connectionLoop();

        dataStreamLoop();

    }


    // =====================================================
    // API
    // =====================================================

    return {

        init,

        playSceneEntry,

        showSystemLog,

        showSystemCursor,

        playDeniedControl,

        openFileModal,

        closeFileModal,

        showFileContent,

        showChatContent,

        showVideoContent,

        showImageContent,

        showArchiveContent,

        animateFileUnlock,

        pulseRecoveryProgress,

        startAudioVisualizer,

        stopAudioVisualizer,

        playAudioDamageGlitch,

        playAudioEndGlitch,

        playLockedModalFeedback,

        setInstabilityLevel,

        playScene06Transition

    };


})();