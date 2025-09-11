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
      captureBtn.onclick = function() {
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Validación simplificada: siempre permite avanzar
        canvas.style.border = '4px solid #0f0';
        validationMsg.innerHTML = '¡Captura realizada! Puedes avanzar.';
        nextLevelBtn.style.display = 'inline-block';
      };
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
