window.addEventListener('scroll', () => {
    const section = document.querySelector('#process');
    const carousel = document.querySelector('#carousel-Process');
    const cards = document.querySelectorAll('.card-wrapper');
    
    if (!section || !carousel) return;

    const offsetTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // Usamos el scroll actual del documento
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 1. Calculamos el progreso (0 a 1)
    let percentage = (scrollTop - offsetTop) / (sectionHeight - windowHeight);
    percentage = Math.max(0, Math.min(1, percentage));

    // 2. Movimiento horizontal
    // Usamos scrollWidth para saber cuánto mide el carrusel realmente
    const totalDistance = carousel.scrollWidth - window.innerWidth;
    const moveX = percentage * totalDistance;
    
    carousel.style.transform = `translateX(-${moveX}px)`;

    // --- CAMBIO DE FONDO ---
    const backgrounds = [
        'url("./img/backgroundcard.webp")',
        'url("./img/backgroundcardTwo.avif")',
        'url("./img/backgroundcardThree.avif")',
        'url("./img/backgroundcardFour.webp")'
    ];

    const step = 1 / (cards.length - 1);
    const activeIndex = Math.round(percentage / step);

    if (backgrounds[activeIndex]) {
        section.style.backgroundImage = backgrounds[activeIndex];
    }
});