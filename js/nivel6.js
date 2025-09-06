// Lógica para nivel6: Validación de foto subida
window.onload = function() {
  const btnYaEstoyAqui = document.getElementById('btn-ya-estoy-aqui');
  const enigmaBox = document.getElementById('enigma-box');
  const uploadBtn = document.getElementById('upload-btn');
  const photoSeparated = document.getElementById('photo-separated');
  const photoJoined = document.getElementById('photo-joined');
  const previewSeparated = document.getElementById('preview-separated');
  const previewJoined = document.getElementById('preview-joined');
  const validationMsg = document.getElementById('validation-msg');
  const nextLevelBtn = document.getElementById('next-level-btn');

  // Mostrar el enigma solo tras pulsar el botón
  if (btnYaEstoyAqui && enigmaBox) {
    btnYaEstoyAqui.onclick = function() {
      enigmaBox.style.display = 'block';
      this.style.display = 'none';
    };
  }

  // Previsualización de la foto separada
  if (photoSeparated && previewSeparated) {
    photoSeparated.onchange = function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewSeparated.src = e.target.result;
          previewSeparated.style.display = 'block';
        };
        reader.readAsDataURL(this.files[0]);
      } else {
        previewSeparated.style.display = 'none';
      }
    };
  }

  // Previsualización de la foto junta
  if (photoJoined && previewJoined) {
    photoJoined.onchange = function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewJoined.src = e.target.result;
          previewJoined.style.display = 'block';
        };
        reader.readAsDataURL(this.files[0]);
      } else {
        previewJoined.style.display = 'none';
      }
    };
  }

  if (uploadBtn && photoSeparated && photoJoined && validationMsg && nextLevelBtn) {
    uploadBtn.onclick = function() {
      if (photoSeparated.files.length > 0 && photoJoined.files.length > 0) {
        validationMsg.innerHTML = '¡Fotos recibidas! El nivel ha sido validado. Pulsa para avanzar.';
        nextLevelBtn.style.display = 'inline-block';
      } else {
        validationMsg.innerHTML = 'Por favor, sube ambas fotos: una con las piezas separadas y otra con las piezas juntas.';
      }
    };
    nextLevelBtn.onclick = function() {
      window.location.href = 'nivel7.html';
    };
  }
};
