import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Inicjalizacja flatpickr
const dateTimePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        handleDateSelection(selectedDates);
    }
});

let userSelectedDate = null;
let timerInterval = null;

// Funkcja obsługująca wybór daty
function handleDateSelection(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
        iziToast.error({
            title: "Error",
            message: "Please choose a date in the future",
            position: 'topRight', 
            timeout: 3000, 
        });
        document.querySelector('[data-start]').disabled = true;
    } else {
        userSelectedDate = selectedDate;
        document.querySelector('[data-start]').disabled = false;
    }
}

// Funkcja do formatowania liczby z wiodącym zerem
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// Funkcja do konwersji milisekund na dni, godziny, minuty i sekundy
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

// Funkcja do aktualizacji timera
function updateTimer() {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.querySelector('[data-start]').disabled = false;
        document.querySelector('.timer').innerHTML = '00:00:00:00';
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Obsługuje kliknięcie przycisku "Start"
document.querySelector('[data-start]').addEventListener('click', () => {
    if (!userSelectedDate) return;

    document.querySelector('[data-start]').disabled = true;
    document.querySelector('.timer').classList.add('active'); // Pokaż timer

    timerInterval = setInterval(updateTimer, 1000);
});
console.log("Flatpickr initialized on #datetime-picker");
