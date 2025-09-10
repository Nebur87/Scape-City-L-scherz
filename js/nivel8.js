document.addEventListener('DOMContentLoaded', () => {
  const validateBtn = document.getElementById('validate-final');
  const finalMsg = document.getElementById('final-message');
  const previewPhoto = document.getElementById('preview-final-photo');
  const photoInput = document.getElementById('final-photo');

  // Oculta el input de foto y la previsualización al inicio
  if (photoInput) photoInput.style.display = 'none';
  if (previewPhoto) previewPhoto.style.display = 'none';

  // Previsualización de la foto (solo se activa tras validación)
  function setupPhotoPreview() {
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            previewPhoto.src = evt.target.result;
            previewPhoto.style.display = 'block';
          };
          reader.readAsDataURL(file);
        } else {
          previewPhoto.style.display = 'none';
        }
      });
    }
  }

  // Validación de símbolos y palabras
  validateBtn.addEventListener('click', function() {
    // Obtén los valores de los símbolos
    const symbol1 = document.getElementById('symbol1').value;
    const symbol2 = document.getElementById('symbol2').value;
    const symbol3 = document.getElementById('symbol3').value;
    const symbol4 = document.getElementById('symbol4').value;
    const secretWord = document.getElementById('final-secret-word').value.trim().toLowerCase();
    const fuenteWordInput = document.getElementById('final-fountain-word');
    const fountainWord = fuenteWordInput ? fuenteWordInput.value.trim().toLowerCase() : '';

    // Respuestas correctas
    const correctSymbols = ['circulo', 'cuadrado', 'triangulo', 'cruz'];
  const correctSecretWord = 'recuerdo';
    const correctFountainWord = 'bielersee';

    // Validación
    if (
      symbol1 === correctSymbols[0] &&
      symbol2 === correctSymbols[1] &&
      symbol3 === correctSymbols[2] &&
      symbol4 === correctSymbols[3] &&
      secretWord === correctSecretWord &&
      fountainWord === correctFountainWord
    ) {
  // Mostrar imagen de peces-lchrz
  const pecesImg = document.getElementById('peces-img');
  if (pecesImg) pecesImg.style.display = 'block';

  // Mostrar mensaje del punto 4
  const celebrationMsg = document.getElementById('celebration-msg');
  if (celebrationMsg) celebrationMsg.style.display = 'list-item';

  // Mostrar input de foto y preparar previsualización
  if (photoInput) photoInput.style.display = 'inline-block';
  setupPhotoPreview();
  validateBtn.textContent = 'Subir foto de celebración';
  finalMsg.innerHTML = '<div>¡Has encontrado el secreto del lago!<br><br><strong>Sube una foto de la celebración con tu equipo para cumplir la misión.</strong></div>';

      // Cambia el evento del botón para validar la foto
      validateBtn.onclick = function() {
        if (photoInput && photoInput.files.length > 0) {
          // Limpia cualquier mensaje de error previo
          finalMsg.innerHTML = `
            <h2>¡Felicidades! Has completado el escape room y liberado el secreto del lago 🎉</h2>
            <div style="font-size:1.2em;margin-top:15px;color:#1a7e1a;font-weight:bold;">
              Sois los auténticos Guardianes del Lago Bielersee.<br>
              Habéis conseguido devolver la memoria al pueblo de Lüscherz, todos están en deuda con vosotros<br>
              Vuestra astucia, trabajo en equipo y perseverancia han desvelado todos los misterios.<br>
              ¡Que la leyenda de vuestra aventura inspire a futuros exploradores!
            </div>
            <div style="margin-top:20px;font-size:1.1em;color:#0077c2;">
              <span>🏅 Reconocimiento especial: <strong>Equipo ${new Date().getFullYear()}</strong></span><br>
              <span>📸 ¡No olvidéis compartir vuestra foto de celebración!</span>
            </div>
          `;
          if (previewPhoto) previewPhoto.style.display = 'block';

          // Sonido de celebración
          const celebrationSound = document.getElementById('celebration-sound');
          if (celebrationSound) {
            celebrationSound.currentTime = 0;
            celebrationSound.play();
          }

          // Confeti animado
          const confettiCanvas = document.getElementById('confetti-canvas');
          if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
            confettiCanvas.style.display = 'block';
            lanzarConfeti(confettiCanvas);
            setTimeout(() => { confettiCanvas.style.display = 'none'; }, 6000);
          }

          // Función simple de confeti
          function lanzarConfeti(canvas) {
            const ctx = canvas.getContext('2d');
            const colores = ['#ff0', '#f00', '#0f0', '#00f', '#ff7f00', '#fff'];
            let confetis = [];
            for (let i = 0; i < 120; i++) {
              confetis.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                r: 6 + Math.random() * 8,
                color: colores[Math.floor(Math.random() * colores.length)],
                speed: 2 + Math.random() * 3,
                angle: Math.random() * Math.PI * 2
              });
            }
            let frames = 0;
            function draw() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              confetis.forEach(c => {
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
                ctx.fillStyle = c.color;
                ctx.fill();
                c.y += c.speed;
                c.x += Math.sin(c.angle + frames/20) * 2;
                if (c.y > canvas.height) c.y = -10;
              });
              frames++;
              if (frames < 180) requestAnimationFrame(draw);
            }
            draw();
          }
        } else {
          // Solo muestra el mensaje de error, no añade al anterior
          finalMsg.innerHTML = '<div style="color:#c00;">Debes subir una foto de tu equipo celebrando en el lugar final.</div>';
        }
      };
    } else {
      let errorMsg = '<div style="color:#c00;">';
      if (
        symbol1 !== correctSymbols[0] ||
        symbol2 !== correctSymbols[1] ||
        symbol3 !== correctSymbols[2] ||
        symbol4 !== correctSymbols[3]
      ) {
        errorMsg += 'Los símbolos no son correctos.<br>Respuesta esperada: ' + correctSymbols.join(', ') + '<br>';
      }
      if (secretWord !== correctSecretWord) {
        errorMsg += 'La palabra secreta no es correcta.<br>Respuesta esperada: ' + correctSecretWord + '<br>';
      }
      if (fountainWord !== correctFountainWord) {
        errorMsg += 'La palabra de la fuente no es correcta.<br>Respuesta esperada: ' + correctFountainWord + '<br>';
      }
      errorMsg += '</div>';
      finalMsg.innerHTML = errorMsg;
    }
  });
});
