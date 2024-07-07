const calendarContainer = document.getElementById('calendar');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const currentMonthYearDisplay = document.getElementById('currentMonthYear');
const eventsPanel = document.getElementById('eventsPanel');
const eventList = document.getElementById('eventList');
const closeEventsPanel = document.getElementById('closeEventsPanel');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = [
  { date: '2023-03-15', title: 'Evento 1', description: 'Descripción del evento 1' },
  { date: '2023-03-20', title: 'Evento 2', description: 'Descripción del evento 2' },
  { date: '2023-04-01', title: 'Evento 3', description: 'Descripción del evento 3' },
  { date: '2023-04-15', title: 'Evento 4', description: 'Descripción del evento 4' },
];

function renderCalendar() {
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  const lastDayOfMonth = getLastDayOfMonth(currentMonth, currentYear);

  calendarContainer.innerHTML = '';

  for (let i = 1; i < firstDayOfMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = '';
    calendarContainer.appendChild(dayElement);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = i;
    dayElement.dataset.date = `${currentYear}-${currentMonth + 1}-${i}`;

    if (isToday(currentYear, currentMonth, i)) {
      dayElement.classList.add('today');
    }

    calendarContainer.appendChild(dayElement);
  }

  for (let i = lastDayOfMonth + 1; i <= 42; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = '';
    calendarContainer.appendChild(dayElement);
  }

  currentMonthYearDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

function getLastDayOfMonth(month, year) {
  return new Date(year, month + 1, 0).getDay();
}

function isToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

function getMonthName(month) {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return months[month];
}

function showEventsPanel(date) {
  eventsPanel.style.display = 'block';
  eventList.innerHTML = '';

  for (const event of events) {
    if (event.date === date) {
      const eventElement = document.createElement('li');
      eventElement.textContent = `${event.title} - ${event.description}`;
      eventList.appendChild(eventElement);
    }
  }
}

function hideEventsPanel() {
  eventsPanel.style.display = 'none';
}

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

calendarContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('calendar-day')) {
    const date = event.target.dataset.date;
    showEventsPanel(date);
  }
});

closeEventsPanel.addEventListener('click', () => {
  hideEventsPanel();
});

renderCalendar();