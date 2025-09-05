// Mostrar instrucciones al llegar al lugar en nivel 4

document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-location');
  const instructionsDiv = document.getElementById('new-instructions');
  if (confirmBtn) {
    confirmBtn.onclick = function() {
      instructionsDiv.innerHTML = '¡Perfecto! Has llegado al lugar correcto.<br><br>Busca una pista oculta cerca de ti y prepárate para el siguiente desafío.';
      this.style.display = 'none';
    };
  }
});
