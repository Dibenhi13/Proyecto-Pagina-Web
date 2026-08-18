// =========================================================
// INDEX — ANIMACIONES
// The Lost Ship
// =========================================================


window.IndexAnimations = (() => {


    // =====================================================
    // ELEMENTOS DEL DOM
    // =====================================================

    const scene =
        document.querySelector("#scene-1");

    const title =
        document.querySelector("#main-title");

    const author =
        document.querySelector("#author");

    const languageSelector =
        document.querySelector(".language-selector");

    const transmissionButton =
        document.querySelector(
            "#transmission-button"
        );

    const starsBack =
        document.querySelector("#stars-back");

    const starsMiddle =
        document.querySelector("#stars-middle");

    const starsFront =
        document.querySelector("#stars-front");

    const noiseOverlay =
        document.querySelector(".noise-overlay");

    const glitchLayer1 =
        document.querySelector(
            "#glitch-layer-1"
        );

    const glitchLayer2 =
        document.querySelector(
            "#glitch-layer-2"
        );

    const glitchLayer3 =
        document.querySelector(
            "#glitch-layer-3"
        );

    const transitionFlash =
        document.querySelector(
            "#transition-flash"
        );


    // =====================================================
    // ESTADO DE ANIMACIONES
    // =====================================================

    let titleFlickerCall = null;

    let mouseMovementEnabled = true;


    // =====================================================
    // ENTRADA INICIAL
    // =====================================================

    function playIntroAnimation() {

        const timeline =
            gsap.timeline({

                defaults: {
                    ease: "power2.out"
                }

            });


        timeline

            .from(
                title,

                {
                    opacity: 0,
                    y: 8,

                    duration: 1.4
                }
            )


            .from(
                author,

                {
                    opacity: 0,
                    y: 5,

                    duration: 1
                },

                "-=0.75"
            )


            .from(
                languageSelector,

                {
                    opacity: 0,
                    y: 5,

                    duration: 0.8
                },

                "-=0.4"
            )


            .from(
                transmissionButton,

                {
                    opacity: 0,
                    y: 6,

                    duration: 1
                },

                "-=0.3"
            );

    }


    // =====================================================
    // MOVIMIENTO DE LAS ESTRELLAS
    // =====================================================

    function animateStars() {


        // -----------------------------------------
        // Estrellas lejanas
        // -----------------------------------------

        gsap.to(
            starsBack,

            {
                x: 25,
                y: 18,

                duration: 45,

                repeat: -1,
                yoyo: true,

                ease: "sine.inOut"
            }
        );


        // -----------------------------------------
        // Estrellas medias
        // -----------------------------------------

        gsap.to(
            starsMiddle,

            {
                x: -35,
                y: 26,

                duration: 38,

                repeat: -1,
                yoyo: true,

                ease: "sine.inOut"
            }
        );


        // -----------------------------------------
        // Estrellas cercanas
        // -----------------------------------------

        gsap.to(
            starsFront,

            {
                x: 45,
                y: -30,

                duration: 32,

                repeat: -1,
                yoyo: true,

                ease: "sine.inOut"
            }
        );

    }


    // =====================================================
    // PARALLAX CON EL MOUSE
    // =====================================================

    function handleMouseMove(event) {

        if (!mouseMovementEnabled) {
            return;
        }


        const mouseX =
            event.clientX /
            window.innerWidth -
            0.5;


        const mouseY =
            event.clientY /
            window.innerHeight -
            0.5;


        // Capa trasera

        gsap.to(
            starsBack,

            {
                xPercent:
                    mouseX * 0.3,

                yPercent:
                    mouseY * 0.3,

                duration: 2,

                ease: "power2.out",

                overwrite: "auto"
            }
        );


        // Capa media

        gsap.to(
            starsMiddle,

            {
                xPercent:
                    mouseX * 0.6,

                yPercent:
                    mouseY * 0.6,

                duration: 1.8,

                ease: "power2.out",

                overwrite: "auto"
            }
        );


        // Capa frontal

        gsap.to(
            starsFront,

            {
                xPercent:
                    mouseX,

                yPercent:
                    mouseY,

                duration: 1.5,

                ease: "power2.out",

                overwrite: "auto"
            }
        );

    }


    // =====================================================
    // BREATHING DEL TÍTULO
    // =====================================================

    function animateTitleBreathing() {

        gsap.to(
            title,

            {
                opacity: 0.78,

                textShadow:
                    "0 0 8px rgba(255, 255, 255, 0.15)",

                duration: 2.8,

                repeat: -1,
                yoyo: true,

                ease: "sine.inOut"
            }
        );

    }


    // =====================================================
    // BREATHING DEL AUTOR
    // =====================================================

    function animateAuthorBreathing() {

        gsap.to(
            author,

            {
                opacity: 0.68,

                duration: 4,

                repeat: -1,
                yoyo: true,

                ease: "sine.inOut"
            }
        );

    }


    // =====================================================
    // BREATHING DEL CTA
    // =====================================================

    function animateCTABreathing() {

        gsap.to(
            transmissionButton,

            {
                opacity: 0.68,

                duration: 2.3,

                repeat: -1,
                yoyo: true,

                ease: "sine.inOut"
            }
        );

    }


    // =====================================================
    // FLICKER ALEATORIO DEL TÍTULO
    // =====================================================

    function scheduleTitleFlicker() {

        const delay =
            gsap.utils.random(
                3,
                7
            );


        titleFlickerCall =
            gsap.delayedCall(
                delay,
                playTitleFlicker
            );

    }


    function playTitleFlicker() {

        const timeline =
            gsap.timeline({

                onComplete:
                    scheduleTitleFlicker

            });


        timeline

            .to(
                title,

                {
                    opacity: 0.55,
                    x: 1,

                    duration: 0.04
                }
            )


            .to(
                title,

                {
                    opacity: 0.9,
                    x: -1,

                    duration: 0.05
                }
            )


            .to(
                title,

                {
                    opacity: 1,
                    x: 0,

                    duration: 0.08
                }
            );

    }


    // =====================================================
    // ANIMACIÓN DEL SELECTOR DE IDIOMA
    // =====================================================

    function animateLanguageButton(button) {

        gsap.fromTo(
            button,

            {
                opacity: 0.45,
                scale: 0.96
            },

            {
                opacity: 1,
                scale: 1,

                duration: 0.25,

                ease: "power2.out"
            }
        );

    }


    // =====================================================
    // MICRO GLITCH DEL CTA
    // =====================================================

    function playCTAHoverGlitch() {

        const timeline =
            gsap.timeline();


        timeline

            .to(
                transmissionButton,

                {
                    x: 2,

                    duration: 0.035
                }
            )


            .to(
                transmissionButton,

                {
                    x: -2,

                    duration: 0.035
                }
            )


            .to(
                transmissionButton,

                {
                    x: 1,

                    duration: 0.035
                }
            )


            .to(
                transmissionButton,

                {
                    x: 0,

                    duration: 0.05
                }
            );

    }


    // =====================================================
    // EVENTO HOVER DEL CTA
    // =====================================================

    transmissionButton.addEventListener(
        "mouseenter",
        playCTAHoverGlitch
    );


    // =====================================================
    // TRANSICIÓN GLITCH
    // =====================================================

    function playTransmissionGlitch(
        onComplete
    ) {

        mouseMovementEnabled = false;


        // Detener futuros flickers
        if (titleFlickerCall) {

            titleFlickerCall.kill();

        }


        const timeline =
            gsap.timeline({

                onComplete:
                    onComplete

            });


        // -----------------------------------------
        // 1. Primera falla del título
        // -----------------------------------------

        timeline

            .to(
                title,

                {
                    x: 5,
                    skewX: 3,

                    duration: 0.05
                }
            )


            .to(
                title,

                {
                    x: -7,
                    skewX: -4,

                    duration: 0.05
                }
            )


            .to(
                title,

                {
                    x: 0,
                    skewX: 0,

                    duration: 0.05
                }
            );


        // -----------------------------------------
        // 2. Franjas horizontales
        // -----------------------------------------

        timeline

            .to(
                glitchLayer1,

                {
                    opacity: 0.75,
                    x: 14,

                    duration: 0.04
                },

                "<"
            )


            .to(
                glitchLayer2,

                {
                    opacity: 0.5,
                    x: -18,

                    duration: 0.05
                },

                "<"
            )


            .to(
                glitchLayer3,

                {
                    opacity: 0.65,
                    x: 11,

                    duration: 0.05
                },

                "<"
            );


        // -----------------------------------------
        // 3. Aumentar interferencia
        // -----------------------------------------

        timeline.to(
            noiseOverlay,

            {
                opacity: 0.18,

                duration: 0.05
            },

            "<"
        );


        // -----------------------------------------
        // 4. Movimiento del contenido
        // -----------------------------------------

        timeline

            .to(
                ".intro-content",

                {
                    x: -5,

                    duration: 0.04
                }
            )


            .to(
                ".intro-content",

                {
                    x: 8,

                    duration: 0.04
                }
            )


            .to(
                ".intro-content",

                {
                    x: -3,

                    duration: 0.04
                }
            )


            .to(
                ".intro-content",

                {
                    x: 0,

                    duration: 0.04
                }
            );


        // -----------------------------------------
        // 5. Glitch fuerte
        // -----------------------------------------

        timeline

            .to(
                glitchLayer1,

                {
                    opacity: 1,
                    x: -30,

                    duration: 0.045
                }
            )


            .to(
                glitchLayer2,

                {
                    opacity: 0.9,
                    x: 35,

                    duration: 0.045
                },

                "<"
            )


            .to(
                glitchLayer3,

                {
                    opacity: 1,
                    x: -20,

                    duration: 0.045
                },

                "<"
            );


        // -----------------------------------------
        // 6. Distorsión completa
        // -----------------------------------------

        timeline.to(
            scene,

            {
                scaleX: 1.008,
                scaleY: 0.995,

                duration: 0.04
            }
        );


        timeline.to(
            scene,

            {
                scaleX: 0.995,
                scaleY: 1.005,

                duration: 0.04
            }
        );


        // -----------------------------------------
        // 7. Flash
        // -----------------------------------------

        timeline.to(
            transitionFlash,

            {
                opacity: 0.8,

                duration: 0.035
            }
        );


        timeline.to(
            transitionFlash,

            {
                opacity: 0,

                duration: 0.07
            }
        );


        // -----------------------------------------
        // 8. Corte final
        // -----------------------------------------

        timeline.to(
            scene,

            {
                opacity: 0,

                duration: 0.1
            }
        );

    }


    // =====================================================
    // RESTAURAR INDEX
    // TEMPORAL HASTA TENER ESCENA 1
    // =====================================================

    function resetIndex() {

        gsap.set(
            scene,

            {
                opacity: 1,

                scaleX: 1,
                scaleY: 1
            }
        );


        gsap.set(
            title,

            {
                x: 0,
                skewX: 0
            }
        );


        gsap.set(
            ".intro-content",

            {
                x: 0
            }
        );


        gsap.set(
            [
                glitchLayer1,
                glitchLayer2,
                glitchLayer3
            ],

            {
                opacity: 0,
                x: 0
            }
        );


        gsap.set(
            noiseOverlay,

            {
                opacity: 0.035
            }
        );


        gsap.set(
            transitionFlash,

            {
                opacity: 0
            }
        );


        mouseMovementEnabled = true;


        // Volvemos a permitir
        // los pequeños flickers

        scheduleTitleFlicker();

    }


    // =====================================================
    // INICIAR TODAS LAS ANIMACIONES
    // =====================================================

    function init() {

        playIntroAnimation();

        animateStars();

        animateTitleBreathing();

        animateAuthorBreathing();

        animateCTABreathing();

        scheduleTitleFlicker();


        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

    }


    // =====================================================
    // FUNCIONES DISPONIBLES PARA MAIN.JS
    // =====================================================

    return {

        init,

        animateLanguageButton,

        playTransmissionGlitch,

        resetIndex

    };


})();