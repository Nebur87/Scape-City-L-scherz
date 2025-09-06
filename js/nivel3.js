// Nivel 3 – Validación de palabra secreta
const correctWord = 'recuerdo';

document.addEventListener('DOMContentLoaded', () => {
  const validateBtn = document.getElementById('validate-secret');
  const secretInput = document.getElementById('secret-word');
  const messageEl = document.querySelector('.message');
  const nextLevelEl = document.querySelector('.next-level');

  validateBtn.addEventListener('click', () => {
    if (secretInput.value.trim().toLowerCase() === correctWord) {
      messageEl.textContent = '¡Correcto! Has encontrado la palabra secreta. Resuelve el siguiente acertijo:';
      // Mostrar segundo acertijo y campo
      if (!document.getElementById('second-riddle')) {
        const riddleDiv = document.createElement('div');
        riddleDiv.id = 'second-riddle';
        riddleDiv.innerHTML = `
          <p class="acertijo"><em>“Para recordar, hay que dar un giro de 180º.<br>En la cima de la montaña, el eco de las palabras olvidadas resuena”</em>
      <br> <br>
      <em>Nombra a la Montaña</em>
    <em>¿Cómo se llama lo que ves?</em></p>
          <input type="text" id="second-word" class="secret-input" placeholder="Escribe la palabra...">
          <br>
          <button id="validate-second">Validar</button>
          <div class="second-message"></div>
        `;
        nextLevelEl.innerHTML = '';
        nextLevelEl.appendChild(riddleDiv);
        document.getElementById('validate-second').onclick = function() {
          const secondInput = document.getElementById('second-word');
          const secondMsg = document.querySelector('.second-message');
          if (secondInput.value.trim().toLowerCase() === 'chasseral') {
            secondMsg.textContent = '¡Correcto! Puedes avanzar al siguiente nivel.';
            if (!document.getElementById('next-level-btn')) {
              const nextButton = document.createElement('button');
              nextButton.id = 'next-level-btn';
              nextButton.textContent = 'Pasar al siguiente nivel';
              nextButton.onclick = () => window.location.href = 'nivel4.html';
              riddleDiv.appendChild(nextButton);
            }
          } else {
            secondMsg.textContent = 'Palabra incorrecta. Intenta de nuevo.';
          }
        };
      }
    } else {
      messageEl.textContent = 'Palabra incorrecta. Intenta de nuevo.';
      nextLevelEl.innerHTML = '';
    }
  });
});
