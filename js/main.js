// =========================================================
// INDEX — LÓGICA PRINCIPAL
// The Lost Ship
// =========================================================


// =========================================================
// ELEMENTOS DEL DOM
// =========================================================

const scene = document.querySelector("#scene-1");

const languageEN = document.querySelector("#language-en");
const languageES = document.querySelector("#language-es");

const transmissionButton = document.querySelector(
    "#transmission-button"
);

const starsBack = document.querySelector("#stars-back");
const starsMiddle = document.querySelector("#stars-middle");
const starsFront = document.querySelector("#stars-front");


// =========================================================
// ESTADO GENERAL
// =========================================================

let currentLanguage = "en";
let transitionStarted = false;


// =========================================================
// TRADUCCIONES
// =========================================================

const translations = {

    en: {
        transmission: "Click to Read Transmission"
    },

    es: {
        transmission: "Haz clic para leer la transmisión"
    }

};


// =========================================================
// CARGAR IDIOMA GUARDADO
// =========================================================

const savedLanguage = localStorage.getItem("language");

if (
    savedLanguage === "en" ||
    savedLanguage === "es"
) {
    currentLanguage = savedLanguage;
}


// =========================================================
// ACTUALIZAR IDIOMA
// =========================================================

function updateLanguage() {

    transmissionButton.textContent =
        translations[currentLanguage].transmission;


    if (currentLanguage === "en") {

        languageEN.classList.add("active");
        languageES.classList.remove("active");

        document.documentElement.lang = "en";

    } else {

        languageES.classList.add("active");
        languageEN.classList.remove("active");

        document.documentElement.lang = "es";

    }

}


// Aplicamos el idioma inicial
updateLanguage();


// =========================================================
// CAMBIAR IDIOMA
// =========================================================

function changeLanguage(language, button) {

    if (transitionStarted) {
        return;
    }


    currentLanguage = language;


    // Guardar selección para futuras escenas
    localStorage.setItem(
        "language",
        currentLanguage
    );


    updateLanguage();


    // La animación está en animations.js
    if (window.IndexAnimations) {

        window.IndexAnimations.animateLanguageButton(
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

function createStar(sizeType) {

    const star =
        document.createElement("span");


    star.classList.add(
        "star",
        sizeType
    );


    // Posición aleatoria
    star.style.left =
        `${Math.random() * 100}%`;

    star.style.top =
        `${Math.random() * 100}%`;


    // Opacidad aleatoria
    star.style.opacity =
        0.25 + Math.random() * 0.65;


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
            createStar(sizeType);

        container.appendChild(star);

    }

}


// =========================================================
// GENERAR FONDO
// =========================================================

function generateStarField() {

    // Capa lejana
    createStars(
        starsBack,
        130,
        "small"
    );


    // Capa media
    createStars(
        starsMiddle,
        75,
        "medium"
    );


    // Capa cercana
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

    // Evita múltiples clicks
    if (transitionStarted) {
        return;
    }


    transitionStarted = true;


    disableInteraction();


    /*
        Pedimos a animations.js
        reproducir el glitch.
    */

    if (window.IndexAnimations) {

        window.IndexAnimations.playTransmissionGlitch(
            goToNextScene
        );

    }

}


// =========================================================
// DESACTIVAR INTERACCIÓN
// =========================================================

function disableInteraction() {

    transmissionButton.disabled = true;

    languageEN.disabled = true;
    languageES.disabled = true;

}


// =========================================================
// REACTIVAR INTERACCIÓN
// =========================================================

function enableInteraction() {

    transmissionButton.disabled = false;

    languageEN.disabled = false;
    languageES.disabled = false;

}


// =========================================================
// CLICK DEL CTA
// =========================================================

transmissionButton.addEventListener(
    "click",
    startTransmission
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


    /*
        Una vez que las estrellas existen,
        iniciamos las animaciones.
    */

    if (window.IndexAnimations) {

        window.IndexAnimations.init();

    }

}


init();