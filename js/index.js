
// Música persistente entre niveles
const music = document.getElementById('bg-music');
const playBtn = document.getElementById('play-music');
const volumeSlider = document.getElementById('music-volume');

// Recupera estado previo
let isPlaying = localStorage.getItem('musicPlaying') === 'true';
let savedVolume = localStorage.getItem('musicVolume');
if (savedVolume !== null) {
  music.volume = savedVolume;
  volumeSlider.value = savedVolume;
}

// Si estaba activa, reproduce automáticamente
if (isPlaying) {
  music.play();
  playBtn.textContent = '⏸️ Música';
}

playBtn.onclick = () => {
  if (!isPlaying) {
    music.volume = volumeSlider.value;
    music.play();
    playBtn.textContent = '⏸️ Música';
    isPlaying = true;
    localStorage.setItem('musicPlaying', 'true');
  } else {
    music.pause();
    playBtn.textContent = '🔊 Música';
    isPlaying = false;
    localStorage.setItem('musicPlaying', 'false');
  }
};

volumeSlider.oninput = () => {
  music.volume = volumeSlider.value;
  localStorage.setItem('musicVolume', volumeSlider.value);
};
