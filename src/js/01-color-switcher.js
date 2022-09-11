const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

// встановлюю сдухачів подій на кнопки
refs.startBtn.addEventListener('click', onButtonStart);
refs.stopBtn.addEventListener('click', onButtonStop);

let timeInterval = null;

// деактивую кнопку старт
// встановлюю інтервал, викликаю функцію заміни кольору
function onButtonStart() {
  makeSetInterval();
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function makeSetInterval() {
  timeInterval = setInterval(() => {
    changeCokor();
  }, 1000);
}

// функція заміни кольору фона
function changeCokor() {
  const colorRandom = getRandomHexColor();
  refs.bodyEl.style.background = colorRandom;
}

// деактивую кнопку стоп, активую кнопку старт
// очищаю інтервал
function onButtonStop() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(timeInterval);
}

// генератор рандомного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
