// =========================================================
// ESCENA 01 — ANIMACIONES GSAP
// Incoming Transmission
// The Lost Ship
// =========================================================


window.Scene01Animations = (() => {


    // =====================================================
    // ELEMENTOS DEL DOM
    // =====================================================

    const scene =
        document.querySelector("#scene-01");


    const terminalContent =
        document.querySelector(".terminal-content");


    const terminalNoise =
        document.querySelector(".terminal-noise");


    const scanlines =
        document.querySelector(".scanlines");


    const frameTop =
        document.querySelector(".frame-top");

    const frameRight =
        document.querySelector(".frame-right");

    const frameBottom =
        document.querySelector(".frame-bottom");

    const frameLeft =
        document.querySelector(".frame-left");


    const interferenceLine1 =
        document.querySelector(
            "#interference-line-1"
        );

    const interferenceLine2 =
        document.querySelector(
            "#interference-line-2"
        );


    const acceptContainer =
        document.querySelector(
            "#accept-container"
        );

    const acceptButton =
        document.querySelector(
            "#accept-transmission"
        );

    const acceptText =
        document.querySelector(
            "#accept-text"
        );


    const terminalFlash =
        document.querySelector(
            "#terminal-flash"
        );


    const transitionOverlay =
        document.querySelector(
            "#transition-overlay"
        );


    // =====================================================
    // ESTADO
    // =====================================================

    let randomInterferenceCall = null;

    let buttonBreathingTween = null;

    let interfaceFlickerTween = null;

    let transitionActive = false;


    // =====================================================
    // ESTADO INICIAL
    // =====================================================

    function setInitialState() {

        /*
            La pantalla inicia completamente negra.
        */

        gsap.set(
            terminalContent,
            {
                opacity: 1
            }
        );


        /*
            Los cuatro lados del frame empiezan
            invisibles y comprimidos.
        */

        gsap.set(
            frameTop,
            {
                scaleX: 0,
                opacity: 0
            }
        );


        gsap.set(
            frameRight,
            {
                scaleY: 0,
                opacity: 0
            }
        );


        gsap.set(
            frameBottom,
            {
                scaleX: 0,
                opacity: 0
            }
        );


        gsap.set(
            frameLeft,
            {
                scaleY: 0,
                opacity: 0
            }
        );


        /*
            Botón completamente oculto.
        */

        gsap.set(
            acceptContainer,
            {
                opacity: 0,
                visibility: "hidden",
                y: 5
            }
        );


        /*
            Overlays apagados.
        */

        gsap.set(
            [
                terminalFlash,
                transitionOverlay,
                interferenceLine1,
                interferenceLine2
            ],
            {
                opacity: 0
            }
        );

    }


    // =====================================================
    // DIBUJAR FRAME
    // =====================================================

    function drawTerminalFrame() {

        return new Promise(
            resolve => {

                const timeline =
                    gsap.timeline({

                        onComplete:
                            resolve

                    });


                /*
                    Pequeño destello inicial.
                */

                timeline.to(
                    terminalNoise,

                    {
                        opacity: 0.09,

                        duration: 0.07
                    }
                );


                timeline.to(
                    terminalNoise,

                    {
                        opacity: 0.025,

                        duration: 0.12
                    }
                );


                /*
                    Superior.
                */

                timeline.to(
                    frameTop,

                    {
                        scaleX: 1,
                        opacity: 1,

                        duration: 0.28,

                        ease: "power2.out"
                    }
                );


                /*
                    Derecha.
                */

                timeline.to(
                    frameRight,

                    {
                        scaleY: 1,
                        opacity: 1,

                        duration: 0.18,

                        ease: "power2.out"
                    },

                    "-=0.04"
                );


                /*
                    Inferior.
                */

                timeline.to(
                    frameBottom,

                    {
                        scaleX: 1,
                        opacity: 1,

                        duration: 0.28,

                        ease: "power2.out"
                    },

                    "-=0.04"
                );


                /*
                    Izquierda.
                */

                timeline.to(
                    frameLeft,

                    {
                        scaleY: 1,
                        opacity: 1,

                        duration: 0.18,

                        ease: "power2.out"
                    },

                    "-=0.04"
                );


                /*
                    Flash final muy pequeño.
                */

                timeline.to(
                    [
                        frameTop,
                        frameRight,
                        frameBottom,
                        frameLeft
                    ],

                    {
                        opacity: 0.68,

                        duration: 0.05
                    }
                );


                timeline.to(
                    [
                        frameTop,
                        frameRight,
                        frameBottom,
                        frameLeft
                    ],

                    {
                        opacity: 1,

                        duration: 0.1
                    }
                );

            }
        );

    }


    // =====================================================
    // CURSOR
    // =====================================================

    function showCursor(cursor) {

        gsap.killTweensOf(cursor);


        gsap.set(
            cursor,
            {
                opacity: 1
            }
        );


        gsap.to(
            cursor,

            {
                opacity: 0.15,

                duration: 0.42,

                repeat: -1,
                yoyo: true,

                ease: "steps(1)"
            }
        );

    }


    function hideCursor(cursor) {

        gsap.killTweensOf(cursor);


        gsap.to(
            cursor,

            {
                opacity: 0,

                duration: 0.08
            }
        );

    }


    // =====================================================
    // FLICKER GENERAL MUY SUTIL
    // =====================================================

    function animateInterfaceFlicker() {

        interfaceFlickerTween =
            gsap.to(
                scene,

                {
                    opacity: 0.965,

                    duration: 3.8,

                    repeat: -1,
                    yoyo: true,

                    ease: "sine.inOut"
                }
            );

    }


    // =====================================================
    // MICRO INTERFERENCIA ALEATORIA
    // =====================================================

    function scheduleRandomInterference() {

        if (transitionActive) {
            return;
        }


        const delay =
            gsap.utils.random(
                3.5,
                7
            );


        randomInterferenceCall =
            gsap.delayedCall(
                delay,
                playRandomInterference
            );

    }


    function playRandomInterference() {

        if (transitionActive) {
            return;
        }


        const line =
            Math.random() > 0.5
                ? interferenceLine1
                : interferenceLine2;


        const randomY =
            gsap.utils.random(
                10,
                90
            );


        gsap.set(
            line,

            {
                top: `${randomY}%`,
                x: -15
            }
        );


        const timeline =
            gsap.timeline({

                onComplete:
                    scheduleRandomInterference

            });


        timeline

            .to(
                line,

                {
                    opacity: 0.26,
                    x: 12,

                    duration: 0.035
                }
            )


            .to(
                line,

                {
                    opacity: 0,
                    x: 0,

                    duration: 0.065
                }
            );

    }


    // =====================================================
    // FLICKER ESPECIAL
    // No record of current crew...
    // =====================================================

    function subtleSystemFlicker() {

        const timeline =
            gsap.timeline();


        timeline

            .to(
                terminalContent,

                {
                    opacity: 0.72,
                    x: 1,

                    duration: 0.045
                }
            )


            .to(
                terminalContent,

                {
                    opacity: 0.95,
                    x: -1,

                    duration: 0.055
                }
            )


            .to(
                terminalContent,

                {
                    opacity: 1,
                    x: 0,

                    duration: 0.08
                }
            );


        timeline.to(
            terminalNoise,

            {
                opacity: 0.08,

                duration: 0.04
            },

            0
        );


        timeline.to(
            terminalNoise,

            {
                opacity: 0.025,

                duration: 0.09
            }
        );

    }


    // =====================================================
    // MOSTRAR BOTÓN
    // =====================================================

    function showAcceptButton() {

        gsap.set(
            acceptContainer,

            {
                visibility: "visible"
            }
        );


        const timeline =
            gsap.timeline();


        timeline

            .to(
                acceptContainer,

                {
                    opacity: 0.4,
                    y: 3,

                    duration: 0.12
                }
            )


            .to(
                acceptContainer,

                {
                    opacity: 0.08,

                    duration: 0.05
                }
            )


            .to(
                acceptContainer,

                {
                    opacity: 1,
                    y: 0,

                    duration: 0.28,

                    ease: "power2.out"
                }
            );


        /*
            Breathing permanente del botón.
        */

        buttonBreathingTween =
            gsap.to(
                acceptButton,

                {
                    boxShadow:
                        "0 0 10px rgba(0,255,56,0.65), 0 0 22px rgba(0,255,56,0.12), inset 0 0 8px rgba(0,255,56,0.05)",

                    textShadow:
                        "0 0 7px rgba(0,255,56,0.75)",

                    duration: 1.7,

                    repeat: -1,
                    yoyo: true,

                    ease: "sine.inOut"
                }
            );

    }


    // =====================================================
    // MICRO GLITCH DEL BOTÓN EN HOVER
    // =====================================================

    function playButtonHoverGlitch() {

        if (transitionActive) {
            return;
        }


        const timeline =
            gsap.timeline();


        timeline

            .to(
                acceptText,

                {
                    x: 2,

                    duration: 0.035
                }
            )


            .to(
                acceptText,

                {
                    x: -2,

                    duration: 0.035
                }
            )


            .to(
                acceptText,

                {
                    x: 1,

                    duration: 0.035
                }
            )


            .to(
                acceptText,

                {
                    x: 0,

                    duration: 0.05
                }
            );

    }


    // =====================================================
    // TRANSICIÓN AL ACEPTAR
    // =====================================================

    function playAcceptedTransition(
        onComplete
    ) {

        transitionActive = true;


        /*
            Detenemos efectos ambientales.
        */

        if (randomInterferenceCall) {

            randomInterferenceCall.kill();

        }


        if (buttonBreathingTween) {

            buttonBreathingTween.kill();

        }


        if (interfaceFlickerTween) {

            interfaceFlickerTween.kill();

        }


        const timeline =
            gsap.timeline({

                onComplete:
                    onComplete

            });


        // -----------------------------------------
        // Confirmación del texto
        // -----------------------------------------

        timeline

            .to(
                acceptText,

                {
                    opacity: 0.25,
                    x: 2,

                    duration: 0.04
                }
            )


            .to(
                acceptText,

                {
                    opacity: 1,
                    x: 0,

                    duration: 0.08
                }
            );


        // -----------------------------------------
        // Botón se intensifica
        // -----------------------------------------

        timeline.to(
            acceptButton,

            {
                background:
                    "rgba(0,255,56,0.15)",

                boxShadow:
                    "0 0 18px rgba(0,255,56,0.8), 0 0 40px rgba(0,255,56,0.22)",

                duration: 0.18
            }
        );


        // -----------------------------------------
        // Interferencia horizontal
        // -----------------------------------------

        timeline.set(
            interferenceLine1,

            {
                top: "44%",
                x: -30
            }
        );


        timeline.to(
            interferenceLine1,

            {
                opacity: 0.7,
                x: 30,

                duration: 0.08
            }
        );


        timeline.to(
            interferenceLine1,

            {
                opacity: 0,

                duration: 0.05
            }
        );


        timeline.set(
            interferenceLine2,

            {
                top: "62%",
                x: 25
            }
        );


        timeline.to(
            interferenceLine2,

            {
                opacity: 0.55,
                x: -25,

                duration: 0.07
            },

            "<"
        );


        timeline.to(
            interferenceLine2,

            {
                opacity: 0,

                duration: 0.05
            }
        );


        // -----------------------------------------
        // Subida rápida del verde
        // -----------------------------------------

        timeline.to(
            [
                terminalContent,
                frameTop,
                frameRight,
                frameBottom,
                frameLeft
            ],

            {
                filter:
                    "brightness(1.8)",

                duration: 0.12
            }
        );


        timeline.to(
            terminalNoise,

            {
                opacity: 0.12,

                duration: 0.08
            },

            "<"
        );


        // -----------------------------------------
        // Flash verde
        // -----------------------------------------

        timeline.to(
            terminalFlash,

            {
                opacity: 0.16,

                duration: 0.05
            }
        );


        timeline.to(
            terminalFlash,

            {
                opacity: 0,

                duration: 0.08
            }
        );


        // -----------------------------------------
        // Barrido horizontal
        // -----------------------------------------

        timeline.set(
            transitionOverlay,

            {
                opacity: 1,
                yPercent: -100
            }
        );


        timeline.to(
            transitionOverlay,

            {
                yPercent: 100,

                duration: 0.3,

                ease: "power2.inOut"
            }
        );


        // -----------------------------------------
        // Apagar contenido
        // -----------------------------------------

        timeline.to(
            terminalContent,

            {
                opacity: 0,

                duration: 0.22
            },

            "-=0.15"
        );


        timeline.to(
            [
                frameTop,
                frameRight,
                frameBottom,
                frameLeft
            ],

            {
                opacity: 0,

                duration: 0.16
            },

            "<"
        );


        // -----------------------------------------
        // Negro final
        // -----------------------------------------

        timeline.to(
            scene,

            {
                opacity: 0,

                duration: 0.18
            }
        );

    }


    // =====================================================
    // EVENTO HOVER
    // =====================================================

    acceptButton.addEventListener(
        "mouseenter",
        playButtonHoverGlitch
    );


    // =====================================================
    // INIT
    // =====================================================

    function init() {

        setInitialState();

        animateInterfaceFlicker();

        scheduleRandomInterference();

    }


    // =====================================================
    // API PÚBLICA
    // =====================================================

    return {

        init,

        drawTerminalFrame,

        showCursor,

        hideCursor,

        subtleSystemFlicker,

        showAcceptButton,

        playAcceptedTransition

    };


})();