// Validación simplificada para nivel7

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('video-mapa');
  const captureBtn = document.getElementById('capture-mapa-btn');
  const canvas = document.getElementById('canvas-mapa');
  const validationMsg = document.getElementById('validation-msg');
  const nextLevelBtn = document.getElementById('next-level-btn');

  // Activar cámara y mostrar en el video
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
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
          })
          .catch(function(err2) {
            validationMsg.innerHTML = 'No se pudo acceder a la cámara: ' + err2.name;
          });
      });
  } else {
    validationMsg.innerHTML = 'La cámara no es compatible con este navegador.';
  }

  if (captureBtn) {
    captureBtn.onclick = function() {
      canvas.style.display = 'block';
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Crear canvas oculto para la silueta
      let siluetaImg = document.getElementById('silueta-mapa');
      let siluetaCanvas = document.createElement('canvas');
      siluetaCanvas.width = canvas.width;
      siluetaCanvas.height = canvas.height;
      let siluetaCtx = siluetaCanvas.getContext('2d');
      siluetaCtx.drawImage(siluetaImg, 0, 0, siluetaCanvas.width, siluetaCanvas.height);

      // Procesar ambas imágenes con OpenCV
      try {
        let src = cv.imread(canvas);
        let silueta = cv.imread(siluetaCanvas);
        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
        cv.cvtColor(silueta, silueta, cv.COLOR_RGBA2GRAY, 0);
        cv.Canny(src, src, 50, 150, 3, false);
        cv.Canny(silueta, silueta, 50, 150, 3, false);

        // Calcular diferencia de píxeles
        let diff = new cv.Mat();
        cv.absdiff(src, silueta, diff);
        let nonZero = cv.countNonZero(diff);
        let total = diff.rows * diff.cols;
        let porcentaje = (nonZero / total) * 100;

        src.delete();
        silueta.delete();
        diff.delete();

        if (porcentaje < 15) { // Tolerancia ajustable
          canvas.style.border = '4px solid #0f0';
          validationMsg.innerHTML = '¡Validación exitosa! Puedes avanzar.';
          if (nextLevelBtn) nextLevelBtn.style.display = 'inline-block';
        } else {
          canvas.style.border = '4px solid #f00';
          validationMsg.innerHTML = 'No está alineado con la silueta. Intenta de nuevo.';
          if (nextLevelBtn) nextLevelBtn.style.display = 'none';
        }
      } catch (e) {
        validationMsg.innerHTML = 'Error en la validación: ' + e;
      }
    };
  }
});
