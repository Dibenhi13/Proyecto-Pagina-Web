// =========================================================
// INDEX — LÓGICA PRINCIPAL
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS DEL DOM
// =========================================================

const scene =
    document.querySelector(
        "#scene-1"
    );


const languageEN =
    document.querySelector(
        "#language-en"
    );


const languageES =
    document.querySelector(
        "#language-es"
    );


const transmissionButton =
    document.querySelector(
        "#transmission-button"
    );


const starsBack =
    document.querySelector(
        "#stars-back"
    );


const starsMiddle =
    document.querySelector(
        "#stars-middle"
    );


const starsFront =
    document.querySelector(
        "#stars-front"
    );


// =========================================================
// AUDIO
// =========================================================

const indexHum =
    document.querySelector(
        "#index-hum"
    );


const indexClickSFX =
    document.querySelector(
        "#index-click-sfx"
    );


const indexGlitchSFX =
    document.querySelector(
        "#index-glitch-sfx"
    );


// =========================================================
// ESTADO GENERAL
// =========================================================

let currentLanguage = "en";

let transitionStarted =
    false;


// =========================================================
// TRADUCCIONES
// =========================================================

const translations = {

    en: {

        transmission:
            "Click to Read Transmission"

    },


    es: {

        transmission:
            "Haz clic para leer la transmisión"

    }

};


// =========================================================
// AUDIO SEGURO
// =========================================================

function safePlayAudio(
    audio,
    volume = 1
) {

    if (!audio) {
        return;
    }


    audio.currentTime =
        0;


    audio.volume =
        volume;


    audio
        .play()
        .catch(
            () => {}
        );

}


// =========================================================
// INICIAR HUM
// =========================================================

function startAmbientAudio() {

    if (!indexHum) {
        return;
    }


    /*
        Volumen bajo porque solamente
        funciona como ambiente.
    */

    indexHum.volume =
        0.08;


    indexHum
        .play()
        .catch(
            () => {

                /*
                    Algunos navegadores no permiten
                    autoplay con sonido.

                    Si ocurre, lo iniciamos en la
                    primera interacción del usuario.
                */

            }
        );

}


// =========================================================
// DESBLOQUEAR AUDIO
// =========================================================

function unlockAmbientAudio() {

    if (
        !indexHum ||
        !indexHum.paused
    ) {

        return;

    }


    indexHum.volume =
        0.09;


    indexHum
        .play()
        .catch(
            () => {}
        );

}


// =========================================================
// CARGAR IDIOMA GUARDADO
// =========================================================

const savedLanguage =
    localStorage.getItem(
        "language"
    );


if (
    savedLanguage === "en" ||
    savedLanguage === "es"
) {

    currentLanguage =
        savedLanguage;

}


// =========================================================
// ACTUALIZAR IDIOMA
// =========================================================

function updateLanguage() {

    transmissionButton.textContent =
        translations[
            currentLanguage
        ].transmission;


    if (
        currentLanguage === "en"
    ) {

        languageEN.classList.add(
            "active"
        );

        languageES.classList.remove(
            "active"
        );


        document.documentElement.lang =
            "en";

    }
    else {

        languageES.classList.add(
            "active"
        );

        languageEN.classList.remove(
            "active"
        );


        document.documentElement.lang =
            "es";

    }

}


// =========================================================
// APLICAR IDIOMA INICIAL
// =========================================================

updateLanguage();


// =========================================================
// CAMBIAR IDIOMA
// =========================================================

function changeLanguage(
    language,
    button
) {

    if (
        transitionStarted
    ) {

        return;

    }


    unlockAmbientAudio();


    safePlayAudio(
        indexClickSFX,
        0.25
    );


    currentLanguage =
        language;


    localStorage.setItem(
        "language",
        currentLanguage
    );


    updateLanguage();


    if (
        window.IndexAnimations
    ) {

        window.IndexAnimations
            .animateLanguageButton(
                button
            );

    }

}


// =========================================================
// EVENTOS DE IDIOMA
// =========================================================

languageEN.addEventListener(
    "click",

    () => {

        changeLanguage(
            "en",
            languageEN
        );

    }
);


languageES.addEventListener(
    "click",

    () => {

        changeLanguage(
            "es",
            languageES
        );

    }
);


// =========================================================
// CREAR UNA ESTRELLA
// =========================================================

function createStar(
    sizeType
) {

    const star =
        document.createElement(
            "span"
        );


    star.classList.add(
        "star",
        sizeType
    );


    star.style.left =
        `${Math.random() * 100}%`;


    star.style.top =
        `${Math.random() * 100}%`;


    star.style.opacity =
        0.25 +
        Math.random() *
        0.65;


    return star;

}


// =========================================================
// CREAR CAPA DE ESTRELLAS
// =========================================================

function createStars(
    container,
    amount,
    sizeType
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            createStar(
                sizeType
            );


        container.appendChild(
            star
        );

    }

}


// =========================================================
// GENERAR FONDO
// =========================================================

function generateStarField() {

    createStars(
        starsBack,
        130,
        "small"
    );


    createStars(
        starsMiddle,
        75,
        "medium"
    );


    createStars(
        starsFront,
        28,
        "large"
    );

}


// =========================================================
// ACTIVAR TRANSICIÓN
// =========================================================

function startTransmission() {

    if (
        transitionStarted
    ) {

        return;

    }


    transitionStarted =
        true;


    /*
        Si Chrome bloqueó el hum inicialmente,
        este click real ya permite iniciarlo.
    */

    unlockAmbientAudio();


    // -----------------------------------------------------
    // CLICK
    // -----------------------------------------------------

    safePlayAudio(
        indexClickSFX,
        0.4
    );


    // -----------------------------------------------------
    // GLITCH SFX
    // -----------------------------------------------------

    safePlayAudio(
        indexGlitchSFX,
        0.75
    );


    disableInteraction();


    if (
        window.IndexAnimations
    ) {

        window.IndexAnimations
            .playTransmissionGlitch(
                goToNextScene
            );

    }

}


// =========================================================
// DESACTIVAR INTERACCIÓN
// =========================================================

function disableInteraction() {

    transmissionButton.disabled =
        true;


    languageEN.disabled =
        true;


    languageES.disabled =
        true;

}


// =========================================================
// REACTIVAR INTERACCIÓN
// =========================================================

function enableInteraction() {

    transmissionButton.disabled =
        false;


    languageEN.disabled =
        false;


    languageES.disabled =
        false;

}


// =========================================================
// CLICK DEL CTA
// =========================================================

transmissionButton.addEventListener(
    "click",
    startTransmission
);


// =========================================================
// PRIMERA INTERACCIÓN
// =========================================================

/*
    Esto ayuda a iniciar el hum si el navegador
    bloqueó el autoplay inicial.
*/

document.addEventListener(
    "pointerdown",
    unlockAmbientAudio,
    {
        once: true
    }
);


// =========================================================
// PASAR A LA SIGUIENTE ESCENA
// =========================================================

function goToNextScene() {

    window.location.href =
        "scenes/scene-01/scene-01.html";

}


// =========================================================
// INICIALIZACIÓN
// =========================================================

function init() {

    generateStarField();


    startAmbientAudio();


    if (
        window.IndexAnimations
    ) {

        window.IndexAnimations
            .init();

    }

}


// =========================================================
// START
// =========================================================

init();