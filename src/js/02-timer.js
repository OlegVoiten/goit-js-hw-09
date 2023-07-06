import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }

    const startBtn = document.querySelector('[data-start]');
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const countdownElement = document.querySelector('.timer');
  const daysElement = countdownElement.querySelector('[data-days]');
  const hoursElement = countdownElement.querySelector('[data-hours]');
  const minutesElement = countdownElement.querySelector('[data-minutes]');
  const secondsElement = countdownElement.querySelector('[data-seconds]');

  const selectedDate = flatpickr('#datetime-picker').selectedDates[0];

  const countdownInterval = setInterval(() => {
    const remainingTime = selectedDate.getTime() - Date.now();

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      daysElement.textContent = '0';
      hoursElement.textContent = '0';
      minutesElement.textContent = '0';
      secondsElement.textContent = '0';
      return;
    }

    const { days, hours, minutes, seconds } = convertMS(remainingTime);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMS(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
