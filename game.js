const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');

let jumping = false;
let alive = true;
let score = 0;
let speed = 6;

function jump() {
  if (jumping || !alive) return;
  jumping = true;
  let up = 0;
  const jumpInterval = setInterval(() => {
    if (up >= 80) {
      clearInterval(jumpInterval);
      // fall down
      const fallInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(fallInterval);
          jumping = false;
        } else {
          up -= 4;
          dino.style.bottom = up + 'px';
        }
      }, 10);
    } else {
      up += 4;
      dino.style.bottom = up + 'px';
    }
  }, 10);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === ' ') jump();
  if (!alive && e.code === 'Enter') restart();
});

restartBtn.addEventListener('click', restart);

function moveObstacle() {
  let left = 600;
  obstacle.style.left = left + 'px';
  speed = 6 + Math.floor(score / 10);
  const move = setInterval(() => {
    if (!alive) return clearInterval(move);
    if (left < -20) {
      left = 600;
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
      speed = 6 + Math.floor(score / 10);
      obstacle.style.height = 20 + Math.floor(Math.random() * 40) + 'px';
    }
    // Collision detection
    const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    const obstacleHeight = parseInt(window.getComputedStyle(obstacle).height);
    if (
      left < 90 &&
      left > 50 &&
      dinoBottom < obstacleHeight
    ) {
      alive = false;
      scoreDisplay.textContent = 'Game Over! Score: ' + score;
      restartBtn.style.display = 'block';
      return clearInterval(move);
    }
    left -= speed;
    obstacle.style.left = left + 'px';
  }, 20);
}

function restart() {
  alive = true;
  score = 0;
  scoreDisplay.textContent = 'Score: 0';
  obstacle.style.height = '40px';
  dino.style.bottom = '0px';
  restartBtn.style.display = 'none';
  moveObstacle();
}

moveObstacle();