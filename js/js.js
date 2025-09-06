// Temporizador de 2 horas
const TIMER_KEY = 'escapeTimerEnd';
const TWO_HOURS = 2 * 60 * 60 * 1000;

function startTimer() {
  let endTime = localStorage.getItem(TIMER_KEY);
  if (!endTime) {
    endTime = Date.now() + TWO_HOURS;
    localStorage.setItem(TIMER_KEY, endTime);
  }
  updateTimer(endTime);
  setInterval(() => updateTimer(endTime), 1000);
}

function updateTimer(endTime) {
  const now = Date.now();
  const remaining = endTime - now;
  const timerEl = document.querySelector('.timer');

  if (remaining <= 0) {
    timerEl.textContent = "⏳ Tiempo agotado";
    // Aquí puedes redirigir o bloquear el avance
    return;
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  timerEl.textContent = `⏳ Tiempo restante: ${hours}h ${minutes}m ${seconds}s`;
}

// Validación de símbolos
const correctOrder = ['cuadrado', 'circulo', 'triangulo', 'cruz'];

function validateSymbols() {
  const selects = document.querySelectorAll('.symbols select');
  const selected = Array.from(selects).map(s => s.value);
  const messageEl = document.querySelector('.message');
  const nextLevelEl = document.querySelector('.next-level');

  if (JSON.stringify(selected) === JSON.stringify(correctOrder)) {
    messageEl.textContent = "✅ El Guardián sonríe. Has desbloqueado el primer fragmento.";
    // Añade el botón para ir al segundo nivel si no existe
    if (!document.querySelector('.next-level button')) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Ir al Nivel 2';
      nextButton.onclick = () => window.location.href = '../views/nivel2.html';
      nextLevelEl.appendChild(nextButton);
    }
  } else {
    messageEl.textContent = "❌ El Guardián susurra: 'No es ese el orden que recuerdas...'";
    if (nextLevelEl) nextLevelEl.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Si estamos en nivel 1, reiniciamos el temporizador
  if (window.location.pathname.endsWith('nivel1.html') || window.location.pathname.endsWith('nivel2.html.html')) {
    localStorage.removeItem(TIMER_KEY);
  }
  startTimer();
  const validateBtn = document.getElementById('validate');
  if (validateBtn) {
    validateBtn.addEventListener('click', validateSymbols);
  }
});