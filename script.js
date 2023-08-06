const flags = [
  {
    src: 'https://th.bing.com/th/id/OIP.GWB4unCchHedn9gUylcvQgHaE7?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    src: 'https://th.bing.com/th/id/OIP.FQm6RV0hyLRb33HISEPTWAHaED?w=316&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    country: 'Amerika Serikat',
  },
  {
    src: 'https://th.bing.com/th/id/OIP.JEMkHNlTjMlLGL93_NUzCwHaEk?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    country: 'Inggris',
  },
];
const flagContainer = document.getElementById('flag-container');
const flag = document.getElementById('flag');
const scoreDisplay = document.getElementById('score');
const playerNameInput = document.getElementById('playerName');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const startButton = document.getElementById('startButton');
const timeDisplay = document.getElementById('timeDisplay');

startButton.addEventListener('click', startGame);

let score = 0;
let timeLeft = 30;

function startGame() {
  const playerName = playerNameInput.value.trim();
  if (playerName !== '') {
    playerNameDisplay.textContent = `Nama Pemain: ${playerName}`;
    playerNameInput.style.display = 'none'; // Sembunyikan input nama
    startButton.style.display = 'none'; // Sembunyikan tombol "Mulai Permainan"
    flagContainer.classList.remove('hidden'); // Show the flag container
    generateRandomFlag();
    updateTime();
    flagContainer.addEventListener('click', handleFlagClick);
  } else {
    // Tampilkan pesan kesalahan jika nama tidak diisi
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Silakan masukkan nama Anda sebelum memulai permainan!',
    });
  }
}
function generateRandomFlag() {
  const randomIndex = Math.floor(Math.random() * flags.length);
  flag.src = flags[randomIndex].src;
  flag.dataset.country = flags[randomIndex].country || 'Indonesia';
}

function handleFlagClick(event) {
  const clickedCountry = event.target.dataset.country;
  if (clickedCountry === 'Indonesia') {
    score++;
    scoreDisplay.textContent = `Skor: ${score}`;
  } else {
    score = Math.max(0, score - 1);
    scoreDisplay.textContent = `Skor: ${score}`;
  }
  generateRandomFlag();
}

function updateFlagInterval() {
  generateRandomFlag();
  setTimeout(updateFlagInterval, 1000);
}

function resetScore() {
  score = 0;
  scoreDisplay.textContent = `Skor: ${score}`;
}

function updateTime() {
  if (timeLeft > 0) {
    timeLeft--;
    timeDisplay.textContent = `Waktu sisa: ${timeLeft} detik`; // Perbarui tampilan waktu
    setTimeout(updateTime, 2000);
  } else {
    flagContainer.removeEventListener('click', handleFlagClick);
    flagContainer.style.cursor = 'not-allowed';
    Swal.fire(`Waktu habis! Skor akhir Anda: ${score}`);
    resetScore();
  }
}

updateFlagInterval();
updateTime();
