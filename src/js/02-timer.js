import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBTN: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
  secondsTimer: document.querySelector('[data-seconds]'),
};

// навісив слухача подій
refs.startBTN.addEventListener('click', startTimer);

refs.startBTN.disabled = true;
let selectTime = 0;
let deltaTime = 0;
// let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectTime = selectedDates[0];
    console.log(selectTime);
    if (options.defaultDate.getTime() < selectedDates[0].getTime()) {
      refs.startBTN.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};
flatpickr(refs.inputEl, options);

function startTimer() {
  refs.startBTN.disabled = true;

  const timerId = setInterval(() => {
    const currentTime = Date.now();
    deltaTime = selectTime - currentTime;
    if (deltaTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      console.log(`${days}: ${hours}: ${minutes}: ${seconds} `);
      updateTrime({ days, hours, minutes, seconds });
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

// const timer = {
//   start() {
//     refs.startBTN.disabled = true;

//     const timerId = setInterval(() => {
//       const currentTime = Date.now();
//       deltaTime = selectTime - currentTime;
//       const { days, hours, minutes, seconds } = convertMs(deltaTime);
//       console.log(`${days}: ${hours}: ${minutes}: ${seconds} `);
//       updateTrime({ days, hours, minutes, seconds });
//     }, 1000);
//     if (deltaTime < 0) {
//       clearInterval(timerId);
//     }
//   },
// };

// записує дані в лічильник
function updateTrime({ days, hours, minutes, seconds }) {
  refs.daysTimer.textContent = days;
  refs.hoursTimer.textContent = hours;
  refs.minutesTimer.textContent = minutes;
  refs.secondsTimer.textContent = seconds;
}

// функція що додає на початок 0, якщо в числі меньше 2х знаків
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// приймає час в мілісекундах
// вираховує скільки в них днів/годин/хв/секунд
// повертає об'єкт із властивостями дні, години, хв, секунди
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
