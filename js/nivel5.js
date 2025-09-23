// Nivel 5 – Validación del aspersor

document.addEventListener('DOMContentLoaded', () => {
  const foundInitialBtn = document.getElementById('found-sprinkler-initial');
  const foundBtn = document.getElementById('found-sprinkler');
  const messageDiv = document.getElementById('sprinkler-message');
  if (foundInitialBtn && foundBtn) {
    foundInitialBtn.onclick = function() {
      foundBtn.style.display = 'inline-block';
      this.style.display = 'none';
    };
    foundBtn.onclick = function() {
      messageDiv.innerHTML = '¡Genial! Has encontrado el aspersor oculto. Sigue las instrucciones para el siguiente desafío.';
      this.style.display = 'none';
      document.getElementById('next-riddle-section').style.display = 'block';
    };
  }

  // Validar el mensaje invisible
  const foundMessageBtn = document.getElementById('found-message');
  const messageFoundMsg = document.getElementById('message-found-msg');
  const nextLevelBtn = document.getElementById('next-level-btn');
  if (foundMessageBtn && nextLevelBtn) {
    foundMessageBtn.onclick = function() {
      messageFoundMsg.innerHTML = '¡Increíble! Has encontrado el mensaje invisible. Pulsa el botón para avanzar al siguiente nivel.';
      this.style.display = 'none';
      nextLevelBtn.style.display = 'inline-block';
    };
    nextLevelBtn.onclick = function() {
      // Cambia la ruta si el siguiente nivel tiene otro nombre
      window.location.href = 'nivel6.html';
    };
  }
});
