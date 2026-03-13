/**
 * Benefits Section - Video Frame Animation (AVIF / 192 frames / 24fps)
 * mouseenter → reproduce adelante  (frame 1 → 192)
 * mouseleave → rebobina hacia atrás (frame 192 → 1)
 */

(function () {
  const FRAME_COUNT = 192;
  const FPS = 24;
  const FRAME_INTERVAL = 1000 / FPS; // ~41ms por frame
  const FRAMES_DIR = './frames/';    // ← carpeta relativa al index.html

  let currentFrame = 1;
  let animationTimer = null;
  let isAnimating = false;
  let direction = 'forward'; // 'forward' | 'backward'

  // ── Preload all frames ──────────────────────────────────────────────────────
  const preloadedFrames = [];

  function preloadFrames() {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAMES_DIR}frame_${String(i).padStart(3, '0')}.webp`;
      preloadedFrames.push(img);
    }
  }

  // ── Canvas rendering ────────────────────────────────────────────────────────
  function renderFrame(frameNumber, canvas) {
    const ctx = canvas.getContext('2d');
    const img = preloadedFrames[frameNumber - 1];

    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  // ── Animation loop ──────────────────────────────────────────────────────────
  function stopAnimation() {
    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }
    isAnimating = false;
  }

  function playForward(canvas) {
    stopAnimation();
    direction = 'forward';
    isAnimating = true;

    animationTimer = setInterval(() => {
      renderFrame(currentFrame, canvas);

      if (currentFrame < FRAME_COUNT) {
        currentFrame++;
      } else {
        stopAnimation(); // llegó al final
      }
    }, FRAME_INTERVAL);
  }

  function playBackward(canvas) {
    stopAnimation();
    direction = 'backward';
    isAnimating = true;

    animationTimer = setInterval(() => {
      renderFrame(currentFrame, canvas);

      if (currentFrame > 1) {
        currentFrame--;
      } else {
        stopAnimation(); // volvió al inicio
      }
    }, FRAME_INTERVAL);
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  function init() {
    const section = document.getElementById('benefits');
    if (!section) return;

    // Crear canvas como fondo de la section
    const canvas = document.createElement('canvas');
    canvas.id = 'benefits-canvas';
    canvas.width = 1099;
    canvas.height = 1390;
    section.insertBefore(canvas, section.firstChild);

    // Dibujar primer frame como estado inicial
    preloadedFrames[0].onload = () => renderFrame(1, canvas);
    if (preloadedFrames[0].complete) renderFrame(1, canvas);

    // Eventos de hover sobre la sección completa
    section.addEventListener('mouseenter', () => {
      playForward(canvas);
    });

    section.addEventListener('mouseleave', () => {
      playBackward(canvas);
    });

    // Touch support (mobile)
    section.addEventListener('touchstart', () => {
      playForward(canvas);
    }, { passive: true });

    section.addEventListener('touchend', () => {
      playBackward(canvas);
    }, { passive: true });
  }

  // ── Boot ────────────────────────────────────────────────────────────────────
  preloadFrames();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
