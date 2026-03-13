let purpose = document.getElementById('Purpose');
let solution = document.getElementById('solution'); // Corregido: sin el '#' dentro del getElementById

let lastMouseX = 0;
let lastMouseY = 0;
const threshold = 50;

const imgTrash = [ '../img/bottleTrash.png', '../img/trashTwo.png', '../img/trashThree.png'];
const imgSolution = ['../img/bottleBlueSolution.png', '../img/bottleGreenSolution.png'];

// Evento para la sección de Propósito
purpose.addEventListener('mousemove', (e) => {
    handleMouseMove(e, purpose, imgTrash);
});

// Evento para la sección de Solución
solution.addEventListener('mousemove', (e) => {
    handleMouseMove(e, solution, imgSolution);
});

// Función intermedia para manejar el movimiento y calcular distancias
function handleMouseMove(e, container, imageList) {
    // Si el mouse está encima de un H2 o un P, salimos de la función sin crear nada
    if (e.target.tagName === 'H2' || e.target.tagName === 'P') {
        return; 
    }

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = Math.hypot(x - lastMouseX, y - lastMouseY);

    if (distance > threshold) {
        createImage(x, y, container, imageList);
        lastMouseX = x;
        lastMouseY = y;
    }
}

// Función principal reutilizable
function createImage(x, y, container, imageList) {
    const img = document.createElement('img');
    
    // Selecciona imagen aleatoria de la lista que recibió por argumento
    const randomImg = imageList[Math.floor(Math.random() * imageList.length)];
    
    img.src = randomImg;
    img.classList.add('img-Move'); // Puedes usar la misma clase para estilos base

    // Posicionar la imagen relativa al contenedor
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    container.appendChild(img);

    setTimeout(() => {
        img.remove();
    }, 700);
}

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
    const animationImg = document.getElementById('animationHeader');
    const contentHeader = document.getElementById('content-header');

    const backgroundImageElementURL = "url('./img/backgroundHeader.webp')";

    setTimeout(() => {
        header.style.backgroundImage = backgroundImageElementURL;
        animationImg.style.transform = 'scale(10)';
        // Añadimos opacidad 0 para que el desvanecimiento sea total antes de borrar
        animationImg.style.opacity = '0'; 
    }, 900);

    animationImg.addEventListener('transitionend', (event) => {
        // Verificamos 'transform' o 'opacity' para disparar el evento
        if (event.propertyName === 'transform' || event.propertyName === 'opacity') {
            
            // 1. Mostramos el contenido del header
            contentHeader.classList.add('fade-in-content');
            
            // 2. Eliminamos la imagen del DOM permanentemente
            // Usamos un pequeño delay de 100ms para asegurar que la transición visual terminó
            setTimeout(() => {
                animationImg.remove();
                console.log("Animación terminada: Imagen eliminada del DOM.");
            }, 100);
        }
    });
});

