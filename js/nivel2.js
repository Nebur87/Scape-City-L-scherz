// Nivel 2 – El Reto de los Dígitos
const correctDigits = '2576'; // Combinación correcta actualizada

document.addEventListener('DOMContentLoaded', () => {
  const hintBtn = document.getElementById('hint-btn');
  const hintMessage = document.querySelector('.hint-message');
  const validateBtn = document.getElementById('validate-digits');
  const digitsInput = document.getElementById('digits-input');
  const messageEl = document.querySelector('.message');
  const nextLevelEl = document.querySelector('.next-level');

  hintBtn.addEventListener('click', () => {
    hintMessage.innerHTML = 'Esta pista te ayudará a saber el orden de los números:<br><strong>¿Dónde estás?</strong><br> Piensa qué relación puede haber entre este lugar y los números.';
  });

  validateBtn.addEventListener('click', () => {
      if (digitsInput.value === correctDigits) {
        messageEl.innerHTML = '¡Correcto! Dirígete al rocodromo y escanea el QR para avanzar.<br> Quizás necesites de nuevo estos números';
        // Mostrar lector QR
        const qrReaderDiv = document.getElementById('qr-reader');
        qrReaderDiv.style.display = 'block';
        const qrResults = document.getElementById('qr-reader-results');
        qrResults.textContent = '';
        if (!window.qrScannerStarted) {
          window.qrScannerStarted = true;
          const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            if (decodedText === 'nivel3.html') {
              qrResults.textContent = '¡QR correcto! Avanzando al siguiente nivel...';
              setTimeout(() => {
                window.location.href = 'nivel3.html';
              }, 1200);
            } else {
              qrResults.textContent = 'QR no válido para este nivel.';
            }
          };
          const html5QrCode = new Html5Qrcode("qr-reader");
          html5QrCode.start({ facingMode: "environment" }, {
            fps: 10,
            qrbox: 250
          }, qrCodeSuccessCallback);
        }
    } else {
      messageEl.textContent = 'Los dígitos no son correctos. Intenta de nuevo.';
      nextLevelEl.innerHTML = '';
        const qrReaderDiv = document.getElementById('qr-reader');
        qrReaderDiv.style.display = 'none';
        const qrResults = document.getElementById('qr-reader-results');
        qrResults.textContent = '';
        window.qrScannerStarted = false;
    }
  });
});
