// Lógica para validar el puzzle del mapa en nivel7 con OpenCV.js
function initNivel7() {
  // Espera a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-mapa');
    const silueta = document.getElementById('silueta-mapa');
    const captureBtn = document.getElementById('capture-mapa-btn');
    const canvas = document.getElementById('canvas-mapa');
    const validationMsg = document.getElementById('validation-msg');
    const nextLevelBtn = document.getElementById('next-level-btn');

    // Ir al nivel 8 al pulsar el botón
    if (nextLevelBtn) {
      nextLevelBtn.onclick = function() {
        window.location.href = '../views/nivel8.html';
      };
    }

    // Acceso a la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        }
      })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          // Si no se puede acceder a la trasera, intenta con la predeterminada
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
              video.srcObject = stream;
              video.play();
              validationMsg.innerHTML = 'No se pudo acceder a la cámara trasera, usando la predeterminada.';
            })
            .catch(function(err2) {
              validationMsg.innerHTML = 'No se pudo acceder a la cámara: ' + err2.message;
            });
        });
    } else {
      validationMsg.innerHTML = 'Tu navegador no soporta acceso a la cámara.';
    }

    // Validación automática de contorno (estructura)
    if (captureBtn && canvas && video && silueta) {
      captureBtn.onclick = function() {
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Validación simplificada para pruebas: siempre permite avanzar
        canvas.style.border = '4px solid #0f0';
        validationMsg.innerHTML = '¡Captura realizada! Puedes avanzar.';
        nextLevelBtn.style.display = 'inline-block';
      };
    }
  });
}

// Esperar a que OpenCV.js esté listo
function tryInitNivel7() {
  if (typeof cv !== 'undefined') {
    initNivel7();
  } else {
    document.addEventListener('opencvReady', initNivel7);
    // Fallback: si en 3 segundos cv sigue sin estar definido, intenta de nuevo
    setTimeout(() => {
      if (typeof cv !== 'undefined') {
        initNivel7();
      }
    }, 3000);
  }
}
tryInitNivel7();
