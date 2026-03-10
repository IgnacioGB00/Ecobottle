window.addEventListener('scroll', () => {
    const section = document.querySelector('#process');
    const carousel = document.querySelector('#carousel-Process');
    const cards = document.querySelectorAll('.card-wrapper');
    
    const offsetTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // 1. Calculamos el progreso (0 a 1)
    let percentage = (window.pageYOffset - offsetTop) / (sectionHeight - windowHeight);
    percentage = Math.max(0, Math.min(1, percentage));

    // 2. Movimiento horizontal del carrusel
    const totalDistance = (cards.length - 1) * window.innerWidth;
    const moveX = percentage * totalDistance;
    carousel.style.transform = `translateX(-${moveX}px)`;

    // --- NUEVA LÓGICA DE CAMBIO DE FONDO ---
    
    // Definimos las rutas de tus imágenes según el orden de las tarjetas
    const backgrounds = [
        'url("./img/backgroundcard.webp")',
        'url("./img/backgroundcardTwo.avif")',
        'url("./img/backgroundcardThree.avif")',
        'url("./img/backgroundcardFour.webp")'
    ];

    // Calculamos qué tarjeta está "activa" basándonos en el progreso
    // Dividimos el progreso entre el número de tramos (cartas - 1)
    const step = 1 / (cards.length - 1);
    const activeIndex = Math.round(percentage / step);

    // Cambiamos el fondo de la sección si el índice es válido
    if (backgrounds[activeIndex]) {
        section.style.backgroundImage = backgrounds[activeIndex];
    }
});