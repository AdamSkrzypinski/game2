let header;
let startingBoard;
let startBtn;
let pauseBtn;
let resumeBtn;
let quitBtn;
let noBtn;
let yesBtn;
let allCards;
let clickedCardID = [];
let firstCard = [];
let gameActivSection;
let gamePauseSection;
let gameQuitSection;
let movesCount;
let movesCounterText;
let countTime;
let timeCounter;
let seconds;
let minutes;
let progressPercent;
let progressPercentText;
let matchCounter;
let clientWidth;
let cardAmount;
let cardOrder;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  headerTop = document.querySelector('.header-top');
  startingBoard = document.querySelector('.starting-board');
  startBtn = document.querySelector('.start-btn');
  pauseBtn = document.querySelector('.btn-pause');
  resumeBtn = document.querySelector('.btn-resume');
  quitBtn = document.querySelector('.btn-quit');
  yesBtn = document.querySelector('.btn-yes');
  noBtn = document.querySelector('.btn-no');
  allCards = document.querySelectorAll('.game-card');
  gameActivSection = document.querySelector('.game-active');
  gamePauseSection = document.querySelector('.game-pause');
  gameQuitSection = document.querySelector('.game-quit');
  movesCount = 0;
  movesCounterText = document.querySelector('.moves-counter');
  timeCounter = document.querySelector('.time-counter');
  seconds = 0;
  minutes = 0;
  clientWidth = document.documentElement.clientWidth;
  progressPercentText = document.querySelector('.progress-counter');
  progressPercent = 0;
  matchCounter = 0;
  console.log(clientWidth);
};

const prepareDOMEvents = () => {
  startBtn.addEventListener('click', gameStart);
  allCards.forEach((card) => card.addEventListener('click', checkMatch));
  pauseBtn.addEventListener('click', gamePause);
  resumeBtn.addEventListener('click', gameResume);
  quitBtn.addEventListener('click', gameQuit);
  noBtn.addEventListener('click', gameQuitCancel);
  yesBtn.addEventListener('click', gameQuitAcept);
};

const gameStart = () => {
  startingBoard.classList.add('game-start-animation');
  setTimeout(headerStartAnimation, 450);
  setTimeout(gameBoardActivation, 1250);
  setTimeout(timeStart, 1000);
  allCards.forEach(cardsShuffle);
};

const gameBoardActivation = () => {
  gameActivSection.style.zIndex = '3';
};

const headerStartAnimation = () => {
  headerTop.classList.add('header-game-active');
};

const checkMatch = (e) => {
  clickedCardID.push(e.target.id);
  e.target.style.pointerEvents = 'none';
  const clickedCardReverse = e.target.childNodes[1];
  const clickedCardObverse = e.target.childNodes[3];
  movesCount++;
  movesCounterText.textContent = `${movesCount}`;

  if (clickedCardID.length === 1) {
    firstCard.push(e.target);
    clickedCardReverse.classList.add('selected-reverse');
    clickedCardObverse.classList.add('selected-obverse');
  } else {
    clickedCardReverse.classList.add('selected-reverse');
    clickedCardObverse.classList.add('selected-obverse');
    allCards.forEach((card) => (card.style.pointerEvents = 'none'));

    if (firstCard[0].id === e.target.id) {
      e.target.classList.add('card-match');
      firstCard[0].classList.add('card-match');
      clickedCardID = [];
      firstCard = [];
      allCards.forEach((card) => (card.style.pointerEvents = ''));
      matchCounter++;
      progressPercent = (matchCounter / cardAmount) * 100;
      progressPercentText.textContent = `${Math.round(progressPercent)}%`;
    } else {
      setTimeout(clear, 500, e);
    }
  }
};

const clear = (e) => {
  const clickedCardReverse = e.target.childNodes[1];
  const clickedCardObverse = e.target.childNodes[3];
  clickedCardReverse.classList.remove('selected-reverse');
  clickedCardObverse.classList.remove('selected-obverse');
  firstCard[0].childNodes[1].classList.remove('selected-reverse');
  firstCard[0].childNodes[3].classList.remove('selected-obverse');
  clickedCardID = [];
  firstCard = [];
  allCards.forEach((card) => (card.style.pointerEvents = ''));
};

const checkResolution = () => {
  if (clientWidth < 400) {
    cardAmount = 8;
  } else if (clientWidth > 400 && clientWidth < 600) {
    cardAmount = 10;
  } else if (clientWidth > 600 && clientWidth < 800) {
    cardAmount = 12;
  } else {
    cardAmount = 16;
  }
};

const cardsShuffle = (card) => {
  checkResolution();
  console.log(cardAmount);
  cardOrder = Math.random() * 1000;
  console.log(cardOrder);
  if (card.id <= cardAmount) {
    card.style.display = 'flex';
    card.style.order = Math.round(cardOrder);
  }
};

const timeStart = () => {
  clearInterval(countTime);

  countTime = setInterval(() => {
    if (seconds < 9) {
      seconds++;
      timeCounter.textContent = `${minutes}:0${seconds}`;
    } else if (seconds >= 9 && seconds < 59) {
      seconds++;
      timeCounter.textContent = `${minutes}:${seconds}`;
    } else {
      minutes++;
      seconds = 0;
      timeCounter.textContent = `${minutes}:00`;
    }
  }, 1000);
};

const gamePause = () => {
  clearInterval(countTime);
  gamePauseSection.style.zIndex = '8';
};

const gameResume = () => {
  gamePauseSection.style.zIndex = '';
  timeStart();
};

const gameQuit = () => {
  gameQuitSection.style.zIndex = '8';
  clearInterval(countTime);
  pauseBtn.style.pointerEvents = 'none';
};

const gameQuitCancel = () => {
  gameQuitSection.style.zIndex = '';
  gamePauseSection.style.zIndex = '';
  timeStart();
  pauseBtn.style.pointerEvents = '';
};

const gameQuitAcept = () => {
  window.location.reload();
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.loading-screen').style.display = 'none';
    main();
  }, 2000);
});