const cardsContainer = document.querySelector('.cards');
const images = [
  'img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg', 'img/img5.jpg', 'img/img6.jpg',
  'img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg', 'img/img5.jpg', 'img/img6.jpg'
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  shuffle(images);
  cardsContainer.innerHTML = '';
  images.forEach(src => {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `
      <div class="view front-view">
        <img class="img-front" src="img/qmark.png" alt="icon">
      </div>
      <div class="view back-view">
        <img class="img-back" src="${src}" alt="card-img">
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.querySelector('.back-view img').src === secondCard.querySelector('.back-view img').src;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

let countdown;
let timeLeft = 30;
const timeDropdown = document.getElementById('time');

timeDropdown.addEventListener('change', function () {
  timeLeft = parseInt(this.value);
});

function startGame() {
  clearInterval(countdown);
  timeLeft = parseInt(timeDropdown.value);
  document.querySelector('.time span b').innerText = timeLeft;

  createCards();
  document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));

  countdown = setInterval(() => {
    timeLeft--;
    document.querySelector('.time span b').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert('Tiden är ute! Försök igen.');
    }
  }, 1000);
}

document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
