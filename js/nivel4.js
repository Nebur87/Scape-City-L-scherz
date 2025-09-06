// Mostrar instrucciones al llegar al lugar en nivel 4

document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-location');
  const foundClueBtn = document.getElementById('found-clue');
  const readyNextBtn = document.getElementById('ready-next');
  const instructionsDiv = document.getElementById('new-instructions');
  const photo1 = document.getElementById('photo-1');
  const photo2 = document.getElementById('photo-2');
  const photo3 = document.getElementById('photo-3');

  if (confirmBtn) {
    confirmBtn.onclick = function() {
      instructionsDiv.innerHTML = '¡Perfecto! Has llegado al lugar correcto.<br><br>Busca una pista oculta cerca de ti.';
      this.style.display = 'none';
      foundClueBtn.style.display = 'inline-block';
      if (photo1) photo1.style.display = 'block';
    };
  }
  if (foundClueBtn) {
    foundClueBtn.onclick = function() {
      instructionsDiv.innerHTML = '¡Bien hecho! Has encontrado la pista.<br><br>En la pista hay otro lugar al que tienes que ir, cuando estés ahí, pulsa el siguiente botón.';
      this.style.display = 'none';
      readyNextBtn.style.display = 'inline-block';
      if (photo2) photo2.style.display = 'block';
    };
  }
  if (readyNextBtn) {
    readyNextBtn.onclick = function() {
      instructionsDiv.innerHTML = '¡La foto que hay dentro de la caja es el siguiente lugar de este nivel! Sigue las indicaciones para avanzar. Busca la palabra secreta que te permitirá avanzar.';
      this.style.display = 'none';
      document.getElementById('answer-section').style.display = 'block';
      if (photo3) photo3.style.display = 'block';
    };
  }

  // Validar la palabra secreta
  const validateAnswerBtn = document.getElementById('validate-answer');
  if (validateAnswerBtn) {
    validateAnswerBtn.onclick = function() {
      const answerInput = document.getElementById('answer-input');
      const answerMsg = document.getElementById('answer-message');
      if (answerInput.value.trim().toLowerCase() === 'bielersee') {
        answerMsg.innerHTML = '¡Correcto! Escanea el QR para avanzar al siguiente nivel.';
        answerInput.value = '';
        answerInput.focus();
        // Mostrar lector QR
        const qrReaderDiv = document.getElementById('qr-reader');
        qrReaderDiv.style.display = 'block';
        const qrResults = document.getElementById('qr-reader-results');
        qrResults.textContent = '';
        if (!window.qrScannerStarted) {
          window.qrScannerStarted = true;
          const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            if (decodedText === 'nivel5.html') {
              qrResults.textContent = '¡QR correcto! Avanzando al siguiente nivel...';
              setTimeout(() => {
                window.location.href = 'nivel5.html';
              }, 1200);
            } else {
              qrResults.textContent = 'QR no válido para este nivel.';
            }
          };
          if (window.Html5Qrcode) {
            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCode.start({ facingMode: "environment" }, {
              fps: 10,
              qrbox: 250
            }, qrCodeSuccessCallback);
          } else {
            qrResults.textContent = 'No se pudo cargar el lector QR.';
          }
        }
      } else {
        answerMsg.innerHTML = 'Palabra incorrecta. Intenta de nuevo.';
      }
    };
  }
});
