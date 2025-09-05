// Música
const music = document.getElementById('bg-music');
const playBtn = document.getElementById('play-music');
const volumeSlider = document.getElementById('music-volume');
let isPlaying = false;
playBtn.onclick = () => {
  if (!isPlaying) {
    music.volume = volumeSlider.value;
    music.play();
    playBtn.textContent = '⏸️ Música';
    isPlaying = true;
  } else {
    music.pause();
    playBtn.textContent = '🔊 Música';
    isPlaying = false;
  }
};
volumeSlider.oninput = () => {
  music.volume = volumeSlider.value;
};

// La música solo se activa con el botón de música
