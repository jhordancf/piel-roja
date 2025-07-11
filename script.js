const titulo = document.getElementById("tituloSticky");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// Detectar si es móvil
const isMobile = window.innerWidth <= 768;

// Ajustar valores para móviles
const maxScroll = isMobile ? 300 : 400;
const startFontSize = isMobile ? 3.5 : 6;
const endFontSize = isMobile ? 1.8 : 2.5;

// Función para el menú hamburguesa
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});

// Evitar que el clic dentro del menú lo cierre
navMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Cerrar menú al hacer clic en un enlace
const menuLinks = navMenu.querySelectorAll("a");
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Scroll del título ajustado para móviles
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    
    const windowHeight = window.innerHeight;
    const startPosition = windowHeight * 0.5;
    const endPosition = isMobile ? 15 : 20;
    
    if (scrollY <= maxScroll) {
        const progress = scrollY / maxScroll;
        const smoothProgress = progress * progress * (3 - 2 * progress);
        
        const fontSize = startFontSize - ((startFontSize - endFontSize) * smoothProgress);
        const currentTop = startPosition - (startPosition - endPosition) * smoothProgress;
        
        titulo.style.position = 'fixed';
        titulo.style.top = `${currentTop}px`;
        titulo.style.fontSize = `${fontSize}rem`;
        titulo.style.transform = 'translateX(-50%)';
        titulo.style.left = '50%';
        
    } else {
        titulo.style.position = 'fixed';
        titulo.style.top = `${endPosition}px`;
        titulo.style.fontSize = `${endFontSize}rem`;
        titulo.style.transform = 'translateX(-50%)';
        titulo.style.left = '50%';
    }
});