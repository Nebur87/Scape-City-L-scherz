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

        // Procesamiento con OpenCV
        if (typeof cv !== 'undefined') {
          // Captura la imagen del canvas (solo video)
          let src = cv.imread(canvas);
          let gray = new cv.Mat();
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
          let edges = new cv.Mat();
          cv.Canny(gray, edges, 10, 50, 3, false); // Parámetros bajos para más sensibilidad

          // Captura la silueta sola para comparar
          let silCanvas = document.createElement('canvas');
          silCanvas.width = canvas.width;
          silCanvas.height = canvas.height;
          let silCtx = silCanvas.getContext('2d');
          silCtx.drawImage(silueta, 0, 0, silCanvas.width, silCanvas.height);
          let silMat = cv.imread(silCanvas);
          let silGray = new cv.Mat();
          cv.cvtColor(silMat, silGray, cv.COLOR_RGBA2GRAY, 0);
          let silEdges = new cv.Mat();
          cv.Canny(silGray, silEdges, 10, 50, 3, false);
          // Mostrar los canvas originales para depuración
          const canvasOriginalVideo = document.getElementById('canvas-original-video');
          const canvasOriginalSilueta = document.getElementById('canvas-original-silueta');
          if (canvasOriginalVideo && canvasOriginalSilueta) {
            // Video original
            let tempVideo = new cv.Mat();
            cv.resize(src, tempVideo, new cv.Size(200, 150), 0, 0, cv.INTER_AREA);
            cv.imshow(canvasOriginalVideo, tempVideo);
            tempVideo.delete();
            // Silueta original
            let tempSilueta = new cv.Mat();
            cv.resize(silMat, tempSilueta, new cv.Size(200, 150), 0, 0, cv.INTER_AREA);
            cv.imshow(canvasOriginalSilueta, tempSilueta);
            tempSilueta.delete();
          }

          // Compara los contornos: calcula la diferencia de píxeles
          let diff = new cv.Mat();
          cv.absdiff(edges, silEdges, diff);
          let nonZero = cv.countNonZero(diff);
          let total = diff.rows * diff.cols;
          let similarity = 1 - (nonZero / total); // 1 = idéntico, 0 = nada igual

          // Dibuja los bordes en los canvas extra para depuración visual
          const canvasBordesVideo = document.getElementById('canvas-bordes-video');
          const canvasBordesSilueta = document.getElementById('canvas-bordes-silueta');
          if (canvasBordesVideo && canvasBordesSilueta) {
            cv.imshow(canvasBordesVideo, edges);
            cv.imshow(canvasBordesSilueta, silEdges);
          }

          if (similarity > 0.40) { // Umbral aún más tolerante
            canvas.style.border = '4px solid #0f0';
            validationMsg.innerHTML = '¡Contorno alineado correctamente! Puedes avanzar.<br>Similarity: ' + similarity.toFixed(2);
            nextLevelBtn.style.display = 'inline-block';
          } else {
            canvas.style.border = '4px solid #f00';
            validationMsg.innerHTML = 'El contorno no coincide lo suficiente. Ajusta la posición y vuelve a intentar.<br>Similarity: ' + similarity.toFixed(2);
            nextLevelBtn.style.display = 'none';
          }

          // Liberar memoria
          src.delete(); gray.delete(); edges.delete();
          silMat.delete(); silGray.delete(); silEdges.delete(); diff.delete();
        } else {
          validationMsg.innerHTML = 'OpenCV.js no está cargado. Espera unos segundos y vuelve a intentarlo.';
        }
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
